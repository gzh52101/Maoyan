const mysql = require('mysql')


var pool = mysql.createPool({
    port:3307,
    host:"localhost",
    user:'root',
    password:"admin",
    database:'lemon',
    multipleStatements: true,
})

//用promise封装sql查询语句
module.exports = function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,result,fields)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}