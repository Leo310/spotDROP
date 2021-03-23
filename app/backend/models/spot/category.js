'use strict';

const db = require("../../db/db");
const errorcodes = require("../../errorcodes");
const utilities = require("./utilities");

exports.add = async (sid, categories) => {
    try {
        for(let i = 0; i < categories.length; i ++)
            await utilities.validateCategory(categories[i])
        for(let i = 0; i < categories.length; i ++)
            await db.insert("categorizes", "sid, name", sid, categories[i]);
        return errorcodes.success;
    } catch(err) {
        console.log(err);
        return err;
    }
}

exports.get = async (sid) => {
    return db.get("categorizes", "sid, name", "sid", sid)
    .then(results => {
        let categories = [];
        for(let i = 0; i < results.length; i++)
            categories[i] = results[i]["name"];
        return categories;
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}