const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.addreviews = function(req, res) {



    Game.findById(req.params.gameId).exec(function(err, rev) {
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