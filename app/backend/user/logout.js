'use strict';

module.exports = (session) => {
    if (!session.unameemail)
        return false; //not logined
    else {
        session.destroy();
        return true;
    }
}