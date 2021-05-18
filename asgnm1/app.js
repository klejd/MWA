var otherpocess = require("child_process");
console.log("starting ..");
var process = otherpocess.spawn("node", ["index.js"], {
    stdio: "inherit"
});
console.log(process);
console.log("finishing");