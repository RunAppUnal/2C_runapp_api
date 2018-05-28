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
    departure: String!
    cost: Float!
    users_in_route: String!
    active: Boolean
    spaces_available: Int!
    ratings: String!
    userRating: String!
    comments: String!
}

input RouteInput {
  user_id: Int!
  car_id: Int!
  title: String!
  description: String!
  from_lat: Float!
  from_lng: Float!
  to_lat: Float!
  to_lng: Float!
  waypoints: String!
  departure: String!
  cost: Float!
  users_in_route: String!
  active: Boolean
  spaces_available: Int!
  ratings: String!
  userRating: String!
  comments: String!
}
`;

export const routesQueries = `
    allRoutes: [Route]!
    routeById(id: Int!): Route!
    myRoutes(userid: Int!): [Route]!
    otherRoutes(userid: Int!): [Route]!
    searchMyRoutes(userid: Int!, word: String!, cost: String!, spaces: String!, date: String!): [Route]!
    searchOtherRoutes(userid: Int!, word: String!, cost: String!, spaces: String!, date: String!): [Route]!
`;

export const routesMutations = `
    createRoute(route: RouteInput!): Route!
    deleteRoute(id: Int!): Route!
    updateRoute(id: Int!, route: RouteInput!): Route!
    removeUserFromRoute(id: Int!, userid: Int!): Route!
    addUserFromRoute(id: Int!, userid: Int!): Route!
`;
