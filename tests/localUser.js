const chai = require("chai");
const assert = chai.assert;
const app = require("../app");
const request = require("supertest")(app);
const LocalUser = require("../api/localUser/localUser.model");
const { testUserDetails } = require("../testData.config");

describe("Local Users", () => {
  before(done => {
    LocalUser.remove(async () => {
      const testUser = new LocalUser(testUserDetails[0]);
      await testUser.save()
      done();
    });
  })

  after(done => {
    LocalUser.remove(done);
  })

  describe("Registering", () => {

    it("should return a status 201 if user is registered ", done => {
      request
        .post("/api/local-user/register")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send(testUserDetails[1])
        .expect(201)
        .then(response => {
          assert.containsAllKeys(response.body,["token", "message"]);
          done();
        })
    });

    it("should return a status 400 if field is missing ", done => {
      request
        .post("/api/local-user/register")
        .send({ username : "testuser" })
        .expect(400, done);
    });

    it("should return a 409 if the user already exists", done => {
      request
        .post("/api/local-user/register")
        .send(testUserDetails[0])
        .expect(409, done);
    });
  });

  describe("Login", () => {
    it("should return 200 when user is logged in ", done => {
      request
        .post("/api/local-user/authenticate")
        .send(testUserDetails[0])
        .expect(200)
        .then(response => {
          assert.containsAllKeys(response.body,["token", "message"]);
          done();
        });
    });

    it("should return 401 when user login fails", done => {
      request
        .post("/api/local-user/authenticate")
        .send({
          username: testUserDetails[0].username,
          password: "wrongpassword"
        })
        .expect(401, done);
    });
  });

});
