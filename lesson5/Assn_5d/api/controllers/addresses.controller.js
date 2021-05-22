const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressesGetAll = function (req, res) {
  console.log("Get address for a student");
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("address")
    .exec(function (err, student) {
      console.log("GET addresses for student with studentId ", studentId);
      res.status(200).json(student.address);
    });
};

module.exports.addressGetOne = function (req, res) {
  console.log("Get one address for a student");
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;
  Student.findById(studentId).exec(function (err, student) {
    const address = student.address.id(addressId);
    console.log(
      "GET address with " +
        addressId +
        " for student with studentId" +
        studentId
    );
    res.status(200).json(address);
  });
};
