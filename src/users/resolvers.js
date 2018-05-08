import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		userById: (_, { userid }) =>
			generalRequest(`${URL}userById/${userid}`, 'GET'),
		userByUsername: (_, { username }) =>
			generalRequest(`${URL}userByUsername/${username}`, 'GET'),
		// validateToken: (_, {token, uid, client}) =>
		// 	generalRequest(`${URL}validate_token?access-token=${token}&uid=${uid}&client=${client}`, 'GET`'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		deleteUser: (_, { username }) =>
			generalRequest(`${URL}u/${username}`, 'DELETE'),
		login: (_, {email, password}) =>
			generalRequest(`${URL}/sign_in`, 'POST', {email, password}, true).then((sessionResponse) => {
				let user = sessionResponse.body
				user['token'] = sessionResponse.headers['token']
				user['client'] = sessionResponse.headers['client']
				return user;
			})
	}
};

export default resolvers;
