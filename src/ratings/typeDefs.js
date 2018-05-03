export const ratingsTypeDef = `
type Rating {
    id: Int!
    route_id: Int!
    user_id: Int!
    car_rating: Int!
    driver_rating: Int!
    average_rating: Float!
    comment: String!
}

input RatingInput {
    route_id: Int!
    user_id: Int!
    car_rating: Int!
    driver_rating: Int!
    comment: String
}
`;

export const ratingsQueries = `
    allRatings: [Rating]!
    ratingById(id: Int!): Rating!
`;

export const ratingsMutations = `
    createRating(rating: RatingInput!): Rating!
    deleteRating(id: Int!): Rating!
    updateRating(id: Int!, rating: RatingInput!): Rating!
`;
