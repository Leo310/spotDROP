'use strict';

const fs = require("fs");
const path = require("path");

const db = require("../../db/db");


exports.add = (sid, session) => {
    fs.renameSync(path.join(__dirname, "..", "..", "uploads", "tmp", "spotimages", session.uname + ".png"), path.join(__dirname, "..", "..", "uploads", "spotimages", sid + ".png")); //from tmp to athorized)
    return db.update("spot", "sid", sid, "image", 1)
    .catch(err => {return err;});
}

exports.delete = (sid) => {
    fs.rmSync(path.join(__dirname, "..", "..", "uploads", "spotimages", sid + ".png"));
    return db.update("spot", "sid", sid, "image", 0)
    .catch(err => {return err;});
}

exports.get = (sid) => {
    return db.get("spot", "sid, image", "sid", sid)
    .then(results => {return results[0].image;})
    .catch(err => {return err;});
}