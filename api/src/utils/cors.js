const allowOrigin = 'http://localhost:2101,http://localhost:8080'.split(',');

module.exports = function(req,res,next){
    const currentOrigin = req.get('Origin');
    if(allowOrigin.includes(currentOrigin)){
   
        res.set({
            "Access-Control-Allow-Origin": currentOrigin,
            // "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,yourHeaderFeild,Token"
        })

        // 处理预请求
        if(req.method=="OPTIONS") {
            res.sendStatus(200);/*让options请求快速返回*/
        } else{
            next();
        }
    }else{
        next();
    }
}