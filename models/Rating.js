const mongoose = require("mongoose");
const ratingSchema = require('../schemas/Rating');

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;