var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var controlleraddress = require("../controller/controlleraddress");
router.route("/getall").get(controller.displayall);
router.route("/:studentid").get(controller.display1);
router.route("/:studentid/address").get(controlleraddress.displayaddress);
router.route("/:studentid/address/:addressid").get(controlleraddress.displayaddressid);

module.exports = router;