'use strict';
const fs = require("fs").promises;

const logger = function(log) {
    if(log) {
        if(log.content)
        {
            fs.appendFile("srvlog.txt", '['+log.level+"]: " + log.content + '\n')
            .then()
            .catch(err => console.error(err));
        } else {    
            return (req, res, next) => {
                fs.appendFile("srvlog.txt", '['+log.level+"]: " + req.method + " " + req.path + '\n')
                .then()
                .catch(err => console.error(err));
                next();
            }
        }
        
    }
}

module.exports = logger;