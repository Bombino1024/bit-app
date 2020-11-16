const express = require("express");
const app = express();
var mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// ------------------------------------------------
const cors = require("cors");
app.use(cors());
// ------------------------------------------------

app.use(bodyParser.json());

const postsRoute = require("./routes/posts");
const loginsRoute = require("./routes/logins");
const booksRoute = require("./routes/books");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use("/posts", postsRoute);
app.use("/logins", loginsRoute);
app.use("/books", booksRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to db");
});

app.listen(3001);
