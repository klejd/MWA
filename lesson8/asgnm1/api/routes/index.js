var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var publisher = require("../controller/publisher");
var reviews = require("../controller/reviews");

// router.route("/test").post(function(req, res) {
//     console.log("request " + req.body.title);
//     return;
// });
router.route("/games/:gameId/publisher/:publisherid")
    .get(publisher.getapublishergame)
    .delete(publisher.gamesDeleteOne)
    .put(publisher.updateput)
    .patch(publisher.updatepatch);

router.route("/games/:gameId/publisher")
    .get(publisher.getallpublishers)
    .post(publisher.addonepublisher);

router.route("/games/:gameId/reviews/:reviewid")
    .get(reviews.getbyid)
    .delete(reviews.deleteonereview)
    .put(reviews.updatedput)
    .patch(reviews.updatepatch);
router.route("/games/:gameId/reviews")
    .post(reviews.addreviews)
    .get(reviews.getallreviews);

router.route("/games").get(controller.displayall)
    .post(controller.addone);

router.route("/games/:gameId").get(controller.display1)
    .put(controller.updateput)
    .delete(controller.gamesDeleteOne)
    .patch(controller.updatepatch);
//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3
module.exports = router;