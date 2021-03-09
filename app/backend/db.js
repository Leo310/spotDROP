'use strict';

const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.MYSQL_USER,
    host: process.env.HOST,
    password: process.env.MYSQL_PASSWORD,
    database: "test"
});

exports.insert = (table, rows, ...values) =>
{
    //values to string for query
    let queryvalues= [];
    for(let i = 0; i < values.length - 1; i++)    //-1 because we dont want the comma at the end
        queryvalues[i] = "\'" + values[i] + "\'" + ", ";    
    queryvalues += "\'" + values[values.length-1] + "\'" ;
    console.log(queryvalues);

    pool.query(`insert into ${table} (${rows}) values (${queryvalues});`, (error, results, fields) => {
        if (error) throw error; 
    });
}

exports.get = (table, rows, key, value) =>
{
    return new Promise((resolve, reject) => {
        
        pool.query(`select ${rows} from ${table} where ${key}='${value}';`, (error, results, fields) => {
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
