'use strict';

const db = require("../db/db");


module.exports = (sid) => {
    db.delete("spot", "sid", sid)
    .catch(error => console.log(error))
}