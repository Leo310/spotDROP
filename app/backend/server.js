"use strict"; //doesnt let me initialize undefinde variables

const http = require("http");
const fs = require("fs").promises;

const express = require("express");

const app = express();

const host = "localhost";
const port = "3000";

let webpages = new Map(); //Map with filename and content


function readAllWebpages(callback) {
  let promises = [];
  let filenames = [];
  fs.readdir("../frontend/")
  .then(files => {
    for(let i = 0; i < files.length; i++)
    {
      promises.push(fs.readFile(`../frontend/${files[i]}`));
      filenames[i] = '/'+files[i].split('.')[0];
    }
    Promise.all(promises)
    .then(results => {
      for(let i = 0; i < filenames.length; i++)
        webpages.set(filenames[i], results[i]);
      //FINISHED READING FILES
      callback();
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
    })
  .catch(err => {
    console.error(`Could not read file: ${err}`);
    process.exit(1);
  });

}

readAllWebpages(() => {
  server.listen(3000, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(webpages.get("/index"));
  });
  for(let [filename, pagecontent] of webpages)
  {
    app.get(filename, (req, res) => {
      res.set('Content-Type', 'text/html')
      res.send(pagecontent);
    })
  };
});



const server = http.createServer(app);


/*
const requestListener = function(req, res) {
  for(let i = 0; i < filenames.length; i++)
  {
    if(req.url == filenames[i])
    {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(webpages[i]);
      return;
    }
  }
  res.writeHead(404);
  res.end();
}*/

