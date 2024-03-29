'use strict';

const router = require("express").Router();

const fileserver = require("./fileserver");
const fileuploaded = require("./middlewares/fileuploads"); //gets called on routes where files need to get uploaded

//middleware to check basic things like authentification and validation before passing to model 
const check = require("./middlewares/check"); 

//redirects routes to those models, they implemented the whole logic
const user = require("./models/user/user"); 
const spot = require("./models/spot/spot");
const interactions = require("./models/interactions/interactions");

//serves all files/all get request
router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res, req);
});

//serves data/all post request
//user specific routes
router.post("/login", user.postLogin);
router.post("/register", user.postRegister);
router.post("/logout", check.auth, user.postLogout);
router.post("/profile", check.auth, fileuploaded.single('addpp'), user.postProfile); //add profile picture
router.post("/user/:username", check.username, user.postGetUser);
router.post("/getspots/:username",check.username, spot.postGetUserSpots);

//spot specific routes
router.post("/spots", spot.postGetSpots);
router.post("/topspots", spot.postGetTopSpots);
router.post("/spotswithtitle", spot.postGetSpotsWithTitle);
router.post("/spots/create", check.auth, spot.postCreateSpot);
router.post("/spot/:sid",check.spotid, interactions.views, spot.postGetSpot);
router.post("/spots/:sid/addcategories",check.spotid, spot.postAddCategorySpot);
router.post("/spots/:sid/getcategories",check.spotid, spot.postGetCategoriesSpot);
router.post("/spots/:sid/ratings", check.spotid, interactions.postGetSpotRatings);
router.post("/spots/:sid/rate", check.spotid, check.auth, interactions.postRateSpot);
router.post("/spots/:sid/delrating", check.spotid, check.auth, interactions.postDelRateSpot);
router.post("/spots/:sid/delete", check.spotid, check.auth, spot.postDeleteSpot);
router.post("/spots/:sid/getimage", check.spotid, spot.postGetSpotImage);
router.post("/spots/:sid/image", check.spotid, check.auth, fileuploaded.single('addimage'), spot.postSpotImage);

module.exports = router;