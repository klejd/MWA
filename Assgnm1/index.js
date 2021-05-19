const express = require("express");
const app = express();
app.set("port", 5000);
const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log("app is running in " +
        port);
})
app.get("/", (res, req) => {
    req.send("first asgnm");
})