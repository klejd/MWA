const express = require("express");


const router = express.Router();

const controller1 = require("../controllers/controllers1");



router.route("/calc/:num1").get(controller1.sum);

module.exports = router;