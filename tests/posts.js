const chai = require("chai");
const assert = chai.assert;
const faker = require('faker');
const app = require("../app");
const request = require("supertest")(app);
const User = require("../api/user/user.model");
const LocalUser = require("../api/localUser/localUser.model");
const Post = require("../api/post/post.model");
const { generateToken } = require("../api/localUser/localUser.controller");

const {
  testUserDetails,
  expectedSearchResult,
  mockPost
} = require("../testData.config");

describe("Posts", () => {
  let userDoc, localUserDoc, localUserToken, postDoc;

  before((done) => {
    User.remove().then(() => {
      LocalUser.remove().then(()=> {
        const localUser = new LocalUser(testUserDetails[0])

        localUser.save().then(localUserDocument => {
          localUserDoc = localUserDocument;
          localUserToken = generateToken(localUserDoc._id, localUserDoc.username);
        }).then(() => {
          const user = new User(expectedSearchResult[0]);

          user.save().then(userDocument => {
            userDoc = userDocument

            const post = new Post({
              ...mockPost,
              taggedUser : [ userDoc._id ],
              creator: localUserDoc._id
            });

            post.save().then(postDocument => {
              postDoc = postDocument;
              done();
            }).catch(err => console.log)

          });
        });
      });
    });
  });

  after((done) => {
    User.remove().then(()=> {
      LocalUser.remove(()=> {
        Post.remove(() => {
          done();
        })
      });
    });
  });

  describe('Create post ', () => {

    it("should return a 201 if the post is created", done => {
      request
        .post('/api/post')
        .set('x-access-token', localUserToken)
        .expect('Content-Type', /json/)
        .send({
          ...mockPost,
          taggedUsers : [ userDoc._id ]
        })
        .expect(201)
        .then(res => {
          assert.isObject(res);
          done();
        });
    });

    it("should return 400 if title is not included", done => {
      request
        .post('/api/post')
        .set('x-access-token', localUserToken)
        .send({})
        .expect(400, done);
    });
  });

  describe("Get post", () => {

    it("should return 200 if post is found", done => {
      request
        .get(`/api/post/${postDoc._id}`)
        .set('x-access-token', localUserToken)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it("should return 404 if post does not exist", done => {
      request
        .get(`/api/post/1232`)
        .set('x-access-token', localUserToken)
        .expect(404, done);
    });

  });

  describe("Get posts", () => {

    before(done => {
      let postPromises = [];

      for(let i = 0;  i < 100; i++) {

        const post = new Post({
          title: faker.lorem.sentence(),
          body: faker.lorem.sentences(),
          taggedUser : [ userDoc._id ],
          creator: localUserDoc._id
        });

        postPromises.push(post.save())
      }

      Promise.all(postPromises)
        .then(()=> done());
    })

    it("should return 200 with an array of 20 results", done => {
      request
        .get(`/api/post/list`)
        .set('x-access-token', localUserToken)
        .expect(200)
        .then(({ body }) => {
          assert.lengthOf(body, 20, 'Array has length of 20');
          done();
        });
    });

    it("should return 200 with an array of 2 results", done => {
      request
        .get(`/api/post/list?perPage=2`)
        .set('x-access-token', localUserToken)
        .expect(200)
        .then(({ body }) => {
          assert.lengthOf(body, 2, 'Array has length of 2')
          done();
        });
    });

    it("should return 200 with an empty array when page number is too high", done => {
      request
        .get(`/api/post/list?page=200`)
        .set('x-access-token', localUserToken)
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          assert.lengthOf(body, 0, 'Array has length of 0')
          done();
        });
    });
  });

  describe("Get posts by localUserId", () => {

    it("should return 200 with an array of results", done => {
      request
        .get(`/api/post/list?localUserId=me`)
        .set('x-access-token', localUserToken)
        .expect(200)
        .then(({ body }) => {
          assert.isArray(body);
          done();
        });
    });

    it("should return 400 if the id is invalid", done => {
      request
        .get(`/api/post/list?localUserId=1234`)
        .set('x-access-token', localUserToken)
        .expect(400, done)
    });
  });

  describe("update post", () => {

    it("should return 200 if post is updated", done => {
      request
        .put(`/api/post/${postDoc._id}`)
        .set('x-access-token', localUserToken)
        .send({
          ...mockPost,
          body : 'new body',
          taggedUsers : [ userDoc._id ]
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.body, 'new body');
          done();
        });
    });

    it("should return 404 if post does not exist", done => {
      request
        .put(`/api/post/1232`)
        .set('x-access-token', localUserToken)
        .send({
          ...mockPost,
          body : 'new body',
          taggedUsers : [ userDoc._id ]
        })
        .expect(404, done);
    });

    describe("deactivate post", () => {
      it("should return 200 if the post is deactivated", done => {
        request
          .put(`/api/post/${postDoc._id}/deactivate`)
          .set('x-access-token', localUserToken)
          .then(() => {
            Post.findById(postDoc._id).then(post => {
              assert.deepEqual(post.deactivated, true);
              done()
            });
          });
      });
    })
  });
});
