const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    id: { type: Number, index: { unique: true } },
    login: { type: String, index: { unique: true } },
    avatar_url: String,
    url: String,
    score: Number,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
  })
);

User.schema.pre("save", next => {
  this._update = { $set: { updatedDate: Date.now() } };
  next();
});

module.exports = User;
