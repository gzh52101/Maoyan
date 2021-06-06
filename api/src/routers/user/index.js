const express = require("express");
const router = express.Router();
const {returnCode,encode} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'user'//查询的表名

//查询用户列表
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


//添加用户
router.post("/",VerifyToken,async (req,res)=>{  
        let {user_name,password,time=null,role} = req.body
        if(user_name&&password){
            password = encode(password)
            var sql = `INSERT INTO ${colName} VALUES (NULL, '${user_name}', '${password}', NULL, NULL, NULL,${role},'${time}',NULL,NULL);`
            try {
                let result =await query(sql);
                res.send(returnCode({code:200,msg:"添加成功!"}))
            } catch (error) {
                console.log(error);   
            }
        }else{
            res.send(returnCode({code:400,msg:"账号或者密码不能为空"}))
        }
})



//删除用户接口
router.delete("/",VerifyToken,async(req,res)=>{
            const {user_id} = req.body
            var sql = `DELETE FROM ${colName} WHERE user_id = ${user_id}`
            try {
                let result =await query(sql);
                res.send(returnCode({code:200,msg:"删除成功!"}))
            } catch (error) {
                console.log(error);
                res.send(returnCode({code:400,msg:"删除失败"}))
            }     
})


//更改用户信息接口
router.put("/",VerifyToken,async(req,res)=>{
    const {user_id} = req.body

    console.log(user_id);
    
    var sql = `select * FROM ${colName} WHERE user_id = ${user_id}`
    let result =await query(sql);
    console.log(result);
    

    let {
        nickname=result[0].nickname
        ,tel=result[0].tel
        ,email=result[0].email
        ,role = result[0].role
        ,sex = result[0].sex
    } = req.body

    let {time,avatar,user_name,password} = result[0]
    password = password ? encode(password):result[0].password
    let sql2 = `UPDATE ${colName} SET user_name = '${user_name}',password='${password}',nickname='${nickname}',tel='${tel}',email='${email}',role=${role},time='${time}',avatar ='${avatar}',sex='${sex}' Where user_id =${user_id}`;

    try {
        let result2 = await query(sql2);
        res.send(returnCode({code:200,msg:"修改成功"}))
        
    } catch (error) {
        res.send(returnCode({code:400,msg:"修改失败"}))
    }

})


module.exports = router