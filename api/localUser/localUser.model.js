const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "LocalUser",
  new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
  })
);
