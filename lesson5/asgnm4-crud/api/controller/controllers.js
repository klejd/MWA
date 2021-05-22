const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
module.exports.display1 = (req, res) => {
    let studentId = req.params.studentId;
    Student.findById(studentId).exec((err, Students) => {
        const response = {
            status: 200,
            message: Students
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Students) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json(Students);
        }
    });


}


module.exports.displayall = (req, res) => {
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
        Student.find().skip(offset).limit(maxCount).exec((err, Students) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(Students);
            }
        });
    }
}


//ask => addone in database
module.exports.addone = (req, res) => {

        console.log("request " + req.body.title);

        if (req.body && req.body.name && req.body.Gpa) {
            const response = {
                status: 200,
                message: Student
            }
            Student.create({
                    name: req.body.name,
                    Gpa: parseFloat(req.body.Gpa),
                    // rate: req.body.rate
                    // price: parseFloat(req.body.price),
                    // minPlayer: req.body.minPlayer,
                    // maxPlayer: req.body.maxPlayer,
                    // minAge: parseInt(req.body.minAge)


                },
                (err, Student) => {
                    if (err) {
                        console.log(err);
                        res.status(response.status = 400).json(err);
                    } else {
                        console.log("Student created", response.message);
                        res.status(response.status = 200).json(response.message);
                    }
                });

            console.log("After request")

        }
    }
    // task2 => update(replace) using put
    // module.exports.updateput = function(req, res) {
    //     const studentId = req.params.studentId;
    //     Student.findById(studentId).exec(function(err, Student) {
    //         const response = {
    //                 status: 204,
    //                 message: Student
    //             }
    //             // console.log("The exec result is"+Student);
    //         if (err) { //error check
    //             console.log("Error finding Student");
    //             response.status = 500;
    //             response.message = err;
    //         } else if (!Student) { //result check
    //             response.status = 404;
    //             response.message = { "message": "Student ID not found" };
    //         }
    //         if (response.status !== 204) {
    //             res.status(response.status).json(response.message);
    //         } else {
    //             //update the Student
    //             // res.status(response.status).json(response.message);
    //             Student.title = req.body.title;
    //             // Student.year = req.body.year;
    //             Student.price = parseFloat(req.body.price);
    //             // Students.minPlayers = req.body.minPlayers;
    //             // Students.maxPlayers = req.body.maxPlayers;
    //             Student.rate = parseInt(req.body.rate);
    //             // Students.minAge = req.body.minAge;
    //             Student.save(function(err, updatedStudent) {
    //                 if (err) {
    //                     response.status = 500;
    //                     response.message = err;
    //                 } else {
    //                     response.message = { "message": "Student updated:" };
    //                 }
    //                 res.status(response.status).json(response.message);
    //             });
    //         }

//     });
// }
//project => restful apis



module.exports.StudentsDeleteOne = function(req, res) {
    const studentId = req.params.studentId;
    console.log("DELETE studentId ", studentId);
    Student.findByIdAndRemove(studentId).exec(function(err, deletedStudent) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding Student");
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("-reviews -publisher").exec((err, Student) => {
        const response = {
            status: 204,
            message: Student
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Student) {
            response.status = 404;
            response.message = { "message": "Student id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {


            if (req.body.title) {
                Student.title = req.body.title;
            }
            if (req.body.price) {
                Student.price = req.body.price;
            }
            if (req.body.rate) {
                Student.rate = req.body.rate;
            }
            Student.save((err, Students) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}

//updateput
module.exports.updateput = function(req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("-reviews -publisher").exec(function(err, Student) {
        const response = {
            status: 204,
            message: Student
        };
        if (err) {
            console.log("Error finding Student");
            response.status = 500;
            response.message = err;
        } else if (!Student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            Student.title = req.body.title;
            Student.year = parseInt(req.body.year);
            Student.price = parseFloat(req.body.price);
            // Student.designer = req.body.designer;
            // Student.minPlayers = parseInt(req.body.minPlayers);
            // Student.maxPlayers = parseInt(req.body.maxPlayers);
            // Student.rate = parseFloat(req.body.rate);
            // Student.minAge = parseInt(req.body.minAge);
            Student.save(function(err, updatedStudent) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};