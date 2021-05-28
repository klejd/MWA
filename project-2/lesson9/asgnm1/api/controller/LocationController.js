const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.addlocations = function(req, res) {



    Job.findById(req.params.jobId).exec(function(err, locations) {
        const response = {
            status: 200,
            message: locations,
        };
        if (err) {
            response(500, err);
            return;
        }

        if (!locations) {
            response.status = 400;
            response.message = "fsdaa";
            return;
        }


        // locations.city = req.body.city;
        // locations.country = req.body.country;
        //all the data that come from body
        //locations.location = locations.location || null;
        // // rev.reviews = undefined;

        locations.location = req.body;


        // rev.reviews.push({
        //     review: req.body.review,
        //     name: req.body.name,
        //     date: req.body.date
        // });


        locations.save(function(err, updatesloc) {

            if (err) {
                response.status = 500;
                response.err = err;
                return;
            }
            //updatereview.reviews = req.body;
            console.log("successfully added", updatesloc);
            res.status(204).json(updatesloc);
        });

    });
}
module.exports.getbyid = (req, res) => {

    let jobId = req.params.jobId
    Job.findById(jobId).select("location").exec(function(err, locations) {
        response = {
            status: 200,
            message: locations
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!locations) {
            response.status = 404;
            response.message = { "message": "Job id not found" };
        } else {
            const abc = locations.location.id(req.params.locationid)
            res.status(response.status).json(abc);
        }
    });
}

module.exports.getalllocations = (req, res) => {
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
        Job.findById(req.params.jobId).select("location").skip(offset).limit(maxCount).exec((err, locations) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(locations);
            }
        });
    }
}
module.exports.deleteonelocation = function(req, res) {



    Job.findById(req.params.jobId).select("location").exec(function(err, locations) {
        let response = {
            status: 200,
            message: locations
        }
        locations.location.id(req.params.locationid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!locations) {
            response.status = 400;
            return;
        }
        locations.save(function(err, locations) {

            if (err) {
                response.status = 500;
                return;
            }
            console.log("successfully deleted", locations);
            res.status(204).json(locations);
        });
    });
}



module.exports.updatedput = function(req, res) {
    const locationid = req.params.locationid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, locations) {
        const locationupdated = locations.location.id(locationid);
        if (!err) {
            if (!locations) {
                res.status(404).send(' was not found');
            } else {
                locationupdated.city = req.body.city;
                locationupdated.country = req.body.country;


                locations.save(function(saveerr, savesloc) {
                    if (!saveerr) {
                        res.status(200).send(savesloc.location.id(locationid));
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
    const locationid = req.params.locationid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, locations) {
        const locationupdated = locations.location.id(locationid);
        if (!err) {
            if (!locations) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.city) {
                    locationupdated.city = req.body.city;

                }
                if (req.body.country) {
                    locationupdated.country = req.body.country;

                }
                locations.save(function(saveerr, savesloc) {
                    if (!saveerr) {
                        res.status(200).send(savesloc.location.id(locationid));
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