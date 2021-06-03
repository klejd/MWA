const mongoose = require("mongoose");
const dbName = "dbasgnm3";
const dbURL = "mongodb://localhost:27017/" + dbName;
require("./games-model");
require("./user-model")
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