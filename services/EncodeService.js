const Shortlink = require("../models/shortlinks");
const cryptoRandomString = require("crypto-random-string");

exports.generateEncodedShortLink = async () => {
  try {
    let shortlink = "";

    do {
      shortlink = cryptoRandomString({ length: 6, type: "alphanumeric" });
    } while ((await Shortlink.findOne({ shortlink })) !== null);

    return shortlink;
  } catch (error) {
    console.log(error);
    return "";
  }
};
