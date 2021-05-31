const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    city: String,
    country: String
});
//jobmodel.save();
const skillsSchema = new mongoose.Schema({
    desc: String
})
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    date: String
})
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    salary: Number,

    experience: {
        type: String,

    },
    skills: {
        type: [skillsSchema],
        required: false
    },

    PostDate: Date,
    location: {
        type: [locationSchema],

        required: false
    },
    reviews: {
        type: [reviewSchema],
        required: false
    }
});

mongoose.model("Job", jobSchema, "jobs");