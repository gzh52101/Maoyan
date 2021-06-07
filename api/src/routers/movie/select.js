const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const colName = 'movie'//查询的表名

router.get("/", async(req,res)=>{
    const {select} = req.query

    var sql = `select * from ${colName} where nm like '%${select}%' `
    let result = await query(sql)
    if(select){
        if(result.length>0){
            result= result.map(item => {
                item.photos = item.photos.split(",")
                item.cat =item.cat.split(",")
                item.star =item.star.split(",")
                return item
            }) 
            res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功"}))
        }else{
            sql = `select * from ${colName} where cat like '%${select}%' `
            result = await query(sql)
            if(result.length>0){
                result = result.map(item => {
                    item.photos = item.photos.split(",")
                    item.cat =item.cat.split(",")
                    item.star =item.star.split(",")
                    return item
                })

                res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功"}))
            }else{
                sql = `select * from ${colName} where id = '${select}' `
                result = await query(sql)

                if(result.length>0){
                    result = result.map(item => {
                        item.photos = item.photos.split(",")
                        item.cat =item.cat.split(",")
                        item.star =item.star.split(",")
                        return item
                    })
                    res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功"}))
                }else{
                    res.send(returnCode({code:400,msg:"查无数据"}))
                }
            }
        }
    }else{
        res.send(returnCode({code:400,msg:"查询条件不能为空"}))
    }
})

module.exports = router