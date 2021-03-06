const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
module.exports.usersRegister = function(req, res) {
    console.log("Register User");

    const newUser = {
        name: req.body.name || null,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    };
    User.create(newUser, function(err, user) {
        const response = {
            status: 201,
            message: user
        }
        if (err) {
            console.log(err);
            response.status = 400;
            response.message = err;
        } else {
            console.log("User created");
        }

        res.status(response.status).json(response.message);
    });

}

module.exports.usersAuthenticate = function(req, res) {
    console.log("Authenticate User");

    const authUser = {
        username: req.body.username
    };

    User.findOne(authUser).exec(function(err, user) {
        const response = {
            status: 200,
            message: user
        }
        if (err) {
            console.log(err);
            response.status = 400;
            response.message = err;
        } else {
            console.log("User Authenticated");

            if (!user) {
                console.log("User doesn't exist");
                response.status = 404;
                response.message = { "message": "User doesn't exist" };
            } else {


                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log("User Authenticated");

                    const token = jwt.sign({ id: user.id, name: user.name }, "cs572", { expiresIn: 3600 }); //token expires after hour
                    // const refreshToken = jwt.sign({
                    //     user: user.name
                    // }, "cs572", { expiresIn: 86400 });

                    response.message = {
                        success: true,
                        token: token
                            // ,
                            // refreshToken: refreshToken
                    };

                } else {

                    response.status = 401;
                    response.message = { "message": "User UnAuthorized" };
                }
            }
        }

        res.status(response.status).json(response.message);
    });
}

//This method is not used yet
module.exports.authenticate = function(req, res, next) {
    const headerExists = req.headers.authentication;
    const response = {
        status: 403,
        message: ""
    }
    if (headerExists) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function(err, decoded) {
            if (err) {
                console.log(err);
                res.status(410).json({ "message": "Unauthorized" });
            } else {
                req.user = decoded.user
                next();
            }

        })

    } else {
        res.status(403).json({ "message": "No token provided" });
    }
}
module.exports.getProfile = function(req, res) {

    res.status(200).json(req.user); // mundet ta besh UserModel.findById(...) kush e beri print?
}