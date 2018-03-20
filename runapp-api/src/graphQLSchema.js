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

import {
	ratingsMutations,
	ratingsQueries,
	ratingsTypeDef
} from './ratings/typeDefs';

import routesResolvers from './routes/resolvers';
import vehiclesResolvers from './vehicles/resolvers';
import favroutesResolvers from './favroutes/resolvers';
import ratingsResolvers from './ratings/resolvers';
import bikeRouteResolvers from './bikes/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		bikeRouteTypeDef,
		routesTypeDef,
		vehiclesTypeDef,
		favroutesTypeDef,
		ratingsTypeDef
	],
	[

		bikeRouteQueries,
		routesQueries,
		vehiclesQueries,
		favroutesQueries,
		ratingsQueries
	],
	[
		bikeRouteMutations,
		routesMutations,
		vehiclesMutations,
		favroutesMutations,
		ratingsMutations
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
		favroutesResolvers,
		ratingsResolvers
	)
});
