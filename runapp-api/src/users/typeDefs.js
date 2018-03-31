export const usersTypeDef = `
type User {
    userid: Int!
    username: String!
    password: String!
    email: String!
    name: String!
    lastname: String!
    cellphone: String!
}

input UserInput {
  username: String!
  password: String!
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
