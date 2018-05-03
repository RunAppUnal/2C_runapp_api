import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	bikeRouteMutations,
	bikeRouteQueries,
	bikeRouteTypeDef
} from './bikes/typeDefs';

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

import {
	ratingsMutations,
	ratingsQueries,
	ratingsTypeDef
} from './ratings/typeDefs';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import {
	authMutations,
  authTypeDef
} from './auth/typeDefs';

import routesResolvers from './routes/resolvers';
import vehiclesResolvers from './vehicles/resolvers';
import favroutesResolvers from './favroutes/resolvers';
import ratingsResolvers from './ratings/resolvers';
import bikeRouteResolvers from './bikes/resolvers';
import userResolvers from './users/resolvers';
import authResolvers from './auth/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		bikeRouteTypeDef,
		routesTypeDef,
		vehiclesTypeDef,
		favroutesTypeDef,
		ratingsTypeDef,
		authTypeDef
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
		ratingsMutations,
		authMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		userResolvers,
		bikeRouteResolvers,
		routesResolvers,
		vehiclesResolvers,
		favroutesResolvers,
		ratingsResolvers,
		authResolvers
	)
});
