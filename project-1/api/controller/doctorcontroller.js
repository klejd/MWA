const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Doctors = mongoose.model("Doctors");
module.exports.display1 = (req, res) => {
    let doctorId = req.params.doctorId;
    Doctors.findById(doctorId).exec((err, Doctorss) => {
        const response = {
            status: 200,
            message: Doctorss
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Doctorss) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json(Doctorss);
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
        Doctors.find().skip(offset).limit(maxCount).exec((err, Doctorss) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(Doctorss);
            }
        });
    }
}


//ask => addone in database
module.exports.addone = (req, res) => {


        if (req.body && req.body.name && req.body.speciality) {
            const response = {
                status: 200,
                message: Doctors
            }
            Doctors.create({
                    name: req.body.name,
                    speciality: req.body.speciality,
                    // rate: req.body.rate
                    //price: parseFloat(req.body.price),
                    // minPlayer: req.body.minPlayer,
                    // maxPlayer: req.body.maxPlayer,
                    // minAge: parseInt(req.body.minAge)


                },
                (err, Doctors) => {
                    if (err) {
                        console.log(err);
                        res.status(response.status = 400).json(err);
                    } else {
                        console.log("Doctors created", response.message);
                        res.status(response.status = 200).json(response.message);
                    }
                });

            console.log("After request")

        }
    }
    // task2 => update(replace) using put
    // module.exports.updateput = function(req, res) {
    //     const doctorId = req.params.doctorId;
    //     Doctors.findById(doctorId).exec(function(err, Doctors) {
    //         const response = {
    //                 status: 204,
    //                 message: Doctors
    //             }
    //             // console.log("The exec result is"+Doctors);
    //         if (err) { //error check
    //             console.log("Error finding Doctors");
    //             response.status = 500;
    //             response.message = err;
    //         } else if (!Doctors) { //result check
    //             response.status = 404;
    //             response.message = { "message": "Doctors ID not found" };
    //         }
    //         if (response.status !== 204) {
    //             res.status(response.status).json(response.message);
    //         } else {
    //             //update the Doctors
    //             // res.status(response.status).json(response.message);
    //             Doctors.title = req.body.title;
    //             // Doctors.year = req.body.year;
    //             Doctors.price = parseFloat(req.body.price);
    //             // Doctorss.minPlayers = req.body.minPlayers;
    //             // Doctorss.maxPlayers = req.body.maxPlayers;
    //             Doctors.rate = parseInt(req.body.rate);
    //             // Doctorss.minAge = req.body.minAge;
    //             Doctors.save(function(err, updatedDoctors) {
    //                 if (err) {
    //                     response.status = 500;
    //                     response.message = err;
    //                 } else {
    //                     response.message = { "message": "Doctors updated:" };
    //                 }
    //                 res.status(response.status).json(response.message);
    //             });
    //         }

//     });
// }
//project => restful apis



module.exports.DoctorssDeleteOne = function(req, res) {
    const doctorId = req.params.doctorId;
    console.log("DELETE doctorId ", doctorId);
    Doctors.findByIdAndRemove(doctorId).exec(function(err, deletedDoctors) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding Doctors");
            response.status = 500;
            response.message = err;
        } else if (!deletedDoctors) {
            response.status = 404;
            response.message = { "message": "Doctors ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const doctorId = req.params.doctorId;
    Doctors.findById(doctorId).select("-reviews -publisher").exec((err, Doctors) => {
        const response = {
            status: 204,
            message: Doctors
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Doctors) {
            response.status = 404;
            response.message = { "message": "Doctors id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {


            if (req.body.name) {
                Doctors.name = req.body.name;
            }
            if (req.body.speciality) {
                Doctors.speciality = req.body.speciality;
            }

            Doctors.save((err, Doctorss) => {
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
    const doctorId = req.params.doctorId;
    Doctors.findById(doctorId).select("-reviews -publisher").exec(function(err, Doctors) {
        const response = {
            status: 204,
            message: Doctors
        };
        if (err) {
            console.log("Error finding Doctors");
            response.status = 500;
            response.message = err;
        } else if (!Doctors) {
            response.status = 404;
            response.message = { "message": "Doctors ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            Doctors.name = req.body.name;
            Doctors.speciality = req.body.speciality;
            // Doctors.price = parseFloat(req.body.price);
            // Doctors.designer = req.body.designer;
            // Doctors.minPlayers = parseInt(req.body.minPlayers);
            // Doctors.maxPlayers = parseInt(req.body.maxPlayers);
            // Doctors.rate = parseFloat(req.body.rate);
            // Doctors.minAge = parseInt(req.body.minAge);
            Doctors.save(function(err, updatedDoctors) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};