const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Nobel = mongoose.model("Laureates");
module.exports.display1 = (req, res) => {
        let nobelId = req.params.nobelId;
        Nobel.findById(nobelId).exec((err, nobels) => {
            const response = {
                status: 200,
                message: nobels
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!nobels) {
                response.message = { "message": "couldn't find it" };
            } else {
                res.status(200).json(nobels);
            }
        });


    }
    // module.exports.getOneFidgetByName = function(req, res) {
    //     const bornCountry = req.params.bornCountry;
    //     Nobel.find({ "bornCountry": bornCountry }).exec(function(err, nobel) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         res.status(200).json(nobel);
    //     });
    // }
module.exports.displaycountry = (req, res) => {
    let bornCountry = req.params.bornCountry;

    console.log(bornCountry);

    Nobel.find({
        bornCountry: bornCountry
    }).exec((err, nobels) => {
        const response = {
            status: 200,
            message: nobels
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!nobels) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json({
                nobels: nobels
            });
        }
    });


}


module.exports.displayall = (req, res) => {
    let offset = req.params.offset;
    let count = req.params.count;
    // return count;
    let maxCount = 0;
    // blocking funcnt
    Nobel.count({}, (error, result) => {
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
            Nobel.find().skip(offset).limit(count).exec((err, nobels) => {

                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({
                        nobels,
                        maxCount
                    });
                }
            });
        }
    });
}


module.exports.addone = (req, res) => {

    console.log("request " + req.body.firstname);

    if (req.body && req.body.firstname && req.body.year) {
        const response = {
            status: 200,
            message: Nobel
        }
        Nobel.create({
                firstname: req.body.firstname,
                year: req.body.year,
                gender: req.body.gender,
                category: req.body.category,
                bornCountry: req.body.bornCountry

            },
            (err, nobels) => {
                if (err) {
                    console.log(err);
                    res.status(response.status = 400).json(err);
                } else {
                    console.log("Nobel created", response.message);
                    res.status(response.status = 200).json(response.message);
                }
            });

        console.log("After request")

    }
}

module.exports.NobelDeleteOne = function(req, res) {
    const nobelId = req.params.nobelId;
    console.log("DELETE nobelId ", nobelId);
    Nobel.findByIdAndRemove(nobelId).exec(function(err, deletedNobel) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding Nobel");
            response.status = 500;
            response.message = err;
        } else if (!deletedNobel) {
            response.status = 404;
            response.message = { "message": "Nobel ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const nobelId = req.params.nobelId;
    Nobel.findById(nobelId).select("-reviews -publisher").exec((err, nobels) => {
        const response = {
            status: 204,
            message: nobels
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!nobels) {
            response.status = 404;
            response.message = { "message": "Nobel id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {

            if (req.body.firstname) {
                nobels.firstname = req.body.firstname
            }
            if (req.body.year) {
                nobels.year = req.body.year
            }
            if (req.body.gender) {
                nobels.gender = req.body.gender
            }
            if (req.body.category) {
                nobels.category = req.body.category
            }
            if (req.body.bornCountry) {
                nobels.bornCountry = req.body.bornCountry
            }
            nobels.save((err, nobels) => {
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
    const nobelId = req.params.nobelId;
    Nobel.findById(nobelId).exec(function(err, nobels) {
        const response = {
            status: 204,
            message: Nobel
        };
        if (err) {
            console.log("Error finding Nobel");
            response.status = 500;
            response.message = err;
        } else if (!nobels) {
            response.status = 404;
            response.message = { "message": "Nobel ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {

            nobels.firstname = req.body.firstname,
                nobels.year = req.body.year,
                nobels.category = req.body.category,
                nobels.bornCountry = req.body.bornCountry
            nobels.gender = req.body.gender
            nobels.save(function(err, updatenobel) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};