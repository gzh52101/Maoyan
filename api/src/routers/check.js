const express = require('express')
const router = express.Router()
const query = require("../db")
const {returnCode} = require("../utils/tools")
const colName = 'user'//查询的表名

router.get("/", async(req,res)=>{
    const {tel} = req.query

    var sql = `select * from ${colName} where tel = '${tel}'`
    let result = await query(sql);

    if(result.length>0){
      res.send(returnCode({code:400,msg:'手机号已被注册'}))
    }else{
        res.send(returnCode({code:200,msg:'手机号可用'}))

    }

})

module.exports = router