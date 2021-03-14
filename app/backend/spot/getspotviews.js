'use strict';

const db = require("../db/db");

module.exports = async (sid) => {
    return await db.getRowCount("views", "sid", sid);
 }