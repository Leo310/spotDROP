'use strict';

const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.MYSQL_USER,
    host: process.env.HOST,
    password: process.env.MYSQL_PASSWORD,
    database: "test"
});

exports.insertUser = (uname, upassword) =>
{
    pool.query(`insert into user (name, password) values ('${uname}', '${upassword}');`, (error, results, fields) => {
        if (error) throw error; 
    });
}

exports.getUser = (rows, key, value) =>
{
    return new Promise((resolve, reject) => {
        
        pool.query(`select ${rows} from user where ${key}='${value}';`, (error, results, fields) => {
            if(error || results[0] === undefined) 
            {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    })
}
