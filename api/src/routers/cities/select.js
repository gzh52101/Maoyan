const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'cities' //查询的表名


router.get("/",async(req,res)=>{

    const {select} =req.query
    console.log(select);
    
    var sql =`select * from ${colName} where nm like '%${select}%' `


    const result = await query(sql)
    console.log(result);
    
    if(result.length>0){
      res.send(returnCode({code:200,data:{total:result.length,data:result},msg:"查询成功！"}))  
    }else{
        res.send( returnCode({code:400,msg:"查无数据"})) 
    }


})


module.exports =router