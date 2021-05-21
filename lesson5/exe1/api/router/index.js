var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");

router.route("/getall").get(controller.displayall);
router.route("/:gameid").get(controller.display1);

module.exports = router;