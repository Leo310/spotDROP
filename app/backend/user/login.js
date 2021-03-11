'use strict';

const utilities = require("./utilities");
const db = require("../db/db");

module.exports = (nameemail, password, session) => {
    return utilities.validateEmail(nameemail)
        .catch(invalidEmail => utilities.validateUsername(nameemail))
        .then(inputtype => db.get("user", "name, email, password, salt", inputtype, nameemail)) //type is name or email
        .then((user) => utilities.verifyPassword(password, user[0].password, user[0].salt))
        .then(() => {
            session.unameemail = nameemail;
            return; //logined
        }).catch((errorcode) => {
            console.log("Loginerror: " + errorcode)
            return errorcode; //not logined
        })
}