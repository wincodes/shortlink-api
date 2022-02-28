process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../index");
const Chance = require("chance");
const Shortlink = require("../models/shortlinks");
const ShortLinkFactory = require("../factories/ShortlinkFactory");

const chance = Chance();

chai.use(chaiHttp);

describe("Decode a shortened Url to it original link", () => {
  /*
   * Encoding endpoint
   */
  const endpoint = "/api/decode";

  after(async () => {
    // clear created Data
    await Shortlink.deleteMany();
  });

  it("it should validate input and return 400 status code", async () => {
    const res = await chai.request(server).post(endpoint).send({});

    assert.equal(res.status, 400);
    assert.deepInclude(res.body, {
      status: "failed",
      message: "Shortlink is Required",
    });
  });

  it("it should return 404 and a valid message if shortlink does not exist", async () => {
    const res = await chai.request(server).post(endpoint).send({ shortlink: "any" });

    assert.equal(res.status, 404);
    assert.deepInclude(res.body, {
      status: "failed",
      message: "Shortlink Not Found",
    });
  });

  it("it should return 200 and a valid Url", async () => {
    const shortlink = await ShortLinkFactory.createSingle();

    const res = await chai.request(server).post(endpoint).send({ shortlink });

    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "Url Decoded Successfully");
    assert.isOk(res.body.url);
  });

  it("it should return 200 and a the correct url associated with the shortlink", async () => {
    const url = chance.url();
    const shortlink = await ShortLinkFactory.createSpecific(url);

    const res = await chai.request(server).post(endpoint).send({ shortlink });

    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "Url Decoded Successfully");
    assert.equal(res.body.url, url);
  });
});
