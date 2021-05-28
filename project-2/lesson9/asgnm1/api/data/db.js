const mongoose = require("mongoose");
const dbName = "JobSearching";
const dbURL = "mongodb://localhost:27017/" + dbName;
require("./jobs-model");

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
process.on("SIGTERM", function() {
    mongoose.connection.close(() => {
        console.log("mongoose disconnected by app termination");
        process.exit(0);
    });
});
process.once("SIGUSR2", function() {
    mongoose.connection.close(() => {
        console.log("mongoose disconnected by app restarted");
        process.kill(process.pid, "SIGUSR2");
    });
});
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to " + dbURL);
});
mongoose.connection.on("disconnected", (error) => {
    console.log("error :" + error);
});