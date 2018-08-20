const rp = require("request-promise");
const parseLinkHeader = require("parse-link-header");
const querystring = require("querystring");
const User = require("./user.model");

const GITHUB_API_URL = "https://api.github.com";

const prepareQueryString = ({ name, location, language, perPage, page}) => {
  let queryString = "";

  if (name) {
    queryString += name;
  }  if (location) {
    queryString += `+location:${location}`;
  }  if (language) {
    queryString += `+language:${language}`;
  } if (perPage) {
    queryString += `&per_page=${perPage}`;
  } if (page) {
    queryString += `&page=${page}`;
  }

  return queryString;
};

const preparePaginationLinks = (
  host,
  queryParams,
  { next, prev, first, last }
) => {

  Object.keys(queryParams).forEach(
    key => queryParams[key] === undefined || key === 'page' && delete queryParams[key]
  );

  const qs = querystring.stringify(queryParams);

  const paginationLinks = {};

  if (next) {
    paginationLinks.next = `http://${host}/api/users?${qs}&page=${next.page}`;
  }
  if (prev) {
    paginationLinks.prev = `http://${host}/api/users?${qs}&page=${prev.page}`;
  }
  if (first) {
    paginationLinks.first = `http://${host}/api/users?${qs}&page=${first.page}`;
  }
  if (last) {
    paginationLinks.last = `http://${host}/api/users?${qs}&page=${last.page}`;
  }

  return paginationLinks;
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
    resolveWithFullResponse: true,
    json: true
  })
    .then(({ body, headers }) => {
      let paginationLinks;

      if (headers.link) {
        paginationLinks = parseLinkHeader(headers.link);
      }

      return { items: body.items, paginationLinks };
    })
    .catch(err => {
      throw new Error(`Error fetching from github, ${err}`);
    });
};

const getUsers = async (req, res) => {
  const { host } = req.headers;
  const { name, location, language, perPage, page } = req.query;

  if (name === undefined && location === undefined && language === undefined) {
    return res.status(400).send("Must include search parameters");
  }

  try {
    const { items, paginationLinks } = await getUsersGithub({
      name,
      location,
      language,
      perPage,
      page
    });

    const users = await saveUsers(items);

    if (paginationLinks) {
      res.links(preparePaginationLinks(host, req.query, paginationLinks));
    }

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

module.exports = { getUsers };
