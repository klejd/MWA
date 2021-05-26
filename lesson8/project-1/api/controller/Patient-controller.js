const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Patients = mongoose.model("Patients");
module.exports.display1 = (req, res) => {
    let patientId = req.params.patientId;
    Patients.findById(patientId).exec((err, Patientss) => {
        const response = {
            status: 200,
            message: Patientss
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Patientss) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json(Patientss);
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
        Patients.find().skip(offset).limit(maxCount).exec((err, Patientss) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(Patientss);
            }
        });
    }
}


//ask => addone in database
module.exports.addone = (req, res) => {


        if (req.body && req.body.name && req.body.diseases) {
            const response = {
                status: 200,
                message: Patients
            }
            Patients.create({
                    name: req.body.name,
                    diseases: req.body.diseases,
                    // rate: req.body.rate
                    //price: parseFloat(req.body.price),
                    // minPlayer: req.body.minPlayer,
                    // maxPlayer: req.body.maxPlayer,
                    // minAge: parseInt(req.body.minAge)


                },
                (err, Patients) => {
                    if (err) {
                        console.log(err);
                        res.status(response.status = 400).json(err);
                    } else {
                        console.log("Patients created", response.message);
                        res.status(response.status = 200).json(response.message);
                    }
                });

            console.log("After request")

        }
    }
    // task2 => update(replace) using put
    // module.exports.updateput = function(req, res) {
    //     const patientId = req.params.patientId;
    //     Patients.findById(patientId).exec(function(err, Patients) {
    //         const response = {
    //                 status: 204,
    //                 message: Patients
    //             }
    //             // console.log("The exec result is"+Patients);
    //         if (err) { //error check
    //             console.log("Error finding Patients");
    //             response.status = 500;
    //             response.message = err;
    //         } else if (!Patients) { //result check
    //             response.status = 404;
    //             response.message = { "message": "Patients ID not found" };
    //         }
    //         if (response.status !== 204) {
    //             res.status(response.status).json(response.message);
    //         } else {
    //             //update the Patients
    //             // res.status(response.status).json(response.message);
    //             Patients.title = req.body.title;
    //             // Patients.year = req.body.year;
    //             Patients.price = parseFloat(req.body.price);
    //             // Patientss.minPlayers = req.body.minPlayers;
    //             // Patientss.maxPlayers = req.body.maxPlayers;
    //             Patients.rate = parseInt(req.body.rate);
    //             // Patientss.minAge = req.body.minAge;
    //             Patients.save(function(err, updatedPatients) {
    //                 if (err) {
    //                     response.status = 500;
    //                     response.message = err;
    //                 } else {
    //                     response.message = { "message": "Patients updated:" };
    //                 }
    //                 res.status(response.status).json(response.message);
    //             });
    //         }

//     });
// }
//project => restful apis



module.exports.deleteonepatient = function(req, res) {
    const patientId = req.params.patientId;
    console.log("DELETE patientId ", patientId);
    Patients.findByIdAndRemove(patientId).exec(function(err, deletedPatients) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding Patients");
            response.status = 500;
            response.message = err;
        } else if (!deletedPatients) {
            response.status = 404;
            response.message = { "message": "Patients ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const patientId = req.params.patientId;
    Patients.findById(patientId).select("-reviews -publisher").exec((err, Patients) => {
        const response = {
            status: 204,
            message: Patients
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Patients) {
            response.status = 404;
            response.message = { "message": "Patients id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {


            if (req.body.name) {
                Patients.name = req.body.name;
            }
            if (req.body.diseases) {
                Patients.diseases = req.body.diseases;
            }

            Patients.save((err, Patientss) => {
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
    const patientId = req.params.patientId;
    Patients.findById(patientId).select("-reviews -publisher").exec(function(err, Patients) {
        const response = {
            status: 204,
            message: Patients
        };
        if (err) {
            console.log("Error finding Patients");
            response.status = 500;
            response.message = err;
        } else if (!Patients) {
            response.status = 404;
            response.message = { "message": "Patients ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            Patients.name = req.body.name;
            Patients.diseases = req.body.diseases;
            // Patients.price = parseFloat(req.body.price);
            // Patients.designer = req.body.designer;
            // Patients.minPlayers = parseInt(req.body.minPlayers);
            // Patients.maxPlayers = parseInt(req.body.maxPlayers);
            // Patients.rate = parseFloat(req.body.rate);
            // Patients.minAge = parseInt(req.body.minAge);
            Patients.save(function(err, updatedPatients) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};