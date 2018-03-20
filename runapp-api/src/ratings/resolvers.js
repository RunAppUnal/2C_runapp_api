import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allRatings: (_) =>
			getRequest(URL, ''),
		ratingById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createRating: (_, { rating }) =>
			generalRequest(`${URL}`, 'POST', rating),
		updateRating: (_, { id, rating }) =>
			generalRequest(`${URL}/${id}`, 'PUT', rating),
		deleteRating: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
