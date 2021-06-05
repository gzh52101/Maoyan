const jwt = require('jsonwebtoken');
const {key} = require("../config");

exports.createToken = function(data){
    const token = jwt.sign(data,key,{expiresIn:"1d"})
    return token
}

exports.verifyToken = function(token){
    try{
        const data = jwt.verify(token,key)
        return true;
    }catch(err){
        return false;
    }
}