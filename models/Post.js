const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  owner: String,
});

module.exports = mongoose.model("Posts", PostSchema);
