const Post = require("./models/Post");
const Login = require("./models/Login");

const resolvers = {
  Query: {
    posts: () => Post.find(),
    post: (_, { id }) => {
      const post = Post.findById(id);
      return post;
    },
    unathorizedGet: async (_, { title }) => {
      let query = { $where: `this.title == '${title}'` };

      try {
        const post = await Post.find(query);
        return post;
      } catch (err) {
        console.log(err);
      }
    },
    unathorizedGet2: async (_, { title }) => {
      const query = {
        title: title,
      };

      try {
        const post = await Post.find(query);
        return post;
      } catch (err) {
        console.log(err);
      }
    },
    unathorizedLogin: async (_, { username, password }) => {
      let query = {
        $where: `(this.username == '${username}') && (this.password == '${password}')`,
      };
      const result = await Login.find(query);
      return result;
    },
  },
  Mutation: {
    createPost: async (_, { title, description, owner }) => {
      const post = new Post({ title, description, owner });
      await post.save();
      return post;
    },
    updatePost: async (_, { id, title }) => {
      await Post.updateOne({ _id: id }, { $set: { title: title } });
      const updatedPost = Post.findById(id);
      return updatedPost;
    },
    deletePost: async (_, { id }) => {
      const removedPost = Post.findByIdAndDelete({ _id: id });
      return removedPost;
    },
    unathorizedDelete: async (_, { title }) => {
      let query = { $where: `this.title == '${title}'` };
      const posts = await Post.find(query);
      await Post.deleteMany(query);
      return posts;
    },
  },
};

module.exports = resolvers;
