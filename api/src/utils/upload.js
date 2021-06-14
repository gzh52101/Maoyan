const multer = require('multer');
const path = require('path');
const fs = require('fs');

//电影封面图片上传
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = `../public/static/${file.fieldname}`
        // 如路径不存在,则自动创建
        try{
            fs.accessSync(uploadPath)
        }catch(err){
            
            fs.mkdirSync(uploadPath,{
                recursive:true
            })
        }

        cb(null, uploadPath);
    },
    // 格式化文件名
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
// 设置文件保存目录
let uploadMiddleware = multer({
    storage,
    
    fileFilter(req, file, cb){  
        let ext = path.extname(file.originalname);
        const allow = ['.png','.gif','.jpg'].includes(ext);
        cb(null,allow)
    },
    limits:{
        fileSize:1024*1024*5
    }
});

module.exports = {
    uploadMiddleware,
}