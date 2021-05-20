const MongoClient = require("mongodb").MongoClient;
const dbName = "dbasgnm3";
const dburl = "mongodb://localhost:27017/" + dbName;
var connection = null;
var open = function() {
    MongoClient.connect(dburl, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            console.log("DB connection failed");
            return;
        }
        connection = client.db(dbName);
        console.log(connection);
        console.log("DB connection open ")
    });
}
var get = function() {
    return connection;
};
module.exports = {
    open: open,
    get: get
};