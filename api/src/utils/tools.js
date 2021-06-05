const crypto = require('crypto')
const {key} = require("../config")

exports.returnCode = function ({
    code = 200,
    data = [],
    msg ="success"
} = {}) {


    return {
        code,
        data,
        msg
    }
}

exports.encode = function(password){
    const hash = crypto.createHash("sha256");
    hash.update(password+key);
    password = hash.digest("hex");
    return password
}