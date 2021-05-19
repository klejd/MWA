const express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/index.js");
const path = require("path");
const app = express();
app.set("port", 5000);
const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log("app is running in " +
        port);
});
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use("/", routes);