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

describe("Get Statistics of a Url", () => {
  /*
   * Encoding endpoint
   */

  after(async () => {
    // clear created Data
    await Shortlink.deleteMany();
  });


  it("it should return 200 and valid Json Details", async () => {
    const shortlink = await ShortLinkFactory.createSingle();

    const res = await chai.request(server).get(`/api/statistic/${shortlink}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "Statistics Retrieved Successfully");
    assert.isOk(res.body.statistics.url);
    assert.isOk(res.body.statistics.shortlink);
    assert.equal(res.body.statistics.shortlink, shortlink);
    assert.isOk(res.body.statistics.createdAt);
    assert.isOk(res.body.statistics.updatedAt);
  });
});
