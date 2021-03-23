'use strict';

const db = require("../../db/db");
const errorcodes = require("../../errorcodes");
const image = require("./image");

module.exports = (sid) => {
    db.delete("spot", "sid", sid)
        .then(() => image.get(sid))
        .then((result) => {
            if(result != errorcodes.notFound){
                console.log("asldjflkjsalkdflks")
                return image.delete(sid);
            }
            return errorcodes.success;
        })
        .catch(error => console.log(error))
}