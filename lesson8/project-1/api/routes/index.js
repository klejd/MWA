var express = require("express");
var router = express.Router();
var doctorcontroller = require("../controller/doctorcontroller");
var address = require("../controller/dcotoraddress");
var reviews = require("../controller/doctorreviews");
var patientsController = require("../controller/Patient-controller")
var patientsaddress = require("../controller/Patient-address-controller");
var patienthistory = require("../controller/Patient-History-controller");

router.route("/Patients/:patientId/history/:historyId")
    .get(patienthistory.getbyid)
    .delete(patienthistory.deleteonehistory)
    .put(patienthistory.updatedput)
    .patch(patienthistory.updatepatch);


router.route("/Patients/:patientId/history")
    .post(patienthistory.addhistory)
    .get(patienthistory.getallhistories);

router.route("/Patients").get(patientsController.displayall)
    .post(patientsController.addone);

router.route("/Patients/:patientId")
    .get(patientsController.display1)
    .put(patientsController.updateput)
    .delete(patientsController.deleteonepatient)
    .patch(patientsController.updatepatch);

router.route("/Patients/:patientId/address/:addressid")
    .get(patientsaddress.getoneaddress)
    .delete(patientsaddress.deleteoneaddress)
    .put(patientsaddress.updatedput)
    .patch(patientsaddress.updatepatch);

router.route("/Patients/:patientId/address")
    .get(patientsaddress.getalladdresses)
    .post(patientsaddress.addoneaddress);
//---------------------------------------------------------------------------------
router.route("/Doctor/:doctorId/address/:addressid")
    .get(address.getoneaddress)
    .delete(address.deleteoneaddress)
    .put(address.updatedput)
    .patch(address.updatepatch);

router.route("/Doctor/:doctorId/address")
    .get(address.getalladdresses)
    .post(address.addoneaddress);

router.route("/Doctor/:doctorId/reviews/:reviewid")
    .get(reviews.getbyid)
    .delete(reviews.deleteonereview)
    .put(reviews.updatedput)
    .patch(reviews.updatepatch);
router.route("/Doctor/:doctorId/reviews")
    .post(reviews.addreviews)
    .get(reviews.getallreviews);

router.route("/Doctor").get(doctorcontroller.displayall)
    .post(doctorcontroller.addone);

router.route("/Doctor/:doctorId").get(doctorcontroller.display1)
    .put(doctorcontroller.updateput)
    .delete(doctorcontroller.DoctorssDeleteOne)
    .patch(doctorcontroller.updatepatch);
//60aab3ecd8080b4bece093b4
//60aab3e3d8080b4bece093b3
module.exports = router;