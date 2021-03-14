'use strict';

const db = require("../db/db");

module.exports = (username) => {
    return db.get("user", "*", "name", username)
    .then(results => results[0])
    .catch(err => {
        console.log(err);
        return err;
    });
}