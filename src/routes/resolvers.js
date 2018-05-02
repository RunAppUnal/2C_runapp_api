import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

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

export default resolvers;
