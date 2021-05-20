var database = require("../data/dbconnection").open;

module.exports.show = (req, res) => {
    let size = 3;
    if (req.query && req.query.size) {
        size = parseInt(req.query.size);
        size > 7 ? size = 7 : size;
    }
    const collection = database.get().collection("games");
    collection.find().limit(size).toArray((err, docs) => {
        res.status(200).json(docs);
    });
}