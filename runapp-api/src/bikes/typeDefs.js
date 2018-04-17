export const bikeRouteTypeDef = `
type GeoJSON {
    type: String
    coordinates: [[Float]]
}

type BikeRoute {
    id: ID!
    user_id: Int!
    time: String
    similar_routes: [BikeRoute]
    origin: [Float]!
    destination: [Float]!
    originAddr: String
    destinationAddr: String
    route_points: GeoJSON
    route_distance: Float
}

input BikeRouteInput {
    user_id: Int!
    origin: [Float]!
    destination: [Float]!
    originAddr: String
    destinationAddr: String
    time: String
}
`;

export const bikeRouteQueries = `
    allBikeRoutes: [BikeRoute]!
    bikeRoutesById(id: ID!): BikeRoute!
    findCompany(id: ID!): [BikeRoute]!
`;

export const bikeRouteMutations = `
    createBikeRoute(bikeRoute: BikeRouteInput!): BikeRoute!
    deleteBikeRoute(id: ID!): BikeRoute!
    updateBikeRoute(id: ID!, bikeRoute: BikeRouteInput!): BikeRoute!
`;
