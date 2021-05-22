var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var publisher = require("../controller/publisher");
//var reviews = require("../controller/reviews");

// router.route("/test").post(function(req, res) {
//     console.log("request " + req.body.title);
//     return;
// });
router.route("/games/:gameId/publisher").post(publisher.addonepublisher);
//router.route("/games/:gameId/reviews").post(reviews.addreviews);

router.route("/games").get(controller.displayall)
    .post(controller.addone);

router.route("/games/:gameId").get(controller.display1)
    .put(controller.updateput)
    .delete(controller.gamesDeleteOne)
    .patch(controller.updatepatch);

module.exports = router;