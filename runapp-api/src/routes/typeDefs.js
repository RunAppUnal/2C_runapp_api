export const routesTypeDef = `
type Route {
    id: Int!
    user_id: Int!
    car_id: Int!
    title: String!
    description: String!
    from_lat: Float!
    from_lng: Float!
    to_lat: Float!
    to_lng: Float!
    waypoints: String!
    departure: Datetime!
    cost: Float!
    users_in_route: String!
    active: Boolean!
    spaces_avaible: Int!
}

input StudentInput {
  id: Int!
  user_id: Int!
  car_id: Int!
  title: String!
  description: String!
  from_lat: Float!
  from_lng: Float!
  to_lat: Float!
  to_lng: Float!
  waypoints: String!
  departure: Datetime!
  cost: Float!
  users_in_route: String!
  active: Boolean!
  spaces_avaible: Int!
}
`;

export const routesQueries = `
    allRoutes: [Route]!
    routeById(id: Int!): Route!
`;

export const routeMutations = `
    createRoute(route: RouteInput!): Route!
    deleteRoute(id: Int!): Route!
    updateRoute(id: Int!, route: RouteInput!): Route!
`;
