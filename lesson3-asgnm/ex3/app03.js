require("./data/dbconnection").open;
const router = require("./route/index.js");
const express = require("express");
const app = express();
app.set("port", 3000);

const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log("app is running in " +
        port);
});
// collection.find().skip(offset).limit(count);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use("/", router);