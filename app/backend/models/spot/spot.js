'use strict';

const path = require("path");

const errorcodes = require("../../errorcodes");
const getspot = require("./getspot");
const getspots = require("./getspots");
const createspot = require("./createspot");
const deletespot = require("./deletespot");
const image = require("./image");
const views = require("./getspotviews");
const spotutilities = require("./utilities");

exports.postCreateSpot = async (req, res) => {
    const body = req.body;
    const created = await createspot(body.title, body.description, body.categoryid, 0, body.street, body.housenumber, body.zip, body.city, req.session);
    res.json({
        status: created
    });
}

exports.postSpotImage = async (req, res) => {
    if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
    {
        //adds image to spot
        if (req.file && req.file.fieldname == "addimage") {
            if (req.session.uname == await spotutilities.getSpotAuthor(req.params.sid)) {
                image.add(req.params.sid, req.session);
                res.json({
                    status: errorcodes.success
                });
            } else {
                res.json({
                    status: errorcodes.notCreatorOfSpot
                });
            }
        }
        //deletes image from spot
        else if (req.body.deleteimage) {
            if (req.session.uname == await spotutilities.getSpotAuthor(req.params.sid)) {
                if (await image.get(req.params.sid)) {
                    image.delete(req.params.sid);
                    res.json({
                        status: errorcodes.success
                    });
                } else {
                    res.json({
                        status: errorcodes.noImage
                    });
                }
            } else {
                res.json({
                    status: errorcodes.notCreatorOfSpot
                });
            }
        } else {
            res.json({
                status: errorcodes.notFound
            });
        }
    } else {
        res.json({
            status: errorcodes.noSpotImage
        });
    }
}

exports.postDeleteSpot = async (req, res) => {
    if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
    {
        if (req.session.uname == await spotutilities.getSpotAuthor(req.params.sid)) {
            await deletespot(req.params.sid);
            res.json({
                status: errorcodes.success
            });
        } else {
            res.json({
                status: errorcodes.notCreatorOfSpot
            });
        }
    } else {
        res.json({
            status: errorcodes.noSpotImage
        });
    }
}

exports.postGetSpots = async (req, res) => {
    if (req.body.spotcount) {
        if (/^[0-9]+$/.test(req.body.spotcount)) //accepts only positive numbers
        {
            const spotsdata = await getspots();
            if (spotsdata == errorcodes.notFound) {
                res.json({
                    status: errorcodes.noSpotImage
                });
            } else {
                let spotcount = req.body.spotcount;
                if (spotcount == 0 || spotcount > spotsdata.length) //if spotcount equals 0 than client wants to fetch all spots
                    spotcount = spotsdata.length;

                for (let i = 0; i < spotcount; i++) {
                    spotsdata[i]["status"] = errorcodes.success;
                    spotsdata[i]["views"] = await views(req.params.sid); //add views count to spotdata
                }

                res.json(spotsdata);
            }
        } else {
            res.json({
                status: errorcodes.countInvalid
            });
        }
    } else {
        res.json({
            status: errorcodes.noCount
        });
    }
}

exports.postGetSpot = async (req, res) => {
    //you can only fetch image and spotdata independently from server for now
    if (req.body.getimage) {
        const imageonserver = await image.get(req.params.sid);
        if (errorcodes.notFound != imageonserver && imageonserver != 0) //checks if there is an image on server
            res.sendFile(path.join(__dirname, "..", "..", "uploads", "spotimages", req.params.sid + ".png"));
        else
            res.json({
                status: errorcodes.noSpotImage
            });
    } else { //send spotdata to client
        let spotdata = await getspot(req.params.sid);
        if (spotdata == errorcodes.notFound) {
            res.json({
                status: errorcodes.noSpotImage
            });
        } else {
            spotdata["status"] = errorcodes.success;
            spotdata["views"] = await views(req.params.sid); //add views count to spotdata
            res.json(
                spotdata
            );
        }
    }
}