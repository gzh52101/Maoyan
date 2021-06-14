const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const colName = 'movie'//查询的表名

router.get("/", async(req,res)=>{
    const {select,user_id=null,page=1,size=10} = req.query
    startIndex = (page-1)*size      
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
                // console.log(id);
                
                sql = `select * from ${colName} where id = '${select}' `
                result = await query(sql)   
                if(user_id){
                    var wishsql = `SELECT id FROM wish WHERE  user_id = ${user_id}`
                    const result3 = await query(wishsql);
                    var arr = []
                    result3.forEach(item => {
                        arr.push(item.id);
                    })
                    result.forEach(item => {
                        if (arr.includes(item.id)) {
                            item.iswish = true
                        } else {
                            item.iswish = false
                        }
                    })
                }
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

        sql = `select * from ${colName}`

        result = await query(sql)

        var sql2 = `select * from ${colName}  limit ${startIndex},${size}`
      var  result2 = await query(sql2)
        res.send(returnCode({code:200,data:{total:result.length,data:result2},msg:"查询成功"}))
    }
})

module.exports = router