const jwt = require("jsonwebtoken");
const LocalUser = require("./localUser.model");
const config = require("../../config");

const generateToken = (id, username) =>
  jwt.sign({ id, username }, config.superSecret, { expiresIn: 60 });

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing parameter.");
  }

  let user;
  try {
    user = await LocalUser.findOne({ username });
  } catch (err) {
    throw err;
  }

  if (user) {
    return res.status(409).send("Username already exist.");
  }

  const newUser = new LocalUser({ username, password });

  return newUser.save().then((localUser, err) => {
    if (err) {
      throw err;
    }

    const token = generateToken(localUser._id, localUser.username);

    res.status(201);
    return res.json({
      success: true,
      message: "User created!",
      token
    });
  });
};

const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing parameter.");
  }

  return LocalUser.findOne({ username }).then((user, err) => {
    if (err) throw err;

    if (!user) {
      return res.status(401).send("Username does not exist");
    }

    if (user.password !== password) {
      return res.status(401).send("Authentication failed. Incorrect password");
    }

    const token = generateToken(user._id, user.username);

    return res.json({
      success: true,
      message: "User authentiacted!",
      token
    });
  });
};

module.exports = { registerUser, authenticateUser, generateToken };
