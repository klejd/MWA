const controller = require("../Controller/controller.js");
const express = require("express");
const router = express.Router();

router.route("/getgames").get(controller.show);
module.exports = router;