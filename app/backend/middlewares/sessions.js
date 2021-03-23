'use strict';

// MIDDLEWARE that handles all sessions an stores them into redis db

const session = require("express-session"); //handles sessions
const redis = require("redis");
const Redisstore = require("connect-redis")(session); //library which to make default session storing in in memory database redis

//redis driver
const redisclient = redis.createClient();

redisclient.on("error", function (error) {
  console.error(error);
});


//session(options) https://www.npmjs.com/package/express-session
module.exports = session({
  name: "sid",
  store: new Redisstore({
    client: redisclient
  }),
  cookie: {
    //maxAge: twoours,
    sameSite: true, 
    secure: false //needs to be true using https connection
  },
  resave: false,
  saveUninitialized: false, 
  secret: process.env.COOKIE_SECRET //encrypts hash of cookie to invalidate a clientside changed cookie
});