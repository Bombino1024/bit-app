const { json } = require("body-parser");
const { query } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/x", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/x", async (req, res) => {
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

// router.get("/:postId", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.get("/:owner", async (req, res) => {
  try {
    let query = { $where: `this.owner == '${req.params.owner}'` };
    const posts = await Post.find(query);
    // const post = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    let title = req.body.title;
    let query = { $where: `this.title == '${title}'` };
    const posts = await Post.find(query);
    mres.json(posts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/find", async (req, res) => {
  const query = {
    title: req.body.title,
  };

  try {
    const post = await Post.find(query);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

router.put("/patch2", async (req, res) => {
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

module.exports = router;
