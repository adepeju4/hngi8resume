const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

const Blogs = mongoose.model("blogs", blogSchema);

module.exports = Blogs;