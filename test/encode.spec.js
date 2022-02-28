process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../index");

chai.use(chaiHttp);

describe("Encode a Shortlink Api", () => {
  /*
   * Encoding endpoint
   */

});
