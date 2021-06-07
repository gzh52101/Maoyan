const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'wish'//查询的表名


router.get("/", async (req,res)=>{
    const {user_id} = req.query

    var  sql3 = `SELECT id,nm,star,img,pubDesc,scoreLabel,sc FROM movie WHERE id in (SELECT id FROM wish WHERE user_id = '${user_id}')`;

    const result2 = await query(sql3);
    res.send(returnCode({code:200,data:result2,msg:"查询成功"}))

})

router.delete("/",VerifyToken,async(req,res)=>{
    const {user_id,id} = req.query

    var sql = `DELETE FROM ${colName} WHERE id = ${id} AND user_id = ${user_id}`
    try {
        let result =await query(sql);
        res.send(returnCode({code:200,msg:"删除成功!"}))
    } catch (error) {
        console.log(error);
        res.send(returnCode({code:400,msg:"删除失败"}))
    } 

})
router.post("/",VerifyToken, async(req,res)=>{
    const {user_id,id} = req.body
    var sql = `INSERT INTO ${colName} VALUES ('${user_id}','${id}')`

    
    try {
        const result = await query(sql);
        res.send(returnCode({code:200,msg:"添加成功！"}))
    } catch (error) {
        console.log(error);
        
    }
    
})

module.exports = router;