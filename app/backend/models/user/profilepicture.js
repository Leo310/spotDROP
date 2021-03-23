'use strict';

const fs = require("fs");
const path = require("path");

const db = require("../../db/db");


exports.add = (username) => {
    fs.renameSync(path.join(__dirname, "..", "..", "uploads", "tmp", "profilepictures", username + ".png"), path.join(__dirname, "..", "..", "uploads", "profilepictures", username + ".png")); //from tmp to athorized
    db.update("user", "name", username, "profilepicture", 1)
    .catch(err => console.log(err));
}

exports.delete = (username) => {
    fs.rmSync(path.join(__dirname, "..", "..", "uploads", "profilepictures", username + ".png"));
    db.update("user", "name", username, "profilepicture", 0)
    .catch(err => console.log(err));
}

exports.get = (username) => {
    return db.get("user", "name, profilepicture", "name", username)
    .then(results => {return results[0].profilepicture;})
    .catch(err => console.log(err));
}

exports.getUser = (username) => {
    return db.get("user", "name, profilepicture", "name", username)
    .then(results => {return results[0].profilepicture;})
    .catch(err => console.log(err));
}