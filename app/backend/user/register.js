'use strict';

const utilities = require("./utilities");
const db = require("../db/db");
const permission = require("./permissions");

module.exports = (name, email, password, session) => {
    return utilities.validateUsername(name)
        .then(() => utilities.validateEmail(email))
        .then((type) => {
            const pw = utilities.hashPassword(password);
            return db.insert("user", "name, email, password, salt, profilepicture, permission, date", name, email, pw.hashedpw, pw.salt, 0, permission.user, utilities.getDate());
        })
        .then(results => {
            session.uname = name; //inits session
            return;
        })
        .catch(errorcode => {
            console.log("Registererror: " + errorcode);
            return errorcode;
        })
}