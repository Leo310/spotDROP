'use strict';

const db = require("../db/db");

module.exports = (sid) => {
    return db.get("spot", "*", "sid", sid)
    .then(results => {
        return results[0];
    })
    .catch(err => {
        return err;
    });
}