var db = require("../data/db");
const mongoose = require("mongoose");
const student = mongoose.model("Student");

module.exports.displayaddress = (req, res) => {
    let studentid = req.params.studentid;
    //let addressid = req.params.publisherid;
    student.findById(studentid).select("address").exec((err, student) => {

        res.status(200).json(student.address);
    });


}
module.exports.displayaddressid = (req, res) => {
    let studentid = req.params.studentid;
    //let addressid = req.params.addressid;
    student.findById(studentid).select("address").exec((err, student) => {
        const address = student.address.id(req.params.addressid);
        res.status(200).json(address);
    });


}