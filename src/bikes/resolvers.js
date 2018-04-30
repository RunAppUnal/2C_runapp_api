import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allBikeRoutes: (_) =>
			generalRequest(URL, 'GET'),
		bikeRoutesById: (_, { id }) =>
			generalRequest(`${URL}${id}`, 'GET'),
		findCompany: (_, { id }) =>
			generalRequest(`${URL}findCompany/${id}`, 'GET'),
	},
	Mutation: {
		createBikeRoute: (_, { bikeRoute }) =>
			generalRequest(`${URL}`, 'POST', bikeRoute),
		updateBikeRoute: (_, { id, bikeRoute }) =>
			generalRequest(`${URL}${id}`, 'PUT', bikeRoute),
		deleteBikeRoute: (_, { id }) =>
			generalRequest(`${URL}${id}`, 'DELETE')
	}
};

export default resolvers;