'use strict';

const db = require("../db");
const path = require("path");

exports.postlogin = (req, res) => {
    if(!req.session.uid)
    {
        db.get("user" ,"name, password","name",req.body.name).then((user) => {
            if(user[0].password === req.body.password)
            {
                req.session.uid = user[0].name;
                res.redirect("/home");
            } else {
                res.redirect("/login");
            }
        }).catch(error => {
            res.redirect("/login");   
        })
    }else
        res.redirect("/home");
}

exports.postregister = (req, res) => {
    db.insert("user", "name, password", req.body.name, req.body.password);
    req.session.uid = req.body.name;
    res.redirect("/home");
}

exports.postlogout = (req, res) => {
    if(!req.session.uid)
        res.redirect("/login");
    else{
        req.session.destroy();
        res.redirect("/index");
    }
}

exports.posthome = (req, res) => {
    
}
