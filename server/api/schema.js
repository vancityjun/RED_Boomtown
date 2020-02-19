const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date
  directive @auth on OBJECT | FIELD_DEFINITION
  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]!
    created: Date
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: Item
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }
  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String!
    tags: [AssignedTag]!
    created: Date
  }
  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }
  type AuthPayload {
    user: User
    token: String
  }

  input SignupInput {
    email: String!
    password: String!
    fullname: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Mutation {
    addItem(item: NewItemInput!): Item
    signup(user: SignupInput!): AuthPayload
    login(user: LoginInput!): AuthPayload
    logout: Boolean!
  }
`;
