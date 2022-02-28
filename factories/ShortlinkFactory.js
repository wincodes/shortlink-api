const Chance = require("chance");
const Shortlink = require("../models/shortlinks");
const { generateEncodedShortLink } = require("../services/EncodeService");

const chance = Chance();

exports.createSingle = async () => {
  try {
    const url = chance.url();

    const newLink = new Shortlink({
      url,
      shortlink: await generateEncodedShortLink(),
    });
    await newLink.save();

    return newLink.shortlink;
  } catch (error) {
    console.log(error);
    return "";
  }
};

exports.createSpecific = async (url) => {
  try {
    const newLink = new Shortlink({
      url,
      shortlink: await generateEncodedShortLink(),
    });
    await newLink.save();

    return newLink.shortlink;
  } catch (error) {
    console.log(error);
    return "";
  }
};
