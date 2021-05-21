const mongoose = require("mongoose");


const gameschema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },

    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default ": 1
    },

    price: Number,
    minPlayer: {
        type: Number,
        min: 1,
        max: 10
    },

    maxPlayer: Number,
    minAge: Number,
    designers: String,
    publisher: String,

});
var gamemodel = mongoose.model("Game", gameschema, "games");
//gamemodel.save();