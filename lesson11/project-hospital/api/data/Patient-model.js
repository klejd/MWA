const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    zip: String
});
//Doctorsmodel.save();
const historySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String
})
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    diseases: {
        type: String,
        required: true
    },
    address: {
        type: [addressSchema],
        required: false
    },
    history: {
        type: [historySchema],
        required: false
    }
});

mongoose.model("Patients", doctorSchema, "Patients");