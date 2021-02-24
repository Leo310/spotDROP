'use strict';
const fs = require("fs").promises;


const reset = function() {
    fs.rm("./srvlog.txt")
    .catch(err => console.error(err));
};

const log = function(content, options) {
    fs.appendFile("srvlog.txt", '['+options+"]: " + content + '\n')
    .catch(err => console.error(err));
}

const middleware = function(options)
{
    return (req, res, next) => {
        fs.appendFile("srvlog.txt", '['+options+"]: " + req.method + " " + req.path + '\n')
        .catch(err => console.error(err));
        next();
    }
}

module.exports = { log: log, mw: middleware, reset: reset};