const rp = require("request-promise");
const User = require("./user.model");

const GITHUB_API_URL = "https://api.github.com";

const prepareQueryString = ({ name, location, language }) => {
  let queryString = "";

  if (name) {
    queryString += name;
  }
  if (location) {
    queryString += `+location:${location}`;
  }
  if (language) {
    queryString += `+language:${language}`;
  }

  return queryString;
};

/* eslint-disable camelcase */
const updateUser = (userId, user) =>
  User.findByIdAndUpdate(userId, user, { new: true })
    .then(({ id, login, avatar_url, url, score }) => ({
      id,
      login,
      avatar_url,
      url,
      score
    }))
    .catch(err => {
      throw new Error(`Error updating user : ${err}`);
    });

const saveUser = user => {
  const newUser = new User(user);

  return newUser
    .save()
    .then(({ id, login, avatar_url, url, score }) => ({
      id,
      login,
      avatar_url,
      url,
      score
    }))
    .catch(err => {
      throw new Error(`Error saving user: ${err}`);
    });
};
/* eslint-disable camelcase */

const saveUsers = users => {
  const userPromises = users.map(async user => {
    const doc = await User.findOne({ login: user.login });
    // Check if user exist
    if (doc === null) {
      return saveUser(user);
    }
    return updateUser(doc._id, user);
  });

  return Promise.all(userPromises);
};

const getUsersGithub = params => {
  const queryString = prepareQueryString(params);

  return rp(`${GITHUB_API_URL}/search/users?q=${queryString}`, {
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  })
    .then(res => res.items)
    .catch(err => {
      throw new Error(`Error fetching from github, ${err}`);
    });
};

const getUsers = async (req, res) => {
  const { name, location, language } = req.query;

  if (name === undefined && location === undefined && language === undefined) {
    return res.status(400).send("Must include search parameters");
  }

  try {
    const githubUsers = await getUsersGithub({ location, name, language });
    const users = await saveUsers(githubUsers);

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = { getUsers };
