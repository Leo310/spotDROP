"use strict"; //doesnt let me initialize undefinde variables

const http = require("http");

const logger = require("./logger");

const express = require("express");

const app = express();

const host = "localhost";
const port = "3000";

const server = http.createServer(app); //creates a server with a callback "app" that gets called when a request comes in


server.listen(3000, () => {
  logger.reset(() => { //clears logfile
    logger.log(`Server is running on http://${host}:${port}`, "Info");
  });
});

//middleware gets called first (only when its first in code) everytime when a request comes in
app.use(logger.mw("debug"));  //logs stuff

//middleware for serving html files to client
var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'htm'],
  index: "index.html",
  redirect: true,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('../frontend/public/', options));
  
//testing communtication between frontend and backend
app.use(express.raw({ limit: '1mb', type:"text/plain"}));
app.use(express.json());

app.post("/index", (req, res) => {
  res.type("text/plain")
  res.send(req.body.toString());
});

app.post("/login", (req, res) => {
  res.json({
    status:"succes",
    name: req.body.name,
    password: req.body.password
  })
});