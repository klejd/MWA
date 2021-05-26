const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Doctors = mongoose.model("Doctors");

module.exports.addoneaddress = function(req, res) {



    Doctors.findById(req.params.doctorId).exec(function(err, addre) {
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
        Doctors.findById(req.params.doctorId).select("address").skip(offset).limit(maxCount).exec((err, Doctorss) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(Doctorss);
            }
        });
    }
}

//------------------------------------------------------------------
module.exports.getoneaddress = (req, res) => {

    let doctorId = req.params.doctorId
    Doctors.findById(doctorId).select("address").exec(function(err, Doctorss) {
        response = {
            status: 200,
            message: Doctorss
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!Doctorss) {
            response.status = 404;
            response.message = { "message": "Doctors id not found" };
        } else {
            const publish = Doctorss.address.id(req.params.addressid)
            res.status(response.status).json(publish);
        }
    });
}
module.exports.deleteoneaddress = function(req, res) {



    Doctors.findById(req.params.doctorId).select("address").exec(function(err, Doctorss) {
        let response = {
            status: 200,
            message: Doctorss
        }
        Doctorss.address.id(req.params.addressid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!Doctorss) {
            response.status = 400;
            return;
        }
        Doctorss.save(function(err, rev) {

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
    const doctorId = req.params.doctorId;


    Doctors.findById(doctorId, function(err, Doctorss) {
        const addressupdated = Doctorss.address.id(addressid);
        if (!err) {
            if (!Doctorss) {
                res.status(404).send(' was not found');
            } else {
                addressupdated.country = req.body.country;
                addressupdated.city = req.body.city;
                addressupdated.zip = req.body.zip;

                Doctorss.save(function(saveerr, saveDoctors) {
                    if (!saveerr) {
                        res.status(200).send(saveDoctors.address.id(addressid));
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
    const doctorId = req.params.doctorId;


    Doctors.findById(doctorId, function(err, Doctorss) {
        const addressupdated = Doctorss.address.id(addressid);
        if (!err) {
            if (!Doctorss) {
                res.status(404).send(' was not found');
            } else {
                if (req.body.country) {
                    addressupdated.country = req.body.country;
                }

                if (req.body.city) {
                    addressupdated.city = req.body.city;
                }

                if (req.body.zip) {
                    addressupdated.zip = req.body.zip;
                }


                Doctorss.save(function(saveerr, saveDoctors) {
                    if (!saveerr) {
                        res.status(200).send(saveDoctors.address.id(addressid));
                    } else {
                        res.status(400).send(saveerr.message);
                    }
                });
            }
        } else {
            res.status(400).send(err.message);
        }
    });
}