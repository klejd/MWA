const mongoose = require("mongoose");
const addressschema = new mongoose.Schema({

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
var Studentmodel = mongoose.model("Student", schoolschema, "Student");
//Studentmodel.save();