'use strict';

const db = require("../../db/db");

exports.all = () => {
    return db.get("spot", "*")
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.user = (username) => {
    return db.get("spot", "*", "username", username)
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}

//compares title from input and database
exports.withtitel = (titel) => {
    return db.get("spot", "*")
    .then(results => {
        let spotswithtitle = [];
        for(let i = 0; i < results.length; i++){
            if(results[i]["title"].toLowerCase().includes(titel.toLowerCase()))     
                spotswithtitle.push(results[i]);
        }
        return spotswithtitle;
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}