'use strict';

const mysql = require("mysql");
const errorcodes = require("../errorcodes");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.MYSQL_USER,
    host: process.env.HOST,
    password: process.env.MYSQL_PASSWORD,
    database: "spotdrop"
});

exports.insert = (table, rows, ...values) => {
    return new Promise((resolve, reject) => {
        let queryvalues = []; //values to string for query
        for (let i = 0; i < values.length; i++) //-1 because we dont want the comma at the end
            queryvalues[i] = "\'" + values[i] + "\'";
        pool.query(`insert into ${table} (${rows}) values (${queryvalues});`, (error, results, fields) => {
            if (error && error.errno == 1062) //error code for dublicate entry 
                reject(errorcodes.duplicateEntry);
            else if (error) //unregistered errors (not documentaded in errorcodes.js)
                reject(error.sqlMessage)
            else
                resolve(results);
        });
    });
}

exports.get = (table, rows, where, value, where2, value2) => {
    return new Promise((resolve, reject) => {
        if (where2 && value2) {
            pool.query(`select ${rows} from ${table} where ${where}='${value}' and ${where2}='${value2}';`, (error, results, fields) => {
                if (results[0] === undefined) //couldnt find a column with given entry
                {
                    reject(errorcodes.notFound);
                } else if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results);
                }
            }); 
        }
        else if (where && value) {
            pool.query(`select ${rows} from ${table} where ${where}='${value}';`, (error, results, fields) => {
                if (results[0] === undefined) //couldnt find a column with given entry
                {
                    reject(errorcodes.notFound);
                } else if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results);
                }
            });
        } else {
            pool.query(`select ${rows} from ${table};`, (error, results, fields) => {
                if (Object.keys(results).length === 0) //couldnt find a column with given entry
                {
                    reject(errorcodes.notFound);
                }
                if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results);
                }
            });
        }
    })
}

exports.getRowCount = (table, where, value) => {
    return new Promise((resolve, reject) => {
        if(where && value) {
            pool.query(`select COUNT(*) from ${table} where ${where}=${value};`, (error, results, fields) => {
                if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results[0]['COUNT(*)']);
                }
            });
        }else {
            pool.query(`select COUNT(*) from ${table};`, (error, results, fields) => {
                if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results[0]['COUNT(*)']);
                }
            });
        }
    })
}

exports.update = (table, where, value1, set, value2) => {
    return new Promise((resolve, reject) => {
        pool.query(`update ${table} set ${set}=${value2} where ${where}='${value1}';`, (error, results, fields) => {
            if (error) {
                reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
            } else {
                resolve(results);
            }
        });
    })
}

exports.delete = (table, where1, value1, where2, value2) => {
    return new Promise((resolve, reject) => {
        if(where2 && value2){
            pool.query(`delete from ${table} where ${where1}='${value1}' and ${where2}='${value2}';`, (error, results, fields) => {
                if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results);
                }
            });
        }else {
            pool.query(`delete from ${table} where ${where}='${value}';`, (error, results, fields) => {
                if (error) {
                    reject(error.sqlMessage); //unregistered errors (not documentaded in errorcodes.js)
                } else {
                    resolve(results);
                }
            });
        }
    })
}