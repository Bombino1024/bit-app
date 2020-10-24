const express = require('express');
const app = express();
var mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

app.use(bodyParser.json());

const postsRoute = require('./routes/posts');

const server = new ApolloServer({
    typeDefs,
    resolvers
  });

server.applyMiddleware({ app });

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true }, () => {
    console.log('Connected to db')
});

app.listen(3001);