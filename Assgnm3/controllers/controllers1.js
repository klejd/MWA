module.exports.sum = (req, res) => {
    var sum1 = parseInt(req.params.num1) + parseInt(req.query.num2);
    res.send("the sum is " + sum1);
}