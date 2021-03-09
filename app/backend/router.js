'use strict';

const router = require("express").Router();

const fileserver = require("./fileserver");
const user = require("./controller/user")

router.get("*", (res, req) => { //on get request always serve html files
    fileserver(res,req);
});

router.post("/login", user.postlogin);  
router.post("/register", user.postregister);  
router.post("/logout", user.postlogout);
router.post("/home", user.posthome);

module.exports = router;