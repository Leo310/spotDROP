'use strict';

const db = require("../db/db");
const image = require("./image");

module.exports = (sid) => {
    db.delete("spot", "sid", sid)
    .then(() => image.delete(sid))
    .catch(error => console.log(error))
}