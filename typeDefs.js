const { gql } = require("apollo-server");

const typeDefs = gql(`
  type Query {
    posts: [Post!]!
    post(id: String!): Post!
  }
  type Post {
    id: ID!
    title: String!
  }
  type Mutation {
    createPost(title: String!): Post!
    updatePost(id: String!, title: String!): Post!
    deletePost(id: String!): Post!
  }
  `);

  module.exports = typeDefs