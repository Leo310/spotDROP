'use strict';

const router = require("express").Router();

const fileserver = require("./fileserver");
const fileuploaded = require("./fileuploads");

const auth = require("./checkauth"); //checks if user logedin
const user = require("./user/user");
const spot = require("./spot/spot");
const interactions = require("./interactions/interactions");

router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res, req);
});

//user specific
router.post("/login", user.postLogin);
router.post("/register", user.postRegister);
router.post("/logout", auth.checkauth, user.postLogout);
router.post("/profile", auth.checkauth, fileuploaded.single('addpp'), user.postProfile); //add profile picture

//spot specific
router.post("/spots", spot.postGetAllSpots);
router.post("/spots/create", auth.checkauth, spot.postCreateSpot);
router.post("/spots/:sid", interactions.views, spot.postGetSpot);
router.post("/spots/:sid/delete", auth.checkauth, spot.postDeleteSpot);
router.post("/spots/:sid/image", auth.checkauth, fileuploaded.single('addimage'), spot.postSpotImage);

module.exports = router;