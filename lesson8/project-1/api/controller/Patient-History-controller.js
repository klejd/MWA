const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Patients = mongoose.model("Patients");

module.exports.addhistory = function(req, res) {



    Patients.findById(req.params.patientId).exec(function(err, rev) {
        const response = {
            status: 200,
            message: rev,
        };
        if (err) {
            response(500, err);
            return;
        }

        if (!rev) {
            response.status = 400;
            response.message = "fsdaa";
            return;
        }
        //all the data that come from body
        rev.history = rev.history || [];
        // rev.reviews = undefined;

        rev.history.push(req.body);


        // rev.reviews.push({
        //     review: req.body.review,
        //     name: req.body.name,
        //     date: req.body.date
        // });


        rev.save(function(err, updatereview) {

            if (err) {
                response.status = 500;
                response.err = err;
                return;
            }
            //updatereview.reviews = req.body;
            console.log("successfully added", updatereview);
            res.status(204).json(updatereview);
        });

    });
}
module.exports.getbyid = (req, res) => {

    let patientId = req.params.patientId
    Patients.findById(patientId).select("history").exec(function(err, Patientss) {
        response = {
            status: 200,
            message: Patientss
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Patientss) {
            response.status = 404;
            response.message = { "message": "Patients id not found" };
        } else {
            const publish = Patientss.history.id(req.params.historyId)
            res.status(response.status).json(publish);
        }
    });
}

module.exports.getallhistories = (req, res) => {
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
        Patients.findById(req.params.patientId).select("history").skip(offset).limit(maxCount).exec((err, Patients) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(Patients);
            }
        });
    }
}
module.exports.deleteonehistory = function(req, res) {



    Patients.findById(req.params.patientId).select("history").exec(function(err, Patients) {
        let response = {
            status: 200,
            message: Patients
        }
        Patients.history.id(req.params.historyId).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!Patients) {
            response.status = 400;
            return;
        }
        Patients.save(function(err, rev) {

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
    const historyId = req.params.historyId;
    const patientID = req.params.patientId;


    Patients.findById(patientID, function(err, Patients) {
        const reviewupdated = Patients.history.id(historyId);
        if (!err) {
            if (!Patients) {
                res.status(404).send(' was not found');
            } else {
                reviewupdated.title = req.body.title;
                reviewupdated.description = req.body.description;
                reviewupdated.date = req.body.date;

                Patients.save(function(saveerr, savePatients) {
                    if (!saveerr) {
                        res.status(200).send(savePatients.history.id(historyId));
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
    const historyId = req.params.historyId;
    const patientID = req.params.patientId;


    Patients.findById(patientID, function(err, Patients) {
        const reviewupdated = Patients.history.id(historyId);
        if (!err) {
            if (!Patients) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.title) {
                    reviewupdated.title = req.body.title;
                }
                if (req.body.description) {
                    reviewupdated.description = req.body.description;
                }
                if (req.body.date) {
                    reviewupdated.date = req.body.date;
                }

                Patients.save(function(saveerr, savePatients) {
                    if (!saveerr) {
                        res.status(200).send(savePatients.history.id(historyId));
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