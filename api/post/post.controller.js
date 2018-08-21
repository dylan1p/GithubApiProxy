const mongoose = require("mongoose");
const Post = require("./post.model");

const createPost = async (req, res) => {
  const creator = req.user.id;

  if (!req.body.title) {
    return res.status(400).send("Missing parameter title.");
  }

  try {
    const newPost = new Post({
      ...req.body,
      creator
    });
    const { _id } = await newPost.save();

    const postDoc = await Post.findById(
      _id,
      "title body picture creator taggedUsers"
    )
      .populate("creator", "username")
      .populate("taggedUsers", "id login url")
      .exec();

    return res.status(201).json(postDoc);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPosts = async (req, res) => {
  const perPage = +req.query.perPage || 20;
  const page = +req.query.page || 1;

  let { localUserId } = req.query;

  if (localUserId === "me") {
    localUserId = req.user.id;
  }

  if (localUserId && !mongoose.Types.ObjectId.isValid(localUserId)) {
    return res.status(400).send("Invalid id");
  }

  try {
    const query = Post.find({}, "title body picture creator taggedUsers")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("creator", "username")
      .populate("taggedUsers", "id login url");

    if (localUserId) {
      query.where({ creator: localUserId });
    }

    const posts = await query.exec();

    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const postDoc = await Post.findById(
      postId,
      "title body picture creator taggedUsers"
    )
      .populate("creator", "username")
      .populate("taggedUsers", "id login url")
      .exec();

    return res.json(postDoc).send();
  } catch (err) {
    return res.status(404).send(err);
  }
};

const updatePost = (req, res) => {
  const postId = req.params.id;

  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then(postDoc =>
      res
        .json(postDoc)
        .status(200)
        .send()
    )
    .catch(err => res.status(404).send(err));
};

const deactivatePost = (req, res) => {
  const postId = req.params.id;

  Post.findByIdAndUpdate(postId, { deactivated: true })
    .then(() =>
      res.json({
        success: true,
        message: "Deactivated!"
      })
    )
    .catch(err => res.status(404).send(err));
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deactivatePost
};
