const express = require("express");
const path = require("path");
//const routes = require("./routes");
const app = express();
//set the port
app.set("port", 3000);
//to print the port that app is running in the console
const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log("app is running in " + port);
});
//next pass the control to the next function in the middleware stack.
app.use((req, res, next) => {

        console.log(req.method, req.url);
        next();
    })
    // to avoid writing public in url
app.use(express.static(path.join(__dirname, "Public")));
//redirect every request to the router
//app.use("/", routes);
app.get("/", (res, req) => {
    req.sendFile(path.join(__dirname, "index.html"));
});