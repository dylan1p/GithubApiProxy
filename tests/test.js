const chai = require("chai");

const expect = chai.expect;

describe("A failing test", () => {
  it("it should fail", done => {
    expect(1).to.equal(2);
    done();
  });
});
