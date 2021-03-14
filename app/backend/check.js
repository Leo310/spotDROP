'use strict';

const errorcodes = require("./errorcodes");
const userutilities = require("./user/utilities");

exports.auth = (req, res, next) => {
    if(!req.session.uname)
        res.json({status: errorcodes.notLogedIn});
    else
        next();
}

exports.spotid = (req, res, next) => {
    if(!/^[0-9]+$/.test(req.params.sid))
        res.json({status: errorcodes.spotIdInvalid});
    else
        next();
}

exports.username = async (req, res, next) => {
    try {
        await userutilities.validateUsername(req.params.username);
        next();
    }catch {
        res.json({status: errorcodes.usernameInvalid});
    }
}
