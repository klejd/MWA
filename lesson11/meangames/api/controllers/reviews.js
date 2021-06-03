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
module.exports.getbyid = (req, res) => {

    let gameId = req.params.gameId
    Game.findById(gameId).select("reviews").exec(function(err, rev) {
        response = {
            status: 200,
            message: rev
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!rev) {
            response.status = 404;
            response.message = { "message": "game id not found" };
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
        Game.findById(req.params.gameId).select("reviews").skip(offset).limit(maxCount).exec((err, games) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(games);
            }
        });
    }
}
module.exports.deleteonereview = function(req, res) {



    Game.findById(req.params.gameId).select("reviews").exec(function(err, game) {
        let response = {
            status: 200,
            message: game
        }
        game.reviews.id(req.params.reviewid).remove();

        if (err) {
            response.status = 500;
            return;
        }

        if (!game) {
            response.status = 400;
            return;
        }
        game.save(function(err, rev) {

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
    const gameId = req.params.gameId;


    Game.findById(gameId, function(err, game) {
        const reviewupdated = game.reviews.id(reviewid);
        if (!err) {
            if (!game) {
                res.status(404).send(' was not found');
            } else {
                reviewupdated.name = req.body.name;
                reviewupdated.review = req.body.review;
                reviewupdated.date = req.body.date;

                game.save(function(saveerr, savegame) {
                    if (!saveerr) {
                        res.status(200).send(savegame.reviews.id(reviewid));
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
    const gameId = req.params.gameId;


    Game.findById(gameId, function(err, game) {
        const reviewupdated = game.reviews.id(reviewid);
        if (!err) {
            if (!game) {
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

                game.save(function(saveerr, savegame) {
                    if (!saveerr) {
                        res.status(200).send(savegame.reviews.id(reviewid));
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