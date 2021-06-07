const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'cities' //查询的表名



router.get("/",async (req,res)=>{
    const {page=1,size=10} = req.query
    startIndex = (page-1)*size               
    //先查询一共有多少条数据 赋值个total返回前端
    var sql1 = `select * from ${colName}`
    let result = await query(sql1);
    const total = result.length

    var sql2 = `select * from ${colName} limit ${startIndex},${size}`
    let result2 = await query(sql2);
        res.send(returnCode({code:200,data:{total,data:result2}}))
})
router.post("/",VerifyToken,async (req,res)=>{
        const {nm,py} = req.body
        var sql = `INSERT INTO ${colName} VALUES (NULL,"${nm}","${py}")`
        try {
            const result = query(sql)
            res.send(returnCode({code:200,msg:"添加成功!"}))
        } catch (error) {
            console.log(error);
        }
})

router.delete("/",VerifyToken,async(req,res)=>{
    const {id} =req.query
    var sql = `DELETE FROM ${colName} WHERE id = ${id}`
    try {
        let result =await query(sql);
        res.send(returnCode({code:200,msg:"删除成功!"}))
    } catch (error) {
        console.log(error);
        res.send(returnCode({code:400,msg:"删除失败"}))
    }  
})


module.exports = router;