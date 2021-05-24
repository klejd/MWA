const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    zip: String
});
//Doctorsmodel.save();
const reviewSchema = new mongoose.Schema({
    name: String,
    reviews: String,
    date: String
})
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    address: {
        type: [addressSchema],
        required: false
    },
    reviews: {
        type: [reviewSchema],
        required: false
    }
});

mongoose.model("Doctors", doctorSchema, "Doctors");