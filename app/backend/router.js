'use strict';

const router = require("express").Router();

const user = require("./user/user")
const fileserver = require("./fileserver");

router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res, req);
});

router.post("/login", user.postlogin);
router.post("/register", user.postregister);
router.post("/logout", user.postlogout);

module.exports = router;