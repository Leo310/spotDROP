'use strict';

const path = require("path");

const errorcodes = require("../errorcodes");
const getspot = require("./getspot");
const getallspots = require("./getallspots");
const createspot = require("./createspot");
const deletespot = require("./deletespot");
const image = require("./image");
const spotutilities = require("./utilities")

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
            deletespot(req.params.sid);
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

exports.postGetAllSpots = async (req, res) => {
    const spotsdata = await getallspots();
    if (spotsdata == errorcodes.notFound) {
        res.json({
            status: errorcodes.noSpotImage
        });
    } else {
        let spotjson = [];
        for (let i = 0; i < spotsdata.length; i++)
            spotjson[i] = spotutilities.spotdatatojson(spotsdata[i]);

        res.json(spotjson);
    }
}

exports.postGetSpot = async (req, res) => {
    //you can only fetch image and spotdata independently from server for now
    if (req.body.getimage) {
        const imageonserver = await image.get(req.params.sid);
        if (errorcodes.notFound != imageonserver && imageonserver != 0) //checks if there is an image on server
            res.sendFile(path.join(__dirname, "..", "uploads", "spotimages", req.params.sid + ".png"));
        else
            res.json({
                status: errorcodes.noSpotImage
            });
    } else { //send spotdata to client
        const spotdata = await getspot(req.params.sid);
        if (spotdata == errorcodes.notFound) {
            res.json({
                status: errorcodes.noSpotImage
            });
        } else {
            res.json(
                spotutilities.spotdatatojson(spotdata)
            );
        }
    }
}