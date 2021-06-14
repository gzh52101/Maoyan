const express = require('express')
const router = express.Router()
const query = require("../db")
const {returnCode,encode} = require('../utils/tools')
const colName = 'user'//查询的表名
const {createToken} = require('../utils/token')

router.post("/", async(req,res)=>{
    console.log(req.body);
    let {tel,password,vcode} = req.body
    console.log(req.session);

    if(!req.session.vcode){
        res.send(401,returnCode({code:401,msg:"验证码过期"}))
    }else{
        
        if(vcode === req.session.vcode){
            password = encode(password)
            var sql = `select * from ${colName} where tel = '${tel}' and password = '${password}'`
            let result = await query(sql);
            if(result.length>0){
                // console.log(result);
                    if(result[0].role){
                        let userInfo = {}
                        for(var i in result[0]){
                            if(i!="role"&&i!="password"){
                                userInfo[i] = result[0][i]
                            }
                        }
                     const authorization =  createToken({tel:userInfo.tel})
                     userInfo.authorization = authorization
                        res.send(returnCode({code:200,data:userInfo,msg:"登录成功"}))
                    }else{
                        res.send(returnCode({code:400,msg:"此账号不是管理员，登录失败"}))
                    }
            }else{
                res.send(returnCode({code:400,msg:"账号密码错误"}))
            }
        }else{
            res.send(returnCode({code:401,msg:"验证码错误"}))
        }
    }
})

module.exports= router;