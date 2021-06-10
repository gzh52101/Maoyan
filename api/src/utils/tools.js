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

exports.format = function(d, f = "-"){
    var years = d.getFullYear();
    var month = d.getMonth() + 1;
    // 3===>03
    month = month >= 10 ? month : "0" + month;
    var date = d.getDate();
    date = date >= 10 ? date : "0" + date;

    var hours = d.getHours();
    hours = hours >= 10 ? hours : "0" + hours;

    var min = d.getMinutes();
    min = min >= 10 ? min : "0" + min;

    var sec = d.getSeconds();
    sec = sec >= 10 ? sec : "0" + sec;
    return `${years}${f}${month}${f}${date} ${hours}:${min}:${sec}`;
}