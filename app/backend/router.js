'use strict';

const router = require("express").Router();

const fileserver = require("./fileserver");
const fileuploaded = require("./middlewares/fileuploads");

const check = require("./middlewares/check");
const user = require("./models/user/user");
const spot = require("./models/spot/spot");
const interactions = require("./models/interactions/interactions");

router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res, req);
});

//user specific
router.post("/login", user.postLogin);
router.post("/register", user.postRegister);
router.post("/logout", check.auth, user.postLogout);
router.post("/profile", check.auth, fileuploaded.single('addpp'), user.postProfile); //add profile picture
router.post("/user/:username", check.username, user.postGetUser);

//spot specific
router.post("/spots", spot.postGetSpots);
router.post("/spots/create", check.auth, spot.postCreateSpot);
router.post("/spots/:sid",check.spotid, interactions.views, spot.postGetSpot);
router.post("/spots/:sid/ratings", check.spotid, interactions.postGetSpotRatings);
router.post("/spots/:sid/rate", check.spotid, check.auth, interactions.postRateSpot);
router.post("/spots/:sid/delrating", check.spotid, check.auth, interactions.postDelRateSpot);
router.post("/spots/:sid/delete", check.spotid, check.auth, spot.postDeleteSpot);
router.post("/spots/:sid/image", check.spotid, check.auth, fileuploaded.single('addimage'), spot.postSpotImage);

module.exports = router;