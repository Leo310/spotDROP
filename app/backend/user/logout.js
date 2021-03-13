'use strict';

module.exports = (session) => {
    if (!session.uname)
        return false; //not logined
    else {
        session.destroy();
        return true;
    }
}