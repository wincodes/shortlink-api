const Validator = require("validatorjs");
const Shortlink = require("../models/shortlinks");
const { generateEncodedShortLink } = require("../services/EncodeService");

exports.encode = async (req, res) => {
  try {
    const rules = {
      url: "required|string",
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: "failed",
        message: "Url is Required",
      });
    }

    let { url } = req.body;

    if ((await Shortlink.findOne({ url })) !== null) {
      return res.status(422).json({
        status: "failed",
        message: "Url Already Exists",
      });
    }

    const newLink = new Shortlink({
      url,
      shortlink: await generateEncodedShortLink(),
    });
    await newLink.save();

    return res.status(201).json({
      status: "success",
      message: "Url Encoded Successfully",
      shortlink: newLink.shortlink,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "An Error Occurred Please Try Again",
    });
  }
};
