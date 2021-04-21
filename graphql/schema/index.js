const {buildSchema} = require('graphql')

module.exports = buildSchema(`
type Booking {
    _id: ID!
    property: Property!
    user: User!
}

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
}

input PropertyInput {
    street: String!
}

input UserInput {
    firstName: String!
}

input BookingInput {
    property: ID!
    user: ID!
}

type RootQuery {
    properties: [Property!]!
    users: [User!]!
    bookings: [Booking!]!
    search(searchInput: String!): Result
}

type RootMutation{
    createProperty(propertyInput: PropertyInput): Property
    createUser(userInput: UserInput): User
    bookProperty(bookingInput: BookingInput): Booking
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)