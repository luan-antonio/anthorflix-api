const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  refersTo: { type: mongoose.Types.ObjectId, ref: "Rating" },
  content: String,
});

module.exports = schema;
