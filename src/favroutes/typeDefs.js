export const favroutesTypeDef = `
type Favroute {
    id: Int!
    user_id: Int!
    polyline1: String!
    polyline2: String!
    polyline3: String!
    polyline4: String!
    polyline5: String!
    count: Int!
}

input FavrouteInput {
    user_id: Int!
    polyline1: String!
    polyline2: String!
    polyline3: String!
    polyline4: String!
    polyline5: String!
    count: Int!
}
`;

export const favroutesQueries = `
    allFavroutes: [Favroute]!
    favrouteById(id: Int!): Favroute!
    myFavRoutes(user_id: Int!): [Favroute]!
`;

export const favroutesMutations = `
    createFavroute(favroute: FavrouteInput!): Favroute!
    deleteFavroute(id: Int!): Favroute!
    updateFavroute(id: Int!, favroute: FavrouteInput!): Favroute!
`;
