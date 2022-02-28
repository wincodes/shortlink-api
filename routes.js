const express = require("express");
const ShortLinkController = require("./controller/ShortLinkController")

const router = express.Router();

router.post("/encode", ShortLinkController.encode);
router.post("/decode", ShortLinkController.decode);
router.get("/statistic/:url_path", ShortLinkController.statistics)



module.exports = router;
