'use strict';

const errorcodes = require("../../errorcodes");

exports.validateRatingStars = (stars) => {
    return new Promise((resolve, reject) => {
        if (/^[1-5]$/.test(stars))
            resolve();
        else
            reject(errorcodes.ratingStarsInvalid);
    })
}

exports.validateRatingTitle = (title) => {
    return new Promise((resolve, reject) => {        if (title.length <= 35 && /^[a-zA-Z0-9!.,()\-;:\u00C0-\u017F\s]+$/.test(title))
            resolve();
        else
            reject(errorcodes.titleInvalid);
    })
}

exports.validateRatingText = (text) => {
    return new Promise((resolve, reject) => {
        if (text.length <= 1000 && /^[a-zA-Z0-9!.,()\-;:\u00C0-\u017F\s]+$/.test(text))
            resolve();
        else
            reject(errorcodes.ratingTextInvalid);
    })
}