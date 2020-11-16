const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
