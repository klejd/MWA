var express = require("express");
var router = express.Router();
var controller = require("../controller/controllers");


router.route("/nobels").get(controller.displayall)
    .post(controller.addone);

router.route("/nobels/:nobelId").get(controller.display1)
    .put(controller.updateput)
    .delete(controller.NobelDeleteOne)
    .patch(controller.updatepatch);
// .get(controller.displaycountry);
router.route("/nobels/:bornCountry").get(controller.displaycountry);
//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3

module.exports = router;