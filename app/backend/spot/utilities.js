'use strict';

const errorcodes = require("../errorcodes");
const db = require("../db/db");
const categories = require("./categories")

exports.getSpotCount = async() => {
    return await db.getRowCount("spot");
}

exports.spotdatatojson = (dbresults) => {
    return {
        status: errorcodes.success,
        sid: dbresults["sid"],
        username: dbresults["username"],
        title: dbresults["title"],
        description: dbresults["description"],
        categoryid: dbresults["cid"],
        image: dbresults["image"],
        street: dbresults["street"],
        housenumber: dbresults["housenumber"],
        zip: dbresults["zip"],
        city: dbresults["city"],
        ustars: dbresults["ustars"],
        date: dbresults["date"]
    }
}

exports.getSpotAuthor = (sid) => {
    return new Promise((resolve, reject) => {
        db.get("spot", "sid, username", "sid", sid)
            .then(results => resolve(results[0].username))
            .catch(err => reject(err));
    });
}
exports.validateTitle = (title) => {
    return new Promise((resolve, reject) => {
        if (title.length <= 35 && /^[a-zA-Z0-9!.,()\-;:\u00C0-\u017F\s]+$/.test(title))
            resolve();
        else
            reject(errorcodes.titleInvalid);
    })
}

exports.validateDescription = (description) => {
    return new Promise((resolve, reject) => {
        if (description.length <= 1000 && /^[a-zA-Z0-9!.,()\-;:\u00C0-\u017F\s]+$/.test(description))
            resolve();
        else
            reject(errorcodes.descriptionInvalid);
    })
}

exports.validateImage = (image) => {
    return new Promise((resolve, reject) => {
        if (image == 1 || image == 0)
            resolve();
        else
            reject(errorcodes.imageInvalid);
    })
}


exports.validateCategory = (category) => {
    return new Promise((resolve, reject) => {
        if (category <= Object.keys(categories).length && category > 0 && /^[0-9]+$/.test(category))
            resolve();
        else
            reject(errorcodes.categoryInvalid);
    })
}

exports.validateStreet = (street) => {
    return new Promise((resolve, reject) => {
        if (street.length <= 100 && /^[a-zA-Z\-\u00C0-\u017F\s]+$/.test(street))
            resolve();
        else
            reject(errorcodes.streetInvalid);
    })
}
exports.validateHousenumber = (housenumber) => {
    return new Promise((resolve, reject) => {
        if (housenumber.length <= 3 && /^[0-9]+$/.test(housenumber))
            resolve();
        else
            reject(errorcodes.housenumberInvalid);
    })
}
exports.validateZip = (zip) => {
    return new Promise((resolve, reject) => {
        if (zip.length <= 9 && /^[0-9]+$/.test(zip))
            resolve();
        else
            reject(errorcodes.zipInvalid);
    })
}
exports.validateCity = (city) => {
    return new Promise((resolve, reject) => {
        if (city.length <= 50 && /^[a-zA-Z\u00C0-\u017F\s]+$/.test(city))
            resolve();
        else
            reject(errorcodes.cityInvalid);
    })
}