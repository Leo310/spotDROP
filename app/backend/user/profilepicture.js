'use strict';

const fs = require("fs");
const path = require("path");

const db = require("../db/db");


exports.add = (session) => {
    db.update("user", "name", session.uname, "profilepicture", 1)
    .catch(err => console.log(err));
}

exports.delete = (session) => {
    fs.rmSync(path.join(__dirname, "..", "uploads", "profilepictures", session.uname + ".png"));
    db.update("user", "name", session.uname, "profilepicture", 0)
    .catch(err => console.log(err));
}

exports.get = (session) => {
    return db.get("user", "name, profilepicture", "name", session.uname)
    .then(results => {return results[0].profilepicture;})
    .catch(err => console.log(err));
}