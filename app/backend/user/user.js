'use strict';

const path = require("path");

const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const profilepicture = require("./profilepicture");
const errorcodes = require("../errorcodes");

exports.postLogin = async (req, res) => {
    const logined = await login(req.body.nameemail, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
    res.json({
        status: logined
    });
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

exports.postProfile = async (req, res) => {
    //sends username to client
    if (req.body.getusername) {
        res.json({
            status: errorcodes.success,
            username: req.session.uname
        })
    } 
    //adds profile picture to user
    else if (req.file && req.file.fieldname == "addpp") {
        profilepicture.add(req.session);
        res.json({
            status: errorcodes.success
        });
    } 
    //deletes profile picture to user
    else if (req.body.deletepp) {
        if (await profilepicture.get(req.session)) {    //checks if there is an image on server
            profilepicture.delete(req.session); 
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
        if (await profilepicture.get(req.session)) //checks if there is an image on server
        {
            res.sendFile(path.join(__dirname, "..", "uploads", "profilepictures", req.session.uname + ".png"));
        }
        else{
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