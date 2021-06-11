const express = require("express");
const router = express.Router();
const {returnCode} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'user'//查询的表名
const {
    uploadMiddleware
} = require('../../utils/upload')


router.put("/",[VerifyToken,uploadMiddleware.single("avatar")], async(req,res)=>{
        const {user_id} = req.body
         
        const avatar = req.file.pathname 

        var sql =`UPDATE ${colName} SET avatar = '${avatar}' WHERE user_id = '${user_id}'`


        try {
            const result = await query(sql)
            res.send(returnCode({code:200,data:{avatar},msg:"修改成功"}))
        } catch (error) {
            console.log(error);
            
        }



})

module.exports = router