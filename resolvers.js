const Post = require('./models/Post');

const resolvers = {
  Query: {
    posts: () => Post.find(),
    post: (_, {id}) => {
        const post = Post.findById(id);
        return post;
    } 
  },
  Mutation: {
    createPost: async (_, { title }) => {
      const post = new Post({ title });
      await post.save();
      return post;
    },
    updatePost: async (_,{id, title}) => {
        await Post.updateOne(
            {_id:id},
            {$set: {title: title}});
        const updatedPost = Post.findById(id);
        return updatedPost;
    },
    deletePost: async (_,{id}) => {
        const removedPost = Post.findByIdAndDelete({_id:id});
        return removedPost;
    }
  }
};

module.exports = resolvers;