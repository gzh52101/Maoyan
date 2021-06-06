const express = require('express')
const router = express.Router()
const {returnCode} = require("../utils/tools")
const {verifyToken} =require("../utils/token");

router.get("/",(req,res)=>{
        const {token} = req.query
        
        const result = verifyToken(token);

        if(result){
                res.send(returnCode({code:200,msg:"token没问题"}))
        }else{
                res.send(returnCode({code:401,msg:"token已经过期或者被修改"}))
        }
          res.send("123")          
})


module.exports = router;