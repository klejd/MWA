var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var publisher = require("../controller/publisher");
var reviews = require("../controller/reviews");
controllerUsers = require("../controller/user.controller")
    // router.route("/test").post(function(req, res) {
    //     console.log("request " + req.body.title);
    //     return;
    // });
router.route("/games/:gameId/publisher/:publisherid")
    .get(controllerUsers.authenticate, publisher.getapublishergame)
    .delete(controllerUsers.authenticate, publisher.gamesDeleteOne)
    .put(controllerUsers.authenticate, publisher.updateput)
    .patch(controllerUsers.authenticate, publisher.updatepatch);

router.route("/games/:gameId/publisher")
    .get(controllerUsers.authenticate, publisher.getallpublishers)
    .post(controllerUsers.authenticate, publisher.addonepublisher);

router.route("/games/:gameId/reviews/:reviewid")
    .get(controllerUsers.authenticate, reviews.getbyid)
    .delete(controllerUsers.authenticate, reviews.deleteonereview)
    .put(controllerUsers.authenticate, reviews.updatedput)
    .patch(controllerUsers.authenticate, reviews.updatepatch);
router.route("/games/:gameId/reviews")
    .post(controllerUsers.authenticate, reviews.addreviews)
    .get(controllerUsers.authenticate, reviews.getallreviews);

router.route("/games").get(controller.displayall)
    .post(controllerUsers.authenticate, controller.addone);

router.route("/games/:gameId").get(controller.display1)
    .put(controllerUsers.authenticate, controller.updateput)
    .delete(controllerUsers.authenticate, controller.gamesDeleteOne)
    .patch(controllerUsers.authenticate, controller.updatepatch);
//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3
router.route("/users")
    .post(controllerUsers.usersRegister);


router.route("/auth")
    .post(controllerUsers.usersAuthenticate);
module.exports = router;