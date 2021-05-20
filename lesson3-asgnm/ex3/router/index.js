var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers.js");
router.route("/").get(controller.display);
module.exports = router;