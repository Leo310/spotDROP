'use strict';
const router = require("express").Router();

const user = require("../controller/user");

router.post("/login", user.postlogin);  
router.post("/register", user.postregister);  
router.post("/logout", user.postlogout);
router.post("/home", user.posthome);

router.get("/login", user.getlogin);   
router.get("/register", user.getregister);   
router.get("/home", user.gethome);

module.exports = router;