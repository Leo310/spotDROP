'use strict';

const userutilities = require("./utilities"); // user utilities
const utilities = require("../utilities");
const db = require("../db/db");
const permission = require("./permissions");

module.exports = (name, email, password, session) => {
    return userutilities.validateUsername(name)
        .then(() => userutilities.validateEmail(email))
        .then((type) => {
            const pw = userutilities.hashPassword(password);
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