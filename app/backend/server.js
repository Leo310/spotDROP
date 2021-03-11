"use strict"; //doesnt let me initialize undefinde variables

const http = require("http");
//const path = require("path");

const express = require("express"); //handels routes

const session = require("./sessions")
const logger = require("./logger");
const routes = require("./router");


const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

const server = http.createServer(app); //creates a server with a callback "app" that gets called when a request comes in

server.listen(port, () => {
  logger.reset(() => { //clears logfile
    logger.log(`Server is running on http://${host}:${port}`, "Info");
  });
});

//middleware gets called first (only when its first in code) everytime when a request comes in
app.use(logger.mw("debug")); //logs stuff

/*
//serves public files
const options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: "index.html",
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static(path.join(__dirname, "..", "frontend", "public"), options));*/

app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //encodes forms and makes it accessible through req.body
app.use(session);
app.use("/", routes);