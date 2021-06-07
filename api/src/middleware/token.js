const {verifyToken} =require("../utils/token");
const {returnCode} = require("../utils/tools")

module.exports =function VerifyToken(req,res,next){
        const {authorization} = req.headers;
        let result = verifyToken(authorization);
        if(result){
            next()
        }else{
            res.send(returnCode({code:401,msg:"token已过期,请重新登陆获取"}))
        }
}