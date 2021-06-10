const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");
module.exports.display1 = (req, res) => {
    let gameId = req.params.gameId;
    Game.findById(gameId).exec((err, games) => {
        const response = {
            status: 200,
            message: games
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!games) {
            response.message = { "message": "couldn't find it" };
        } else {
            res.status(200).json(games);
        }
    });


}


module.exports.displayall = (req, res) => {
    let offset = 0;
    let count = 5;
    const maxCount = 15;

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
        Game.find().skip(offset).limit(maxCount).exec((err, games) => {

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(games);
            }
        });
    }
}


module.exports.addone = (req, res) => {

    console.log("request " + req.body.title);

    if (req.body && req.body.title && req.body.price && req.body.rate) {
        const response = {
            status: 201,
            message: Game
        }
        Game.create({
                title: req.body.title,
                year: parseInt(req.body.year),
                rate: req.body.rate,
                price: parseFloat(req.body.price),
                minPlayers: req.body.minPlayers,
                maxPlayers: req.body.maxPlayers,
                minAge: parseInt(req.body.minAge),
                designers: req.body.designers
            },
            (err, game) => {
                if (err) {
                    console.log(err);
                    res.status(response.status = 400).json(err);
                } else {
                    console.log("game created", response.message);
                    res.status(response.status = 200).json(response.message);
                }
            });

        console.log("After request")

    }
}

module.exports.gamesDeleteOne = function(req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
//updatepatch
module.exports.updatepatch = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec((err, game) => {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game id not found in db" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {


            if (req.body.title) {
                game.title = req.body.title;
            }
            if (req.body.price) {
                game.price = req.body.price;
            }
            if (req.body.rate) {
                game.rate = req.body.rate;
            }
            game.save((err, games) => {
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
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            // game.designer = req.body.designer;
            // game.minPlayers = parseInt(req.body.minPlayers);
            // game.maxPlayers = parseInt(req.body.maxPlayers);
            // game.rate = parseFloat(req.body.rate);
            // game.minAge = parseInt(req.body.minAge);
            game.save(function(err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};