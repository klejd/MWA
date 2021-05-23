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
module.exports.getalladdresses = (req, res) => {
    let offset = 0;
    let count = 5;
    const maxCount = 50;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ message: "QueryString Offset and Count must be a number" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ message: "QueryString Count must not exceed " + maxCount });
    } else {
        Student.findById(req.params.studentId).select("address").skip(offset).limit(maxCount).exec((err, students) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(students);
            }
        });
    }
}

//------------------------------------------------------------------
module.exports.getoneaddress = (req, res) => {

    let studentId = req.params.studentId
    Student.findById(studentId).select("address").exec(function(err, students) {
        response = {
            status: 200,
            message: students
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!students) {
            response.status = 404;
            response.message = { "message": "game id not found" };
        } else {
            const publish = students.address.id(req.params.addressid)
            res.status(response.status).json(publish);
        }
    });
}
module.exports.deleteoneaddress = function(req, res) {



    Student.findById(req.params.studentId).select("address").exec(function(err, students) {
        let response = {
            status: 200,
            message: students
        }
        students.address.id(req.params.addressid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!students) {
            response.status = 400;
            return;
        }
        students.save(function(err, rev) {

            if (err) {
                response.status = 500;
                return;
            }
            console.log("successfully deleted", rev);
            res.status(204).json(rev);
        });
    });
}
module.exports.updatedput = function(req, res) {
    const addressid = req.params.addressid;
    const studentId = req.params.studentId;


    Student.findById(studentId, function(err, students) {
        const addressupdated = students.address.id(addressid);
        if (!err) {
            if (!students) {
                res.status(404).send(' was not found');
            } else {
                addressupdated.country = req.body.country;
                addressupdated.state = req.body.review;
                addressupdated.city = req.body.city;
                addressupdated.street = req.body.street;
                addressupdated.zip = req.body.zip;

                students.save(function(saveerr, savestudent) {
                    if (!saveerr) {
                        res.status(200).send(savestudent.address.id(addressid));
                    } else {
                        res.status(400).send(saveerr.message);
                    }
                });
            }
        } else {
            res.status(400).send(err.message);
        }
    });
};
module.exports.updatepatch = function(req, res) {
    const addressid = req.params.addressid;
    const studentId = req.params.studentId;


    Student.findById(studentId, function(err, students) {
        const addressupdated = students.address.id(addressid);
        if (!err) {
            if (!students) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.country) {
                    addressupdated.country = req.body.country;
                }
                if (req.body.state) {
                    addressupdated.state = req.body.review;
                }
                if (req.body.city) {
                    addressupdated.city = req.body.city;
                }
                if (req.body.street) {
                    addressupdated.street = req.body.street;
                }
                if (req.body.zip) {
                    addressupdated.zip = req.body.zip;
                }


                students.save(function(saveerr, savestudent) {
                    if (!saveerr) {
                        res.status(200).send(savestudent.address.id(addressid));
                    } else {
                        res.status(400).send(saveerr.message);
                    }
                });
            }
        } else {
            res.status(400).send(err.message);
        }
    });
};