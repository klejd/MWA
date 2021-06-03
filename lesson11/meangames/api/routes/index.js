var express = require("express");
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "cs572"; // todo: move this to .env file

var router = express.Router();
var controller = require("../controllers/controllers");
var publisher = require("../controllers/publisher");
var reviews = require("../controllers/reviews");
const controllerUsers = require('../controllers/user.controller')
    // router.route("/test").post(function(req, res) {
    //     console.log("request " + req.body.title);
    //     return;
    // });
router.route("/users").post(controllerUsers.usersRegister);
router.route("/auth").post(controllerUsers.usersAuthenticate);

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

router.route('/user').get(authenticateToken, controllerUsers.getProfile);
//getprofile

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err) // pse nuk del kjo?

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
} //ca ka?


//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3
module.exports = router;