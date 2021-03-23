'use strict';

const db = require("../../db/db");
const utilities = require("../../utilities")

module.exports = (username, sid) => {
    db.insert("views", "username, sid, date", username, sid, utilities.getDate())
    .catch(err => console.log("Views " + err));
}