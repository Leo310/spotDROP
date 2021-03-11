'use strict';

const session = require("express-session"); //handles sessions
const redis = require("redis");
const Redisstore = require("connect-redis")(session); //library which to make default session storing in in memory database redis


const redisclient = redis.createClient();

redisclient.on("error", function (error) {
  console.error(error);
});

module.exports = session({
  name: "sid",
  store: new Redisstore({
    client: redisclient
  }),
  cookie: {
    //maxAge: twoours,
    sameSite: true, //NEED LOOKUP
    secure: false //needs to be true using https connection
  },
  resave: false, //NEED LOOKUP
  saveUninitialized: false, //NEED LOOKUP
  secret: process.env.COOKIE_SECRET //encrypts hash of cookie to invalidate a clientside changed cookie
});