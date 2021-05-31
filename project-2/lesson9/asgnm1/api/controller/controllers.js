const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");
module.exports.display1 = (req, res) => {
    let jobId = req.params.jobId;
    Job.findById(jobId).exec((err, jobs) => {
        const response = {
            status: 200,
            message: jobs
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!jobs) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json(jobs);
        }
    });


}

// todo klejdi
// module.exports.pagination = (req, res) => {
//     const pag = parseInt(req.query.page);
//     const limit = parseInt(rq.query.limit);
//     const start = (page - 1) * limit;
//     const stop = page * limit;
//     const result = job +
// }
// module.exports.search = (req, res) => {
//     const {
//         search
//     } = req.query;
//     Job.find({}, (err, searchData)) {
//         if (err) {
//             console.log(err);
//         } else {
//             //res.render(view [, locals] [, callback])

//         }
//     }

// }
module.exports.displayall = (req, res) => {
    let offset = req.params.offset;
    let count = req.params.count;
    // return count;
    let maxCount = 0;
    // blocking funcnt
    Job.count({}, (error, result) => {
        maxCount = result


        console.log(maxCount);

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
            Job.find().skip(offset).limit(count).exec((err, jobs) => {

                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({
                        jobs,
                        maxCount
                    });
                }
            });
        }
    });
}


module.exports.addone = (req, res) => {

    console.log("request " + req.body.title);

    if (req.body && req.body.title) {
        const response = {
            status: 200,
            message: Job
        }
        Job.create({
                title: req.body.title,
                salary: parseFloat(req.body.salary),
                description: req.body.description,
                experience: req.body.experience,
                skills: req.body.skills,
                PostDate: req.body.PostDate
            },
            (err, jobs) => {
                if (err) {
                    console.log(err);
                    res.status(response.status = 400).json(err);
                } else {
                    console.log("job created", response.message);
                    res.status(response.status = 200).json(response.message);
                }
            });

        console.log("After request")

    }
}

module.exports.jobsDeleteOne = function(req, res) {
    const jobId = req.params.jobId;
    console.log("DELETE jobId ", jobId);
    Job.findByIdAndRemove(jobId).exec(function(err, deletedJob) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding Job");
            response.status = 500;
            response.message = err;
        } else if (!deletedJob) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("-reviews -publisher").exec((err, jobs) => {
        const response = {
            status: 204,
            message: jobs
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!jobs) {
            response.status = 404;
            response.message = { "message": "Job id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {

            if (req.body.title) {
                jobs.title = req.body.title
            }
            if (req.body.salary) {
                jobs.salary = parseFloat(req.body.salary)
            }
            if (req.body.description) {
                jobs.description = req.body.description
            }
            if (req.body.experience) {
                jobs.experience = req.body.experience
            }
            if (req.body.skills) {
                jobs.skills = req.body.skills
            }
            if (req.body.PostDate) {
                jobs.PostDate = req.body.PostDate
            }
            jobs.save((err, jobs) => {
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
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, jobs) {
        const response = {
            status: 204,
            message: Job
        };
        if (err) {
            console.log("Error finding Job");
            response.status = 500;
            response.message = err;
        } else if (!jobs) {
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {

            jobs.title = req.body.title,
                jobs.salary = parseFloat(req.body.salary),
                jobs.description = req.body.description,
                jobs.experience = req.body.experience,
                // jobs.skills = req.body.skills,
                jobs.PostDate = req.body.PostDate
            jobs.save(function(err, updatejob) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};