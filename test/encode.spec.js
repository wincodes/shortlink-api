process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../index");
const Chance = require("chance");
const Shortlink = require("../models/shortlinks");

const chance = Chance();

chai.use(chaiHttp);

describe("Api to Encode a url", () => {
  /*
   * Encoding endpoint
   */
  const endpoint = "/api/encode";
  const url = chance.url();

  after(async () => {
    // clear created Data
    console.log("clearing db");
    await Shortlink.deleteMany();
    console.log("db cleared");
  });

  it("it should validate input and return 400 status code", async () => {
    const res = await chai.request(server).post(endpoint).send({});

    assert.equal(res.status, 400);
    assert.deepInclude(res.body, {
      status: "failed",
      message: "Url is Required",
    });
  });

  it("it Insert a new Record in the db and return a valid json", async () => {
    const beforeCreation = await Shortlink.countDocuments();
    console.log(beforeCreation);

    const res = await chai.request(server).post(endpoint).send({ url });

    const afterCreation = await Shortlink.countDocuments();
    console.log(afterCreation);

    assert.equal(res.status, 201);
    assert.equal(afterCreation, beforeCreation + 1);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.data.message, "Url Encoded Successfully");
    assert.isOk(res.body.data.shortlink);
  });

  it("it should return 422 if url already exists", async () => {
    const beforeCreation = await Shortlink.countDocuments();
    console.log(beforeCreation);

    const res = await chai.request(server).post(endpoint).send({ url });

    const afterCreation = await Shortlink.countDocuments();
    console.log(afterCreation);

    assert.equal(res.status, 422);
    assert.deepInclude(res.body, {
      status: "failed",
      message: "Url Already Exists",
    });
  });
});
