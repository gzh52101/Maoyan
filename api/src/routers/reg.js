const express = require('express')
const router = express.Router()
const {encode,returnCode,format} = require("../utils/tools")
const query = require("../db")
const colName = 'user'//查询的表名
const {createToken} = require('../utils/token')
router.post("/", async(req,res)=>{
    let {tel,password,vcode} = req.body
     let time=format(new Date())
     console.log("验证码=",req.session);
    if(req.session.vcode){
        if(vcode ==req.session.vcode){
            password = encode(password);      
            var sql = `INSERT INTO ${colName} VALUES (NULL,'${password}', NULL, '${tel}',0,'${time}',NULL,NULL,NULL,NULL,0);`
            try {
                let result = await query(sql);

                var sql2 = `select * from ${colName} where tel = '${tel}' and password = '${password}'`
            let result2 = await query(sql2);

                let userInfo = {}
                for(var i in result2[0]){
                    if(i!="role"&&i!="password"){
                        userInfo[i] = result2[0][i]
                    }
                }
             const authorization = createToken({tel:userInfo.tel})
             userInfo.authorization = authorization

                res.send(returnCode({code:200,data:result2,msg:"注册成功！"}))
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