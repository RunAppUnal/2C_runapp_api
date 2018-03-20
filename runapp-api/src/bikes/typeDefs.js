export const bikeRouteTypeDef = `
type BikeRoute {
    id: ID!
    user_id: Int!
    time: String
    similar_routes: [BikeRoute]
    origin: [Float]!
    destination: [Float]!
    route_points: String
    route_distance: Float
}

input BikeRouteInput {
    id: ID!
    user_id: Int!
    origin: [Float]!
    destination: [Float]!
    time: String
}
`;

export const bikeRouteQueries = `
    allBikeRoutes: [BikeRoute]!
    bikeRoutesById(id: ID!): BikeRoute!
    myBikeRoutes(user: Int!): [BikeRoute]!
    findCompany(id: ID!): [BikeRoute]!
`;

export const bikeRouteMutations = `
    createBikeRoute(bikeRoute: BikeRouteInput!): BikeRoute!
    deleteBikeRoute(id: ID!): BikeRoute!
    updateBikeRoute(id: ID!, bikeRoute: BikeRouteInput!): BikeRoute!
`;
