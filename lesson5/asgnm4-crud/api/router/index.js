var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var address = require("../controller/address");
//var reviews = require("../controller/reviews");

// router.route("/test").post(function(req, res) {
//     console.log("request " + req.body.title);
//     return;
// });
router.route("/Students/:studentId/address").post(address.addoneaddress);
//router.route("/Students/:studentId/reviews").post(reviews.addreviews);

router.route("/Students").get(controller.displayall)
    .post(controller.addone);

router.route("/Students/:studentId").get(controller.display1)
    .put(controller.updateput)
    .delete(controller.StudentsDeleteOne)
    .patch(controller.updatepatch);

module.exports = router;