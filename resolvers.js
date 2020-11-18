const Post = require("./models/Post");
const Login = require("./models/Login");

const resolvers = {
  Query: {
    getPost: async (_, { title }) => {
      let query = { $where: `this.title == '${title}'` };
      try {
        const post = await Post.find(query);
        return post;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { title, description, owner }) => {
      const post = new Post({ title, description, owner });
      await post.save();
      return post;
    },
    deletePost: async (_, { title }) => {
      let query = { $where: `this.title == '${title}'` };
      const posts = await Post.find(query);
      await Post.deleteMany(query);
      return posts;
    },
  },
};

module.exports = resolvers;
