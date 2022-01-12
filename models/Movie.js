const mongoose = require("mongoose");
const movieSchema = require('../schemas/Movie');

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;