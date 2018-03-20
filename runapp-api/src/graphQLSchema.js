import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	bikeRouteMutations,
	bikeRouteQueries,
	bikeRouteTypeDef
} from './routes/typeDefs';

import {
	routesMutations,
	routesQueries,
	routesTypeDef
} from './routes/typeDefs';

import {
	vehiclesMutations,
	vehiclesQueries,
	vehiclesTypeDef
} from './vehicles/typeDefs';

import {
	favroutesMutations,
	favroutesQueries,
	favroutesTypeDef
} from './favroutes/typeDefs';

import routesResolvers from './routes/resolvers';
import vehiclesResolvers from './vehicles/resolvers';
import favroutesResolvers from './favroutes/resolvers';
import bikeRouteResolvers from './bikes/resolvers';

// import coursesResolvers from './courses/resolvers';
// import gradesResolvers from './grades/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		bikeRouteTypeDef,
		routesTypeDef,
		vehiclesTypeDef,
		favroutesTypeDef,
		
		// ,
		// coursesTypeDef,
		// gradesTypeDef
	],
	[

		bikeRouteQueries,
		routesQueries,
		vehiclesQueries,
		favroutesQueries
		// ,
		// coursesQueries,
		// gradesQueries
	],
	[
		bikeRouteMutations,
		routesMutations,
		vehiclesMutations,
		favroutesMutations
		// ,
		// coursesMutations,
		// gradesMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		bikeRouteResolvers,
		routesResolvers,
		vehiclesResolvers,
		favroutesResolvers
	)
});
