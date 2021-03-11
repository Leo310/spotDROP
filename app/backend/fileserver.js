'use strict';

const path = require("path");
const fs = require("fs").promises;

module.exports = function serveFile(req, res) {
    /*
    const pathparams = req.path.split('/'); //allows every path with
    const file = (pathparams[pathparams.length-1] || "index") + ".html";; //if / root path selected than file should be index
    */
    const file = (req.path.substring(1) || "index") + ".html"; // if / root path selected than file should be index

    //serves file when it exists (=access);
    fs.access(path.join(__dirname, "..", "frontend", "public", file))
        .then(() => {
            //redirects if user already signed in
            if (req.session.unameemail) {
                if (file == "login.html" || file == "register.html") {
                    res.redirect("home");
                    return;
                }
            } else if (file == "home.html") {
                res.redirect("login");
                return;
            }
            res.sendFile(path.join(__dirname, "..", "frontend", "public", file)); //you could specify options
        }).catch((err) => {
            console.log("file does not exist Error: " + err);
            res.sendStatus(404); //Not Found
        });
}