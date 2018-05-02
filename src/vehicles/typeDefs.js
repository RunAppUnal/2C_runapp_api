export const vehiclesTypeDef = `
type Vehicle {
    id: Int!
    plate: String!
    user_id: Int!
    kind: String!
    model: Int!
    color: String!
    capacity: Int!
    image: String!
    brand: String!
}

input VehicleInput {
    plate: String!
    user_id: Int!
    kind: String!
    model: Int!
    color: String!
    capacity: Int!
    image: String!
    brand: String!
}
`;

export const vehiclesQueries = `
    allVehicles: [Vehicle]!
    vehicleById(id: Int!): Vehicle!
    myVehicles(user: Int!): [Vehicle]!
    findVehicle(plate: String!): [Vehicle]!
`;

export const vehiclesMutations = `
    createVehicle(vehicle: VehicleInput!): Vehicle!
    deleteVehicle(id: Int!): Vehicle!
    updateVehicle(id: Int!, vehicle: VehicleInput!): Vehicle!
`;
