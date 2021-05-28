const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.addskills = function(req, res) {



    Job.findById(req.params.jobId).exec(function(err, skill) {
        const response = {
            status: 200,
            message: skill,
        };
        if (err) {
            response(500, err);
            return;
        }

        if (!skill) {
            response.status = 400;
            response.message = "fsdaa";
            return;
        }
        //all the data that come from body
        skill.skills = skill.skills || [];
        // rev.reviews = undefined;

        skill.skills.push(req.body);


        // rev.reviews.push({
        //     review: req.body.review,
        //     name: req.body.name,
        //     date: req.body.date
        // });


        skill.save(function(err, updateskill) {

            if (err) {
                response.status = 500;
                response.err = err;
                return;
            }
            //updatereview.reviews = req.body;
            console.log("successfully added", updateskill);
            res.status(204).json(updateskill);
        });

    });
}
module.exports.getbyid = (req, res) => {

    let jobId = req.params.jobId
    Job.findById(jobId).select("skills").exec(function(err, skill) {
        response = {
            status: 200,
            message: skill
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!skill) {
            response.status = 404;
            response.message = { "message": "Job id not found" };
        } else {
            const abc = skill.skills.id(req.params.skillid)
            res.status(response.status).json(abc);
        }
    });
}

module.exports.getallskills = (req, res) => {
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
        Job.findById(req.params.jobId).select("skills").skip(offset).limit(maxCount).exec((err, jobs) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(jobs);
            }
        });
    }
}
module.exports.deleteoneskill = function(req, res) {



    Job.findById(req.params.jobId).select("skills").exec(function(err, jobs) {
        let response = {
            status: 200,
            message: jobs
        }
        jobs.skills.id(req.params.skillid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!jobs) {
            response.status = 400;
            return;
        }
        jobs.save(function(err, skill) {

            if (err) {
                response.status = 500;
                return;
            }
            console.log("successfully deleted", skill);
            res.status(204).json(skill);
        });
    });
}



module.exports.updatedput = function(req, res) {
    const skillid = req.params.skillid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, jobs) {
        const skillupdated = jobs.skills.id(skillid);
        if (!err) {
            if (!jobs) {
                res.status(404).send(' was not found');
            } else {
                skillupdated.desc = req.body.desc;


                jobs.save(function(saveerr, saveskill) {
                    if (!saveerr) {
                        res.status(200).send(saveskill.skills.id(skillid));
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
    const skillid = req.params.skillid;
    const jobId = req.params.jobId;


    Job.findById(jobId, function(err, jobs) {
        const skillupdated = jobs.skills.id(skillid);
        if (!err) {
            if (!jobs) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.desc) {
                    skillupdated.desc = req.body.desc;

                }
                jobs.save(function(saveerr, saveskill) {
                    if (!saveerr) {
                        res.status(200).send(saveskill.skills.id(skillid));
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