//const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const student = mongoose.model("Student");
module.exports.display1 = (req, res) => {
    let studentid = req.params.studentid;
    //let addressid = req.params.publisherid;
    student.findById(studentid).exec((err, games) => {

        res.status(200).json(games);
    });


}
module.exports.displayall = (req, res) => {

    student.find().exec((err, student) => {
        res.status(200).json(student);
    });
};