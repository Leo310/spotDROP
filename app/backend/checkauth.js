'use strict';

const errorcodes = require("./errorcodes");

exports.checkauth = (req, res, next) => {
    if(!req.session.uname)
        res.json({status: errorcodes.notLogedIn});
    else
        next();
}
