const express = require("express");
const router = express.Router();
const controllerStudents = require("../controllers/students.controller");
const controllerAddresses = require("../controllers/addresses.controller");

router.route("/students").get(controllerStudents.studentsGetAll)
.post(controllerStudents.studentAdd);

router.route("/students/:studentId").get(controllerStudents.studentGetOne)
.put(controllerStudents.studentFullUpdate)
.patch(controllerStudents.studentPartialUpdate)
.delete(controllerStudents.studentDelete);

router
  .route("/students/:studentId/addresses")
  .get(controllerAddresses.addressesGetAll);

router
  .route("/students/:studentId/addresses/:addressId")
  .get(controllerAddresses.addressGetOne);

module.exports = router;
