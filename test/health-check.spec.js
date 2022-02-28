process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../index");

chai.use(chaiHttp);

describe("Test Api response", () => {
  /*
   * A basic test to test the api default response
   */
  describe("Health Check", () => {
    it("it should return stautus 200 and health check", (done) => {
      chai
        .request(server)
        .get("/health")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.body, {
            status: "success",
            message: "Health Check Passed",
          });
          done();
        });
    });
  });
});
