export const usersTypeDef = `
type User {
    id: Int!
    username: String!
    password: String!
    provider: String!
    email: String!
    name: String!
    lastname: String!
    cellphone: String!
    uid: String!
    allow_password_change: Boolean!
    token: String
    client: String
}

input UserInput {
  username: String!
  password: String!
  password_confirmation: String!
  email: String!
  name: String!
  lastname: String!
  cellphone: String!
}

type Validate {
  success: String!
}

`;


export const usersQueries = `
    userById(userid: Int!): User!
    userByUsername(username: String!): User!
    validateToken(token: String!, uid: String!, client: String!): Validate!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(username: String!): User!
    login(email: String!, password: String!): User!
    logout(token: String!, uid: String!, client: String!): Validate!
`;
