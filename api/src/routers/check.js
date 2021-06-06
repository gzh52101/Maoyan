const express = require('express')
const router = express.Router()
const query = require("../db")
const {returnCode} = require("../utils/tools")
const colName = 'user'//查询的表名

router.get("/", async(req,res)=>{
    const {user_name} = req.query

    var sql = `select * from ${colName} where user_name = '${user_name}'`
    let result = await query(sql);

    if(result.length>0){
      res.send(returnCode({code:400,msg:'用户名已被注册'}))
    }else{
        res.send(returnCode({code:200,msg:'用户名可用'}))

    }

})

module.exports = router