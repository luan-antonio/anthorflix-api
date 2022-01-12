const mongoose = require("mongoose");
const ratingSchema = require('./Rating');
const personSchema = require('./Person');

const schema = new mongoose.Schema({
    title: String,
    originalTitle: String,
    status: String,
    originalLang: String,
    budget: Number,
    revenue: Number,
    certification: Number,
    release: Date,
    runtime: Number,
    overview: String,
    ratings: [ratingSchema],
    cast: [personSchema],
    directors: [personSchema],
    writers: [personSchema],
    genres: Array
});

module.exports = schema;
