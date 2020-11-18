const { json } = require("body-parser");
const { query } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
  });

  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedPost = await Post.updateMany(
      { title: req.body.title },
      { $set: { description: req.body.description } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:owner", async (req, res) => {
  try {
    let query = { $where: `this.owner == '${req.params.owner}'` };
    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
