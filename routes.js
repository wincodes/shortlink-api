const express = require("express");
const ShortLinkController = require("./controller/ShortLinkController")

const router = express.Router();

//create fee
router.post("/encode", ShortLinkController.encode);



module.exports = router;
