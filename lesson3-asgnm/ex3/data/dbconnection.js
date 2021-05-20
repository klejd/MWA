const MongoClient = require("mongodb").MongoClient;
const dbName = "dbasgnm3";
_connection = null;
const dburl = "mongodb://localhost:27017/" + dbName;
const open = function() {
    MongoClient.connect(dburl, { useUnifiedTopology: true }, function(err, client) {
        if (err) {
            console.log("failed", err);
            return;
        }
        _connection = client.db(dbName);
        console.log("connection open");
    });
    const get = function() {
        return _connection;

    }
    module.exports = {
            open: open,
            get: get
        }
        //localhost: 27017
}