const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
    name: String,
    country: String
});
//gamemodel.save();
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    date: String
})
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,

    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    minAge: Number,
    designers: String,
    publisher: {
        type: publisherSchema,
        required: false
    },
    reviews: {
        type: [reviewSchema],
        required: false
    }
});

mongoose.model("Game", gameSchema, "games");