const { gql } = require("apollo-server");

const typeDefs = gql(`
  type Query {
    getPost(title: String!): [Post!]!
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
    deletePost(title: String!): [Post!]!
  }
  `);

module.exports = typeDefs;
