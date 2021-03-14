'use strict';

const utilities = require("./utilities");
const db = require("../db/db");
const errorcodes = require("../errorcodes");

module.exports = (nameemail, password, session) => {
    let username; //need to access username over different promises
    return utilities.validateEmail(nameemail)
        .catch(invalidEmail => utilities.validateUsername(nameemail))
        .then(inputtype => db.get("user", "name, email, password, salt", inputtype, nameemail)) //type is name or email
        .then((user) => {
            username = user[0].name;
            return utilities.verifyPassword(password, user[0].password, user[0].salt);
        })
        .then(() => {
            session.uname = username;
            return errorcodes.success; //logined
        }).catch((errorcode) => {
            console.log("Loginerror: " + errorcode)
            return errorcode; //not logined
        })
}