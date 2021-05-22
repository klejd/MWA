const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addoneaddress = function(req, res) {



    Student.findById(req.params.studentId).exec(function(err, addre) {
        const response = {
            status: 200,
            message: addre,
        };
        if (err) {
            response(500, err);
            return;
        }

        if (!addre) {
            response.status = 400;
            response.message = "fsdaa";
            return;
        }
        //all the data that come from body
        addre.address = addre.address || [];
        // rev.reviews = undefined;

        addre.address.push(req.body);


        // rev.reviews.push({
        //     review: req.body.review,
        //     name: req.body.name,
        //     date: req.body.date
        // });


        addre.save(function(err, updateaddr) {

            if (err) {
                response.status = 500;
                response.err = err;
                return;
            }
            //updatereview.reviews = req.body;
            console.log("successfully added", updateaddr);
            res.status(204).json(updateaddr);
        });

    });
}