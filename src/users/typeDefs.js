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
`;

export const usersQueries = `
    userById(userid: Int!): User!
    userByUsername(username: String!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(username: String!): User!
    login(username: String!, password: String!): User!
`;
