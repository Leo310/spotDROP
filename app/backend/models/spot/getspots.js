'use strict';

const db = require("../../db/db");

module.exports = () => {
    return db.get("spot", "*")
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}