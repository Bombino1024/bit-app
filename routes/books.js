const { json } = require("body-parser");
const { query } = require("express");
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    desc: req.body.desc,
  });

  try {
    const saveBook = await book.save();
    res.json(saveBook);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/find", async (req, res) => {
  const query = {};
  query.title = req.body.title;

  try {
    let query = { $where: `this.title == '${req.body.title}'` };
    // const posts = await Post.find(query);
    const book = await Book.find(query);
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/find2", async (req, res) => {
  const query = {
    title: req.body.title,
  };

  try {
    const book = await Book.find(query);
    res.json(book);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
