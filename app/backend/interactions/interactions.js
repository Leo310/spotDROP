'use strict';

const errorcodes = require("../errorcodes");
const views = require("./views");
const getspot = require("../spot/getspot");

exports.views = async (req, res, next) => {
    if(req.session.uname)
    {
        if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
        {
            views(req.session.uname, req.params.sid);
        } else {
            res.json({ status: errorcodes.noSpotImage});
        }
    } 
    next();
}