import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allRoutes: (_) =>
			getRequest(URL, ''),
		routeById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createRoute: (_, { route }) =>
			generalRequest(`${URL}`, 'POST', route),
		updateRoute: (_, { id, route }) =>
			generalRequest(`${URL}/${id}`, 'PUT', route),
		deleteRoute: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
