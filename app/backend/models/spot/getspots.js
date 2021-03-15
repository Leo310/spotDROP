'use strict';

const db = require("../../db/db");

exports.all = () => {
    return db.get("spot", "*")
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.user = (username) => {
    return db.get("spot", "*", "username", username)
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}