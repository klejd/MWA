require("./api/data/db");
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api/routes");

app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
// we are gonna use cdn
// app.use("node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "*");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('content-type', 'application/x-www-form-urlencoded')
    next();
})
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/api", routes);


const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to the port " + port);
});