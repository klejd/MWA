const ObjectId = require("mongodb").ObjectId;
var db = require("../data/db");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getallpublishers = (req, res) => {
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
        Game.findById(req.params.gameId).select("publisher").skip(offset).limit(maxCount).then(games).catch(err);

        function err(err) {
            if (err) {
                res.status(400).json(err);
            }
        }

        function games(games) {
            res.status(200).json(games);
        }

    }

}










module.exports.getapublishergame = (req, res) => {

    let gameId = req.params.gameId
    Game.findById(gameId).select("publisher").then(pub).catch(err);
    response = {
        status: 200,
        message: pub
    }

    function err(err) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
    }

    function pub(pub) {
        if (!pub) {
            response.status = 404;
            response.message = { "message": "game id not found" };
        } else {
            const publish = pub.publisher.id(req.params.publisherid)
            res.status(response.status).json(publish);
        }
    }
}

module.exports.gamesDeleteOne = function(req, res) {

    Game.findById(req.params.gameId).select("publisher").then(game).catch(err);
    let response = {
        status: 200,
        message: game
    }

    function err(err) {
        if (err) {
            response.status = 500;
            return;
        }
    }

    function game(game) {
        game.publisher.id(req.params.publisherid).remove();



        if (!game) {
            response.status = 400;
            return;
        }
        game.save().then(rev).catch(err2);

        function err2() {

            if (err) {
                response.status = 500;
                return;
            }
        }

        function rev(rev) {
            console.log("successfully deleted", rev);
            res.status(204).json(rev);
        }
    }
}

module.exports.addonepublisher = function(req, res) {



    Game.findById(req.params.gameId).then(pub).catch(err);
    const response = {
        status: 201,
        message: pub,
    };

    function err(err) {
        if (err) {
            response(500, err);
            return;
        }
    }

    function pub() {
        if (!pub) {
            response(400, "Game id not found");
            return;
        }
        //all the data that come from body
        pub.publisher = pub.publisher || [];
        pub.publisher = req.body;


        pub.save().then(updatePublisher).catch(err2);

        function err2(err2) {
            if (err2) {
                response(500, err2);
                return;
            }
        }

        function updatePublisher(updatePublisher) {
            console.log("successfully added", updatePublisher);
            res.status(204).json(updatePublisher);
        }
    }
}

module.exports.updateput = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").then(game).catch(err);
    const response = {
        status: 204,
        message: game
    };

    function err(err) {
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
    }

    function game(game) {
        if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
            return;
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            game.publisher = req.body;

            // game.price = parseFloat(req.body.price);
            // game.designer = req.body.designer;
            // game.minPlayers = parseInt(req.body.minPlayers);
            // game.maxPlayers = parseInt(req.body.maxPlayers);
            // game.rate = parseFloat(req.body.rate);
            // game.minAge = parseInt(req.body.minAge);
            game.save().then(updatedGame).catch(err);

            function err(err) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            }

            function updatedGame(updatedGame) {
                res.status(response.status).json(updatedGame);
            }
        }
    }
};


module.exports.updatepatch = (req, res) => {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").then(game).catch(err);
    const response = {
        status: 204,
        message: game
    };

    function err(err) {
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
    }

    function game(game) {
        if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
            return;
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            if (req.body.name) {
                game.publisher.name = req.body.name;
            }
            if (req.body.country) {
                game.publisher.country = req.body.country;
            }
            // game.price = parseFloat(req.body.price);
            // game.designer = req.body.designer;
            // game.minPlayers = parseInt(req.body.minPlayers);
            // game.maxPlayers = parseInt(req.body.maxPlayers);
            // game.rate = parseFloat(req.body.rate);
            // game.minAge = parseInt(req.body.minAge);
            game.save().then(updatedGame).catch(err);

            function err() {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
            }

            function updatedGame(updatedGame) {
                res.status(response.status).json(updatedGame);
            }
        }
    }
};