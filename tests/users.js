const chai = require("chai");
const assert = chai.assert;
const app = require("../app");
const request = require("supertest")(app);
const testData = require("../testdata.config");
const nock = require("nock");

const github = nock('https://api.github.com/search/users')
      .get('?q=tom+location:dublin+language:javascript')
      .reply(200, testData.mockSearchResults);

describe("Github Users", () => {
  describe("Searching github users", () => {

    it("should return a list of github users", done => {
      request
        .get('/api/users?name=tom&location=dublin&language=javascript')
        .expect('Content-Type', /json/)
        .expect(200, testData.expectedSearchResult, done);
    });

    it("should return 400 if the user no query parameters are sent", done => {
      request
        .get('/api/users')
        .expect(400, done);      
    })
  });
});
