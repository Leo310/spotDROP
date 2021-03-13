'use strict';

const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const profilepicture = require("./profilepicture");
const errorcodes = require("../errorcodes");

const path = require("path");

exports.postLogin = async (req, res) => {
    const notlogined = await login(req.body.nameemail, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
    if (notlogined) {
        //TODO: only send error, but not specific one because client shouldnt know if user or password is wrong
        res.status(401);
        res.redirect("/login");
    } else { //logined
        res.status(200);
        res.redirect("/home");
    }
}

exports.postRegister = async (req, res) => {
    const notregistered = await register(req.body.name, req.body.email, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
    if (notregistered) {
        //TODO: when client calls fetch instead of a form 
        //res.json({status: notregistered}); //registered contains errorcodes if not zero
        res.status(401);
        res.redirect("/register");
    } else { //registered
        res.status(200);
        res.redirect("/home");
    }
}

exports.postLogout = (req, res) => {
    if (logout(req.session))
        res.redirect("/index");
    else
        res.redirect("/login");
}

exports.postProfile = async (req, res) => {
    if(req.session.uname) //will be removed after adding proper redirect middleware
    {
        if(req.body.getusername){
            res.json({
                status: errorcodes.success,
                username: req.session.uname
            })
        }

        else if (req.file && req.file.fieldname == "addpp") {
            profilepicture.add(req.session);
            res.json({
                status: errorcodes.success
            });
        } 

        else if (req.body.deletepp) {
            if(await profilepicture.get(req.session))
            {
                profilepicture.delete(req.session);
                res.json({
                    status: errorcodes.success
                });
            } else
                res.json({status: errorcodes.noPP});
        } 

        else if (req.body.getpp) {
            if(await profilepicture.get(req.session))
                res.sendFile(path.join(__dirname, "..", "uploads", "profilepictures", req.session.uname + ".png"));
            else
                res.json({status: errorcodes.noPP});
        }

        else {
            res.status(404).end(); //not found
        }
    } else{
        res.status(401).end(); //unauthorized
    }
}