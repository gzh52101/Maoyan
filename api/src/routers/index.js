const express = require("express");
const session =require('express-session');
const router = express.Router();
const corsRouter = require("../utils/cors");
const regRouter = require("./reg");
const vcodeRouter = require("./vcode");
const loginRouter = require("./login");
const verifyTokenRouter = require("./verifyToken");
const checkRouter = require("./check");
const userRouter = require("./user");
const roleLoginRouter = require("./roleLogin");
const movieRouter = require("./movie");
const cityRouter = require("./cities");
const userSelectRouter = require("./user/select");
const movieSelectRouter = require("./movie/select");
const citySelectRouter = require("./cities/select");
const wishRouter = require("./wish");
const upAvatarRouter = require("./user/up_avatar");

router.use(session({
    secret: '12345',//通过设置的secret字符串，来计算hash值并放在cookie中，使产生的signedCookie防篡改
    cookie: {maxAge: 1000*60*15}, //设置过期时间为15分钟
    resave:false, //即使session没有被修改，也保存session值，默认为true
    saveUninitialized: true,//强制未初始化的session保存到数据库
}))
router.use( 
    express.urlencoded({extended:true}),
    express.json(),
    express.raw(),
);

router.use(corsRouter); //用cors处理跨域


router.use("/vcode",vcodeRouter);
router.use("/reg",regRouter);
router.use("/login",loginRouter);
router.use("/verifyToken",verifyTokenRouter);
router.use("/check",checkRouter);
router.use("/user",userRouter);
router.use("/roleLogin",roleLoginRouter);
router.use("/movie",movieRouter);
router.use("/city",cityRouter);
router.use("/userSelect",userSelectRouter);
router.use("/movieSelect",movieSelectRouter);
router.use("/citySelect",citySelectRouter);
router.use("/wish",wishRouter);
router.use("/upAvatar",upAvatarRouter);

module.exports = router;