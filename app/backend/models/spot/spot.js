'use strict';

const path = require("path");

const compare = require('3');
const sortMap = require("sort-map");

const errorcodes = require("../../errorcodes");
const getspot = require("./getspot");
const getspots = require("./getspots");
const createspot = require("./createspot");
const deletespot = require("./deletespot");
const image = require("./image");
const views = require("./getspotviews");
const category = require("./category");
const spotutilities = require("./utilities");

exports.postCreateSpot = async (req, res) => {
    const body = req.body;
    const created = await createspot(body.title, body.description, 0, body.street, body.housenumber, body.zip, body.city, req.session);
    res.json(
        created
    );
}

exports.postGetCategoriesSpot = async (req, res) => {
    if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
    {
        if (req.session.uname == await spotutilities.getSpotAuthor(req.params.sid)) {
            let categories = await category.get(req.params.sid)
            if (categories == errorcodes.notFound) {
                res.json({
                    status: errorcodes.noCategory
                });
            } else {
                res.json({
                    "categories": categories,
                    "status": errorcodes.success
                });
            }
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

exports.postAddCategorySpot = async (req, res) => {
    if (await getspot(req.params.sid) != errorcodes.notFound) //verifies that a spot with this id exists
    {
        if (req.session.uname == await spotutilities.getSpotAuthor(req.params.sid)) {
            const added = await category.add(req.params.sid, req.body.categories)
            /*if(addedcategories == categoryInvalid)
                await deletespot(req.params.sid);*/

            res.json({
                status: added
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
        } //you can only fetch image and spotdata independently from server for now
        else if (req.body.getimage) {
            const imageonserver = await image.get(req.params.sid);
            if (errorcodes.notFound != imageonserver && imageonserver != 0) //checks if there is an image on server
                res.sendFile(path.join(__dirname, "..", "..", "uploads", "spotimages", req.params.sid + ".png"));
            else
                res.json({
                    status: errorcodes.noSpotImage
                });
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
exports.postGetUserSpots  = async (req, res) => {
    if(req.params.username || req.query.username){
        if (req.body.spotcount) {
            if (/^[0-9]+$/.test(req.body.spotcount)) //accepts only positive numbers
            {
                const spotsdata = await getspots.user(req.params.username || req.query.username);
                if (spotsdata == errorcodes.notFound) {
                    res.json({
                        status: errorcodes.noSpotImage
                    });
                } else {
                    let spotcount = req.body.spotcount;
                    if (spotcount === "0" || spotcount > spotsdata.length) //if spotcount equals 0 than client wants to fetch all spots
                        spotcount = spotsdata.length;
    
                    for (let i = 0; i < spotcount; i++) {
                        spotsdata[i]["views"] = await views(spotsdata[i]["sid"]); //add views count to spotdata
                    }
                    spotsdata.unshift({ status: errorcodes.success});
                    res.json(spotsdata);
                }
            } else {
                res.json([{     //need [] because on client we use fetched[0].status and not fetched.statuss because we are sending an array
                    status: errorcodes.countInvalid
                }]);
            }
        } else {
            res.json([{
                status: errorcodes.noCount
            }]);
        }
    } else {
        res.json([{
            status: errorcodes.noUserSpecified
        }]);
    }
}

exports.postGetSpots = async (req, res) => {
    if (req.body.spotcount) {
        if (/^[0-9]+$/.test(req.body.spotcount)) //accepts only positive numbers
        {
            const spotsdata = await getspots.all();
            if (spotsdata == errorcodes.notFound) {
                res.json({
                    status: errorcodes.noSpotImage
                });
            } else {
                let spotcount = req.body.spotcount;
                if (spotcount === "0" || spotcount > spotsdata.length) //if spotcount equals 0 than client wants to fetch all spots
                    spotcount = spotsdata.length;

                for (let i = 0; i < spotcount; i++) {
                    spotsdata[i]["views"] = await views(spotsdata[i]["sid"]); //add views count to spotdata
                }
                spotsdata.unshift({ status: errorcodes.success});
                res.json(spotsdata);
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

exports.postGetTopSpots = async (req, res) => {
    if (req.body.spotcount) {
        if (/^[0-9]+$/.test(req.body.spotcount)) //accepts only positive numbers
        {
            const spotsdata = await getspots.all();
            if (spotsdata == errorcodes.notFound) {
                res.json({
                    status: errorcodes.noSpotImage
                });
            } else {
                let spotcount = req.body.spotcount;
                if (spotcount === "0" || spotcount > spotsdata.length) //if spotcount equals 0 than client wants to fetch all spots
                    spotcount = spotsdata.length;

                let topviews = new Map();
                for (let i = 0; i < spotsdata.length; i++) {
                    topviews.set(spotsdata[i]["sid"], await views(spotsdata[i]["sid"]));
                }

                const topviewssorted = sortMap(topviews, ([k1, v1], [k2, v2]) => compare(v2, v1))
                let sortedspotsdata = [];
                for (let j = 0; j < spotcount; j++) {
                    for (let i = 0; i < spotsdata.length; i++) {
                        const sid = Array.from(topviewssorted.keys())[j]
                        if (spotsdata[i]["sid"]== sid) {
                            spotsdata[i]["status"] = errorcodes.success;
                            spotsdata[i]["views"] = topviewssorted.get(sid); //add views count to spotdata
                            sortedspotsdata.push(spotsdata[i]);
                            break;
                        }
                    }
                }
                sortedspotsdata.unshift({"status": errorcodes.success}); //first element statuscode
                
                res.json(sortedspotsdata);
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

exports.postGetSpot = async (req, res) => {
    //send spotdata to client
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