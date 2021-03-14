'use strict';

const errorcodes = require("../../errorcodes");
const utilities = require("../../utilities");
const spotutilities = require("./utilities");
const db = require("../../db/db");


module.exports = (title, description, category, image, street, housenumber, zip, city, session) => {
    return spotutilities.validateTitle(title)
    .then(() => spotutilities.validateDescription(description))
    .then(() => spotutilities.validateCategory(category))
    .then(() => spotutilities.validateImage(image))
    .then(() => spotutilities.validateStreet(street))
    .then(() => spotutilities.validateHousenumber(housenumber))
    .then(() => spotutilities.validateZip(zip))
    .then(() => spotutilities.validateCity(city))
    .then(() => db.insert("spot", "username, title, description, cid, image, street, housenumber, zip, city, date", session.uname, title, description, category, image, street, housenumber, zip, city, utilities.getDate()))
    .then(result => {
        return errorcodes.success;
    })
    .catch(error => {
        console.log("Create spot Error: " + error);
        return error;
    })
}