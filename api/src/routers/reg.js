const express = require('express')
const router = express.Router()
const {encode,returnCode} = require("../utils/tools")
const query = require("../db")
const colName = 'user'//查询的表名

router.post("/", async(req,res)=>{
    let {user_name,password,vcode,time} = req.body

    if(req.session.vcode){
        if(vcode ==req.session.vcode){
            password = encode(password);      
            var sql = `INSERT INTO ${colName} VALUES (NULL, '${user_name}', '${password}', NULL, NULL, NULL,0,'${time},NULL,NULL');`
            try {
                let result = await query(sql);
                res.send(returnCode({code:200,msg:"注册成功！"}))
            } catch (error) {
                console.log(error);
            }     
        }else{
            res.send(returnCode({code:401,msg:'验证码错误'}))
        }

    }else{
        res.send(returnCode({code:401,msg:"验证码已经过期"}))
    }

    





    
})

module.exports= router;