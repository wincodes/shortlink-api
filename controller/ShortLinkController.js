const Validator = require("validatorjs");
const Shortlink = require("../models/shortlinks");

exports.encode = async (req, res) => {
  try {
    

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "An Error Occurred Please Try Again",
    });
  }
};