import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allBikeRoutes: (_) =>
			getRequest(URL, ''),
		bikeRoutesById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		myBikeRoutes: (_, { user }) =>
			generalRequest(`${URL}/find/${user}`, 'GET'),
		findCompany: (_, { id }) =>
			generalRequest(`${URL}/findCompany/${id}`, 'GET'),
	},
	Mutation: {
		createBikeRoute: (_, { bikeRoute }) =>
			generalRequest(`${URL}`, 'POST', BikeRoute),
		updateBikeRoute: (_, { id, bikeRoute }) =>
			generalRequest(`${URL}/${id}`, 'PUT', BikeRoute),
		deleteBikeRoute: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;