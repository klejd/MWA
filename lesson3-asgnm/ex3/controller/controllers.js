var db = require("../api/data/index");
module.exports.display = (req, res) => {
    var size = 3;
    var offset = 0
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.size)
        size = parseInt(req.query.size);
    size = (size > 7) ? size = 7 : size; //we gotta take care for both cases 

    var collection = db.get().collection("games");
    collection.find().skip(offset).limit(size).toArray((err, docs) => { //if we have a big database this line here will block our app because we are getting all the data and then we are showing them to the user.to fix this issue we need an offset
        res.status(200).json(docs);
    });
}