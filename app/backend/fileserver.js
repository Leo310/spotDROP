'use strict';

const path = require("path");
const fs = require("fs").promises;

module.exports = function serveFile(req, res)
{
    //checks if file exists
    const pathparams = req.path.split('/');
    const file = (pathparams[pathparams.length-1] || "index") + ".html";; //if / root path selected than file should be index
    
    //serves file when it exists (=access);
    fs.access(path.join(__dirname, "..", "frontend", "public", file))
    .then(() => {
         //redirects if user already signed in
        if(req.session.uid)
        {
            if(file == "login.html" || file == "register.html")
            {
                res.redirect("home");
                return;
            }
        } else {
            if(file == "home.html")
            {
                res.redirect("index");
                return;
            }
        }
        res.sendFile(path.join(__dirname, "..", "frontend", "public", file));   //you could specify options
    }).catch((err) => {
        console.log("file does not exist Error: " + err);
        res.sendFile(path.join(__dirname, "..", "frontend", "public", "index.html")); //fallback file
    });
}