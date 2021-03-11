'use strict';

const login = require("./login");
const register = require("./register");
const logout = require("./logout");

exports.postlogin = async (req, res) => {
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

exports.postregister = async (req, res) => {
    const notregistered = await register(req.body.name, req.body.email, req.body.password, req.session); //need to invert with not because return zero when succesful and errorcode when unsuccesful
    if (notregistered) {
        //TODO: when client calls fetch instead of a form 
        //res.json({error: notregistered}); //registered contains errorcodes if not zero
        res.status(401);
        res.redirect("/register");
    } else { //registered
        res.status(200);
        res.redirect("/home");
    }
}

exports.postlogout = (req, res) => {
    if (logout(req.session))
        res.redirect("/index");
    else
        res.redirect("/login");
}