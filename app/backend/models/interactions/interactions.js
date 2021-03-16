'use strict';

//MAIN PAGE


const errorcodes = require("../../errorcodes");
const views = require("./views");
const rating = require("./rates");
const getspot = require("../spot/getspot");


exports.views = async (req, res, next) => {
    if (req.session.uname) {
        if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
        {
            views(req.session.uname, req.params.sid);
            next();
        } else {
            res.json({
                status: errorcodes.noSpotImage
            });
        }
    }else
        next(); //need to call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
}

exports.postRateSpot = async (req, res) => {
    if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
    {
        const rated = await rating.create(req.session.uname, req.params.sid, req.body.title ,req.body.stars, req.body.text);
        res.json({
            status: rated
        });
    } else {
        res.json({
            status: errorcodes.noSpotImage
        });
    }
}

exports.postDelRateSpot = async (req, res) => {
    if (await rating.get(req.session.uname, req.params.sid) != errorcodes.notFound) //verifies that a rating with this id exists
    {
        const deleted = await rating.delete(req.session.uname, req.params.sid);
        res.json({
            status: deleted
        });
    } else {
        res.json({
            status: errorcodes.noSpotImage
        });
    }
}

exports.postGetSpotRatings = async (req, res) => {
    if (req.body.ratingcount) {
        if (/^[0-9]+$/.test(req.body.ratingcount)) //accepts only positive numbers
        {
            const ratingsdata = await rating.getRatings(req.params.sid);
            if (ratingsdata == errorcodes.notFound) {
                res.json([{
                    status: errorcodes.noRating
                }]);
            } else {
                let ratingcount = req.body.ratingcount;
                if (ratingcount == 0 || ratingcount > ratingsdata.length) //if ratingcount equals 0 than client wants to fetch all spots
                    ratingcount = ratingsdata.length;

                ratingsdata.unshift({"status": errorcodes.success});
                res.json(ratingsdata);
            }
        } else {
            res.json([{
                status: errorcodes.countInvalid
            }]);
        }
    } else {
        res.json([{
            status: errorcodes.noCount
        }]);
    }
}