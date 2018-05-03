import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
    Mutation: {
        auth: (_, { auth }) =>
            generalRequest(`${URL}`, 'POST', auth)
    }
};

export default resolvers;