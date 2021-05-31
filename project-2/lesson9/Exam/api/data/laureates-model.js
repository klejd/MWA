const mongoose = require("mongoose");


const nobelSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    year: String,
    gender: String,

    category: {
        type: String,

    },
    affiliation: {
        type: String,
        required: false
    },
    bornCountry: {
        type: String,

        required: false
    }
});
mongoose.model("Laureates", nobelSchema, "laureates");