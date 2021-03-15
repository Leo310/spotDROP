'use strict';

const path = require("path");

const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const profilepicture = require("./profilepicture");
const getuser = require("./getuser");
const errorcodes = require("../../errorcodes");

exports.postLogin = async (req, res) => {
    if (!req.session.uname) {
        const logined = await login(req.body.nameemail, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
        res.json({
            status: logined
        });
    } else {
        res.json({
            status: errorcodes.alreadyLogedIn
        });
    }
}

exports.postRegister = async (req, res) => {
    const registered = await register(req.body.name, req.body.email, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
    res.json({
        status: registered
    });
}

exports.postLogout = (req, res) => {
    logout(req.session);
    res.json({
        status: errorcodes.success
    });
}

exports.postGetUser = async (req, res) => {
    if (req.body.getpp) {
        if (await profilepicture.get(req.params.username)) //checks if there is an image on server
        {
            res.sendFile(path.join(__dirname, "..", "..", "uploads", "profilepictures", req.params.username + ".png"));
        } else {
            res.json({
                status: errorcodes.noSpotImage
            });
        }
    } else {
        const user = await getuser(req.params.username);
        if (user == errorcodes.notFound) {
            res.json({
                status: user
            });
        } else {
            res.json(user);
        }
    }

}

exports.postProfile = async (req, res) => {
    //sends username to client
    if (req.body.getloginedusername) {
        res.json({
            status: errorcodes.success,
            username: req.session.uname
        })
    }
    //adds profile picture to user
    else if (req.file && req.file.fieldname == "addpp") {
        profilepicture.add(req.session.uname);
        res.json({
            status: errorcodes.success
        });
    }
    //deletes profile picture to user
    else if (req.body.deletepp) {
        if (await profilepicture.get(req.session.uname)) { //checks if there is an image on server
            profilepicture.delete(req.session.uname);
            res.json({
                status: errorcodes.success
            });
        } else
            res.json({
                status: errorcodes.noSpotImage
            });
    }
    //sends profile picture to user
    else if (req.body.getpp) {
        if (await profilepicture.get(req.session.uname)) //checks if there is an image on server
        {
            res.sendFile(path.join(__dirname, "..", "..", "uploads", "profilepictures", req.session.uname + ".png"));
        } else {
            res.json({
                status: errorcodes.noSpotImage
            });
        }
    } else {
        res.json({
            status: errorcodes.notFound
        });
    }
}