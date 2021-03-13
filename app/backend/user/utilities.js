'use strict';

const crypto = require("crypto");
const errorcodes = require("../errorcodes");

exports.hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex"); //creates salt
    const pw = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return {
        hashedpw: pw,
        salt: salt
    }
}

exports.verifyPassword = (password, hashedpw, salt) => {
    return new Promise((resolve, reject) => {
        const pw = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        if (pw == hashedpw)
            resolve();
        else
            reject(errorcodes.invalidPassword);
    })
}

exports.getDate = () => {
    let date = new Date()
    date.setTime(date.getTime() - date.getTimezoneOffset() * 1000 * 60); // timezone is UTC+01 thats why we need to add it to set time because time is UTC 
    return date.toJSON().slice(0, 19).replace('T', ' '); //foramted to mysql datetime object
}

exports.validateUsername = (username) => {
    return new Promise((resolve, reject) => {
        if (/^[0-9a-zA-Z_.-]+$/.test(username))
            resolve("name");
        else
            reject(errorcodes.usernameInvalid);
    });
}

exports.validateEmail = (email) => {
    return new Promise((resolve, reject) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()))
            resolve("email");
        else
            reject(errorcodes.emailInvalid);
    })
}