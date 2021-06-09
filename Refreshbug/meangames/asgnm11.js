require("./api/data/db");
const express = require("express");
const app = express();
const path = require("path");

const routes = require("./api/routes");

app.set("port", 3000);

app.use(function(req, res, next) { //This will log for every thing
    console.log(req.method, req.url);
    next();
});

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(express.static(path.join(__dirname, "public"))); // This is termination point
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// app.use(express.urlencoded({extended:false}));
app.use(express.json()); //work for form

app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to the port" + port);
});