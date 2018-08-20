const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = mongoose.model(
  "Post",
  new Schema({
    title: { type: String, require: true },
    body: String,
    picture: String,
    creator: { type: Schema.Types.ObjectId, ref: "LocalUser" },
    taggedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    deactivated: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
  })
);

Post.schema.pre("save", next => {
  this._update = { $set: { updatedDate: Date.now() } };
  next();
});

module.exports = Post;
