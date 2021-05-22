const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.addonepublisher = function(req, res) {



    Game.findById(req.params.gameId).exec(function(err, pub) {
        const response = {
            status: 201,
            message: pub,
        };
        if (err) {
            response(500, err);
            return;
        }

        if (!pub) {
            response(400, "Game id not found");
            return;
        }
        //all the data that come from body
        pub.publisher = req.body;


        pub.save(function(err, updatePublisher) {

            if (err) {
                response(500, err);
                return;
            }
            console.log("successfully added", updatePublisher);
            res.status(204).json(updatePublisher);
        });

    });
}