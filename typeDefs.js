const { gql } = require("apollo-server");

const typeDefs = gql(`
  type Query {
    posts: [Post!]!
    post(id: String!): Post!
    unathorizedGet(title: String!): [Post!]!
    unathorizedLogin(username: String!, password: String!): [Login!]!
    unathorizedGet2(title: String!): [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    description: String!
    owner: String!
  }
  type Login {
    id: ID!
    username: String!
    password: String!
  }
  type Mutation {
    createPost(title: String!, description: String!, owner: String!): Post!
    updatePost(id: String!, title: String!): Post!
    deletePost(id: String!): Post!
    unathorizedDelete(title: String!): [Post!]!
  }
  `);

module.exports = typeDefs;
