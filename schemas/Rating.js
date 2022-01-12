const mongoose = require("mongoose");
const commentSchema = require("./Comment");

const schema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  score: Number,
  refersTo: { type: mongoose.Types.ObjectId, ref: "Movie" },
  comments: [commentSchema],
});

module.exports = schema;
