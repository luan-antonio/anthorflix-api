const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  knownFor: String,
  gender: String,
  birthplace: String,
  dateOfBirth: Date,
  creditedTo: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }]
});

module.exports = schema;
