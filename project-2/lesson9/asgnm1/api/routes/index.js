var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");
var skills = require("../controller/skillsController");
var reviews = require("../controller/reviews");
var location = require("../controller/LocationController");


router.route("/jobs/:jobId/locations/:locationid")
    .get(location.getbyid)
    .delete(location.deleteonelocation)
    .put(location.updatedput)
    .patch(location.updatepatch);

router.route("/jobs/:jobId/locations")
    .get(location.getalllocations)
    .post(location.addlocations);
// router.route("/test").post(function(req, res) {
//     console.log("request " + req.body.title);
//     return;
// });
router.route("/jobs/:jobId/skills/:skillid")
    .get(skills.getbyid)
    .delete(skills.deleteoneskill)
    .put(skills.updatedput)
    .patch(skills.updatepatch);

router.route("/jobs/:jobId/skills")
    .get(skills.getallskills)
    .post(skills.addskills);

router.route("/jobs/:jobId/reviews/:reviewid")
    .get(reviews.getbyid)
    .delete(reviews.deleteonereview)
    .put(reviews.updatedput)
    .patch(reviews.updatepatch);
router.route("/jobs/:jobId/reviews")
    .post(reviews.addreviews)
    .get(reviews.getallreviews);

router.route("/jobs").get(controller.displayall)
    .post(controller.addone);

router.route("/jobs/:jobId").get(controller.display1)
    .put(controller.updateput)
    .delete(controller.jobsDeleteOne)
    .patch(controller.updatepatch);
//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3
module.exports = router;