'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const bikeRouteTypeDef = `
type GeoJSON {
    type: String
    coordinates: [[Float]]
}

type BikeRoute {
    id: ID
    _id: ID
    user_id: Int!
    time: String
    similar_routes: [BikeRoute]
    origin: [Float]!
    destination: [Float]!
    originAddr: String
    destinationAddr: String
    route_points: GeoJSON
    route_distance: Float
}

input BikeRouteInput {
    user_id: Int!
    origin: [Float]!
    destination: [Float]!
    originAddr: String
    destinationAddr: String
    time: String
}
`;

const bikeRouteQueries = `
    allBikeRoutes: [BikeRoute]!
    bikeRoutesById(id: ID!): BikeRoute!
    findCompany(id: ID!): [BikeRoute]!
`;

const bikeRouteMutations = `
    createBikeRoute(bikeRoute: BikeRouteInput!): BikeRoute!
    deleteBikeRoute(id: ID!): BikeRoute!
    updateBikeRoute(id: ID!, bikeRoute: BikeRouteInput!): BikeRoute!
`;

const routesTypeDef = `
type Route {
    id: Int!
    user_id: Int!
    car_id: Int!
    title: String!
    description: String!
    from_lat: Float!
    from_lng: Float!
    to_lat: Float!
    to_lng: Float!
    waypoints: String!
    departure: String!
    cost: Float!
    users_in_route: String!
    active: Boolean
    spaces_available: Int!
}

input RouteInput {
  user_id: Int!
  car_id: Int!
  title: String!
  description: String!
  from_lat: Float!
  from_lng: Float!
  to_lat: Float!
  to_lng: Float!
  waypoints: String!
  departure: String!
  cost: Float!
  users_in_route: String!
  active: Boolean
  spaces_available: Int!
}
`;



const routesQueries = `
    allRoutes: [Route]!
    routeById(id: Int!): Route!
    myRoutes(userid: Int!): [Route]!
    otherRoutes(userid: Int!): [Route]!
    searchMyRoutes(userid: Int!, word: String!, cost: String!, spaces: String!, date: String!): [Route]!
    searchOtherRoutes(userid: Int!, word: String!, cost: String!, spaces: String!, date: String!): [Route]!
`;

const routesMutations = `
    createRoute(route: RouteInput!): Route!
    deleteRoute(id: Int!): Route!
    updateRoute(id: Int!, route: RouteInput!): Route!
    removeUserFromRoute(id: Int!, userid: Int!): Route!
    addUserFromRoute(id: Int!, userid: Int!): Route!
`;

const vehiclesTypeDef = `
type Vehicle {
    id: Int!
    plate: String!
    user_id: Int!
    kind: String!
    model: Int!
    color: String!
    capacity: Int!
    image: String!
    brand: String!
}

input VehicleInput {
    plate: String!
    user_id: Int!
    kind: String!
    model: Int!
    color: String!
    capacity: Int!
    image: String!
    brand: String!
}
`;

const vehiclesQueries = `
    allVehicles: [Vehicle]!
    vehicleById(id: Int!): Vehicle!
    myVehicles(user: Int!): [Vehicle]!
    findVehicle(plate: String!): [Vehicle]!
`;

const vehiclesMutations = `
    createVehicle(vehicle: VehicleInput!): Vehicle!
    deleteVehicle(id: Int!): Vehicle!
    updateVehicle(id: Int!, vehicle: VehicleInput!): Vehicle!
`;

const favroutesTypeDef = `
type Favroute {
    id: Int!
    user_id: Int!
    polyline1: String!
    polyline2: String!
    polyline3: String!
    polyline4: String!
    polyline5: String!
    count: Int!
}

input FavrouteInput {
    user_id: Int!
    polyline1: String!
    polyline2: String!
    polyline3: String!
    polyline4: String!
    polyline5: String!
    count: Int!
}
`;

const favroutesQueries = `
    allFavroutes: [Favroute]!
    favrouteById(id: Int!): Favroute!
    myFavRoutes(user_id: Int!): [Favroute]!
`;

const favroutesMutations = `
    createFavroute(favroute: FavrouteInput!): Favroute!
    deleteFavroute(id: Int!): Favroute!
    updateFavroute(id: Int!, favroute: FavrouteInput!): Favroute!
`;

const ratingsTypeDef = `
type Rating {
    id: Int!
    route_id: Int!
    user_id: Int!
    car_rating: Int!
    driver_rating: Int!
    average_rating: Float!
    comment: String!
}

input RatingInput {
    route_id: Int!
    user_id: Int!
    car_rating: Int!
    driver_rating: Int!
    comment: String!
}
`;

const ratingsQueries = `
    allRatings: [Rating]!
    ratingById(id: Int!): Rating!
`;

const ratingsMutations = `
    createRating(rating: RatingInput!): Rating!
    deleteRating(id: Int!): Rating!
    updateRating(id: Int!, rating: RatingInput!): Rating!
`;

const usersTypeDef = `
type User {
    userid: Int!
    username: String!
    password: String!
    email: String!
    name: String!
    lastname: String!
    cellphone: String!
}

input UserInput {
  username: String!
  password: String!
  email: String!
  name: String!
  lastname: String!
  cellphone: String!
}
`;

const usersQueries = `
    userById(userid: Int!): User!
    userByUsername(username: String!): User!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(username: String!): User!
    login(username: String!, password: String!): User!
`;

const url = process.env.ROUTES_URL || 'routes-ms';
const port = process.env.ROUTES_PORT || '8000';
const entryPoint = process.env.ROUTES_ENTRY || 'routes';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allRoutes: (_) =>
			getRequest(URL, ''),
		routeById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		myRoutes: (_, { userid }) =>
			generalRequest(`${URL}/my_routes?userid=${userid}`, 'GET'),
		otherRoutes: (_, { userid }) =>
			generalRequest(`${URL}/other_routes?userid=${userid}`, 'GET'),
		searchMyRoutes: (_, {userid, word, cost, spaces, date}) =>
			generalRequest(`${URL}/search_my_routes?userid=${userid}&word=${word}&cost=${cost}&spaces=${spaces}&date=${date}`, 'GET'),
		searchOtherRoutes: (_, {userid, word, cost, spaces, date}) =>
			generalRequest(`${URL}/search_other_routes?userid=${userid}&word=${word}&cost=${cost}&spaces=${spaces}&date=${date}`, 'GET'),
	},
	Mutation: {
		createRoute: (_, { route }) =>
			generalRequest(`${URL}`, 'POST', route),
		updateRoute: (_, { id, route }) =>
			generalRequest(`${URL}/${id}`, 'PUT', route),
		deleteRoute: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE'),
		removeUserFromRoute: (_, {id, userid}) =>
			generalRequest(`${URL}/${id}/remove_user?userid=${userid}`, 'PATCH'),
		addUserFromRoute: (_, {id, userid}) =>
			generalRequest(`${URL}/${id}/add_user?userid=${userid}`, 'PATCH')
	}
};

const url$1 = process.env.VEHICLES_URL || 'vehicles-ms';
const port$1 = process.env.VEHICLES_PORT || '6005';
const entryPoint$1 = process.env.VEHICLES_ENTRY || 'vehicles';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allVehicles: (_) =>
			getRequest(URL$1, ''),
		vehicleById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
		myVehicles: (_, { user }) =>
			generalRequest(`${URL$1}/my_vehicles?user_id=${user}`, 'GET'),
		findVehicle: (_, { plate }) =>
			generalRequest(`${URL$1}/find_vehicle?plate=${plate}`, 'GET'),
	},
	Mutation: {
		createVehicle: (_, { vehicle }) =>
			generalRequest(`${URL$1}`, 'POST', vehicle),
		updateVehicle: (_, { id, vehicle }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', vehicle),
		deleteVehicle: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

const url$2 = process.env.FAVROUTES_URL || 'vehicles-ms';
const port$2 = process.env.FAVROUTES_PORT || '4003';
const entryPoint$2 = process.env.FAVROUTES_ENTRY || 'fav_routes';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allFavroutes: (_) =>
			getRequest(URL$2, ''),
		favrouteById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
		myFavRoutes: (_, { user }) =>
			generalRequest(`${URL$2}/my_favRoutes?user_id=${user}`, 'GET'),
	},
	Mutation: {
		createFavroute: (_, { favroute }) =>
			generalRequest(`${URL$2}`, 'POST', favroute),
		updateFavroute: (_, { id, favroute }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', favroute),
		deleteFavroute: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const url$3 = process.env.RATINGS_URL || 'ratings-ms';
const port$3 = process.env.RATINGS_PORT || '6003';
const entryPoint$3 = process.env.RATINGS_ENTRY || 'ratings';

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
	Query: {
		allRatings: (_) =>
			getRequest(URL$3, ''),
		ratingById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'GET'),
	},
	Mutation: {
		createRating: (_, { rating }) =>
			generalRequest(`${URL$3}`, 'POST', rating),
		updateRating: (_, { id, rating }) =>
			generalRequest(`${URL$3}/${id}`, 'PUT', rating),
		deleteRating: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'DELETE')
	}
};

//const URL = `http://${url}:${port}/${entryPoint}`;
const URL$4 = `http://localhost:6003/route/`;

const resolvers$4 = {
	Query: {
		allBikeRoutes: (_) =>
			generalRequest(URL$4, 'GET'),
		bikeRoutesById: (_, { id }) =>
			generalRequest(`${URL$4}${id}`, 'GET'),
		findCompany: (_, { id }) =>
			generalRequest(`${URL$4}findCompany/${id}`, 'GET'),
	},
	Mutation: {
		createBikeRoute: (_, { bikeRoute }) =>
			generalRequest(`${URL$4}`, 'POST', bikeRoute),
		updateBikeRoute: (_, { id, bikeRoute }) =>
			generalRequest(`${URL$4}${id}`, 'PUT', bikeRoute),
		deleteBikeRoute: (_, { id }) =>
			generalRequest(`${URL$4}${id}`, 'DELETE')
	}
};

const url$5 = process.env.USER_URL || 'login-ms';
const port$5 = process.env.USER_PORT || '6004';
const entryPoint$5 = process.env.USER_ENTRY || 'user';

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$5}`;

const resolvers$5 = {
	Query: {
		userById: (_, { userid }) =>
			generalRequest(`${URL$5}${userid}`, 'GET'),
		userByUsername: (_, { username }) =>
			generalRequest(`${URL$5}u/${username}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$5}register`, 'POST', user),
		deleteUser: (_, { username }) =>
			generalRequest(`${URL$5}u/${username}`, 'DELETE'),
		login: (_, {username, password}) =>
			generalRequest(`${URL$5}login`, 'POST', {username, password})
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		bikeRouteTypeDef,
		routesTypeDef,
		vehiclesTypeDef,
		favroutesTypeDef,
		ratingsTypeDef
	],
	[
		usersQueries,
		bikeRouteQueries,
		routesQueries,
		vehiclesQueries,
		favroutesQueries,
		ratingsQueries
	],
	[
		usersMutations,
		bikeRouteMutations,
		routesMutations,
		vehiclesMutations,
		favroutesMutations,
		ratingsMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$5,
		resolvers$4,
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;


const koaOptions = {
    origin: true,
    credentials: true
};

app.use(koaLogger());
app.use(koaCors(koaOptions));

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
