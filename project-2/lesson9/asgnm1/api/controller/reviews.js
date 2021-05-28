const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.addreviews = function(req, res) {



    Job.findById(req.params.jobId).exec(function(err, rev) {
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
        rev.reviews = rev.reviews || [];
        // rev.reviews = undefined;

        rev.reviews.push(req.body);


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

    let jobId = req.params.jobId
    Job.findById(jobId).select("reviews").exec(function(err, rev) {
        response = {
            status: 200,
            message: rev
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!rev) {
            response.status = 404;
            response.message = { "message": "Job id not found" };
        } else {
            const abc = rev.reviews.id(req.params.reviewid)
            res.status(response.status).json(abc);
        }
    });
}

module.exports.getallreviews = (req, res) => {
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
        Job.findById(req.params.jobId).select("reviews").skip(offset).limit(maxCount).exec((err, jobs) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(jobs);
            }
        });
    }
}
module.exports.deleteonereview = function(req, res) {



    Job.findById(req.params.jobId).select("reviews").exec(function(err, jobs) {
        let response = {
            status: 200,
            message: jobs
        }
        jobs.reviews.id(req.params.reviewid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!jobs) {
            response.status = 400;
            return;
        }
        jobs.save(function(err, rev) {

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
    const reviewid = req.params.reviewid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, jobs) {
        const reviewupdated = jobs.reviews.id(reviewid);
        if (!err) {
            if (!jobs) {
                res.status(404).send(' was not found');
            } else {
                reviewupdated.name = req.body.name;
                reviewupdated.review = req.body.review;
                reviewupdated.date = req.body.date;

                Job.save(function(saveerr, saveJob) {
                    if (!saveerr) {
                        res.status(200).send(saveJob.reviews.id(reviewid));
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
    const reviewid = req.params.reviewid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, jobs) {
        const reviewupdated = jobs.reviews.id(reviewid);
        if (!err) {
            if (!jobs) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.name) {
                    reviewupdated.name = req.body.name;
                }
                if (req.body.review) {
                    reviewupdated.review = req.body.review;
                }
                if (req.body.date) {
                    reviewupdated.date = req.body.date;
                }

                jobs.save(function(saveerr, saveJob) {
                    if (!saveerr) {
                        res.status(200).send(saveJob.reviews.id(reviewid));
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