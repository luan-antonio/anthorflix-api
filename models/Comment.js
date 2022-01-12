const mongoose = require("mongoose");
const commentSchema = require('../schemas/Comment');

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;