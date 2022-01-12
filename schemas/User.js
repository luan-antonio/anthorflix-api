const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  watchedMovies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
});

module.exports = schema;
