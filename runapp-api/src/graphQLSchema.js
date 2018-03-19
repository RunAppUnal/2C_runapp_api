import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	routesMutations,
	routesQueries,
	routesTypeDef
} from './routes/typeDefs';


// import {
// 	coursesMutations,
// 	coursesQueries,
// 	coursesTypeDef
// } from './courses/typeDefs';
//
// import {
// 	gradesMutations,
// 	gradesQueries,
// 	gradesTypeDef
// } from './grades/typeDefs';

import routesResolvers from './routes/resolvers';
// import coursesResolvers from './courses/resolvers';
// import gradesResolvers from './grades/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		routesTypeDef
		// ,
		// coursesTypeDef,
		// gradesTypeDef
	],
	[
		routesQueries
		// ,
		// coursesQueries,
		// gradesQueries
	],
	[
		routesMutations
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
		routesResolvers
	)
});
