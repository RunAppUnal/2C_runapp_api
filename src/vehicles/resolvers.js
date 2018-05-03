import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allVehicles: (_) =>
			getRequest(URL, ''),
		vehicleById: (_, { id }) =>
			generalRequest(`${URL}${id}/`, 'GET'),
		myVehicles: (_, { user }) =>
			generalRequest(`${URL}my_vehicles/${user}/`, 'GET'),
		findVehicle: (_, { plate }) =>
			generalRequest(`${URL}find_vehicle/${plate}/`, 'GET'),
	},
	Mutation: {
		createVehicle: (_, { vehicle }) =>
			generalRequest(`${URL}`, 'POST', vehicle),
		updateVehicle: (_, { id, vehicle }) =>
			generalRequest(`${URL}${id}/`, 'PUT', vehicle),
		deleteVehicle: (_, { id }) =>
			generalRequest(`${URL}${id}/`, 'DELETE')
	}
};

export default resolvers;
