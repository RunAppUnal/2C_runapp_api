import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allFavroutes: (_) =>
			getRequest(URL, ''),
		favrouteById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createFavroute: (_, { favroute }) =>
			generalRequest(`${URL}`, 'POST', favroute),
		updateFavroute: (_, { id, favroute }) =>
			generalRequest(`${URL}/${id}`, 'PUT', favroute),
		deleteFavroute: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;