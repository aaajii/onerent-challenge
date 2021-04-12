const {buildSchema} = require('graphql')

module.exports = buildSchema(`
type Result {
    users: [User]
    properties: [Property]
}

type Property {
    _id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    rent: Float!
    owner: User!
}

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    properties: [Property!]
}

input PropertyInput {
    street: String!
}

input UserInput {
    firstName: String!
}

type RootQuery {
    properties: [Property!]!
    users: [User!]!
    search(searchInput: String!): Result
}

type RootMutation{
    createProperty(propertyInput: PropertyInput): Property
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)