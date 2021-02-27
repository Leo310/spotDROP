"use strict"; //doesnt let me initialize undefinde variables

const http = require("http");

const express = require("express");
const mysql = require("mysql");

const logger = require("./logger");

const app = express();

const host = "localhost";
const port = "3000";

const server = http.createServer(app); //creates a server with a callback "app" that gets called when a request comes in

const pool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  host: "127.0.0.1",
  password: "test1234",
  database: "test"
});


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
  pool.query(`insert into user (name, password) values ('${req.body.name}', '${req.body.password}');`, (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results);});
  res.json({
    status:"succes",
    name: req.body.name,
    password: req.body.password
  })
});



