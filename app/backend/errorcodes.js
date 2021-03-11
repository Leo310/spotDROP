'use strict';

// https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html all error codes

module.exports = {
    mysql: {
        duplicateEntry: "Dublicate Entry",
        notFound: "Couldnt find matching entry"
    },
    utilities: {
        usernameInvalid: "Username is Invalid",
        usernameAlreadyExists: "Username already Exists",
        emailInvalid: "Email is invalid",
        emailAlreadyExists: "Email already Exists",
        invalidPassword: "Password is invalid"
    }
}