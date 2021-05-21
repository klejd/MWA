var db = require("../data/db");
const mongoose = require("mongoose");
const game = mongoose.model("Game");
module.exports.display1 = (req, res) => {
    let gameid = req.params.gameid;;
    game.findById(gameid).exec((err, games) => {

        res.status(200).json(games);
    });


}
module.exports.displayall = (req, res) => {

    game.find().exec((err, games) => {
        res.status(200).json(games);
    });
};