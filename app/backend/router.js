'use strict';

const router = require("express").Router();

const user = require("./user/user")
const fileserver = require("./fileserver");
const fileuploaded = require("./fileuploads");

router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res, req);
});

router.post("/login", user.postLogin);
router.post("/register", user.postRegister);
router.post("/logout", user.postLogout);

router.post("/home", fileuploaded.single('addpp'), user.postHome); //add profile picture

module.exports = router;