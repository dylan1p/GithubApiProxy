const jwt = require("jsonwebtoken");
const LocalUser = require("./localUser.model");
const config = require("../../config");

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

    const token = jwt.sign(
      {
        id: localUser._id,
        username: localUser.username
      },
      config.superSecret,
      {
        expiresIn: 60
      }
    );
    res.status(201)
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

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      config.superSecret,
      {
        expiresIn: 60
      }
    );

    return res.json({
      success: true,
      message: "User created!",
      token
    });
  });
};

module.exports = { registerUser, authenticateUser };
