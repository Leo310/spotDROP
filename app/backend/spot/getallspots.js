'use strict';

const db = require("../db/db");

module.exports = () => {
    return db.get("spot", "*")
    .then(results => {
        return results;
    })
    .catch(err => {
        return err;
    });
}