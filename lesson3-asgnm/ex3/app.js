//var db = require("./api/data/index").open();
const dbConnection = require("./api/data/index").open();
var express = require("express");
var app = express();
var router = require("./router/index");

app.set("port", 3000);
const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log("running on" + port);
});
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use("/", router);