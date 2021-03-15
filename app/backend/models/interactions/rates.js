'use strict';

const utilities = require("../../utilities");
const iautilities = require("./utilities")

const db = require("../../db/db");
const errorcodes = require("../../errorcodes");

exports.create = (username, sid, title, stars, text) => {
    return iautilities.validateRatingStars(stars)
    .then(() => iautilities.validateRatingTitle(title))
    .then(() => iautilities.validateRatingText(text))
    .then(() => db.insert("rates", "username, sid, title, stars, text, date", username, sid, title, stars, text, utilities.getDate()))
    .then(() => errorcodes.success)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.delete = (username, sid) => {
    return db.delete("rates", "username", username, "sid", sid)
    .then(() => errorcodes.success)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.get = (username, sid) => {
    return db.get("rates", "*", "username", username, "sid", sid)
    .then(() => errorcodes.success)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.getRatings = (sid) => {
    return db.get("rates", "*", "sid", sid)
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    })

}