'use strict';

exports.getDate = () => {
    let date = new Date()
    date.setTime(date.getTime() - date.getTimezoneOffset() * 1000 * 60); // timezone is UTC+01 thats why we need to add it to set time because time is UTC 
    return date.toJSON().slice(0, 19).replace('T', ' '); //foramted to mysql datetime object
}