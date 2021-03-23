'use strict';

const db = require("../../db/db");

exports.all = () => {
    return db.customQuery("select * from spot order by date desc")
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}

exports.user = (username) => {
    return db.customQuery("select * from spot where username='" + username + "' order by date desc")
    .then(results => results)
    .catch(err => {
        console.log(err);
        return err;
    });
}

//compares title from input and database
exports.withtitel = (titel) => {
    return db.customQuery("select * from spot order by date desc")
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