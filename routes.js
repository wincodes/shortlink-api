const express = require("express");
const ShortLinkController = require("./controller/ShortLinkController")

const router = express.Router();

router.post("/encode", ShortLinkController.encode);
router.post("/decode", ShortLinkController.decode);



module.exports = router;
