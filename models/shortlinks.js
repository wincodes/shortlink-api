const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShortlinkSchema = new Schema({
  shortlink: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Shortlink = mongoose.model("shortlinks", ShortlinkSchema);

module.exports = Shortlink;
