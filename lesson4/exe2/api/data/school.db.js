const mongoose = require("mongoose");
const addressschema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    country: String,
    state: String,
    city: String,
    street: String,
    zip: String
})

const schoolschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Gpa: {
        type: Number,
        required: true

    },
    address: [addressschema]
});
var gamemodel = mongoose.model("Student", schoolschema, "Student");
//gamemodel.save();