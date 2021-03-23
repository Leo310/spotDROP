"use strict"; //doesnt let me initialize undefinde variables

//MAIN

const http = require("http");

const express = require("express");

const session = require("./middlewares/sessions")
const logger = require("./middlewares/logger");
const routes = require("./router");


const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

const server = http.createServer(app); //creates a server with a callback "app" that gets called when a request comes in

server.listen(port, host, () => {
  logger.reset(() => { //clears logfile
    logger.log(`Server is running on http://${host}:${port}`, "Info");
  });
});

//Detailed documentation on http://expressjs.com/en/4x/api.html
//middleware gets called first (only when its first in code) everytime when a request comes in
app.use(logger.mw("debug")); //logs stuff TODO
app.use(express.json());  //Parses request with Header content type json to a json format which you can retrieve with req.body."key"
app.use(express.urlencoded({ //parses urlencoded bodies
  extended: false
})); //encodes forms and makes it accessible through req.body
app.use(session); // monitors sessions
app.use("/", routes); //routes get called