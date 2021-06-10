const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const colName = 'user'//查询的表名


router.get("/", async(req,res)=>{
    const {select} = req.query
    var sql = `select * from ${colName} where tel like '%${select}%'`
    let result = await query(sql)

    if(select){
        if(result.length>0){
            res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功"}))
        }else{
            sql = `select * from ${colName} where nickname like '%${select}%'`
            result = await query(sql)
            if(result.length>0){
                res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功"}))
            }else{
                res.send(returnCode({code:400,msg:"查无数据"}))
            }
        }
    }else{
        var sql2 = `select * from ${colName} `
        let result2 = await query(sql)
        res.send(returnCode({code:200,data:{total:result2.length,data:result2},msg:"查询成功"}))
    }
})

module.exports = router