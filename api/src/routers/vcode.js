const express = require('express');
const svgCaptcha = require('svg-captcha');
const {returnCode} = require('../utils/tools')

const router = express.Router();

router.get("/",(req,res)=>{
        // svg的设置
        let option = [{
            size:6, //验证码位数
            width:200,//svg宽度
            height:150,//svg高度
            background:"#f4f3f2", //干扰条数
            nois:2,
            fonSize:32,//验证码字体大小
            ignoreChars:'0Oli',//屏蔽掉比较容易混淆的字母
        },{dataType: 'json'}]

        let code = svgCaptcha.create(option);
        req.session.vcode = code.text.toLowerCase();
        console.log(req.session);
          
         res.send(returnCode({code:200,data:code.data}))
})

module.exports = router