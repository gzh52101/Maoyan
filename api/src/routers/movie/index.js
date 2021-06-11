const express = require("express");
const router = express.Router();
const {
    returnCode,
    random_scalecolor
} = require("../../utils/tools");
const query = require("../../db")
const VerifyToken = require("../../middleware/token");
const colName = 'movie' //查询的表名
const {
    uploadMiddleware
} = require('../../utils/upload')


router.get("/", async (req, res) => {
    let {
        page = 1, size = 10, isHot = false, isOn = false, cat = "",
    } = req.query
    startIndex = (page - 1) * size
    let result2
    let sql2
    let total
    let sql1
    let result

    if (Boolean(isHot) || Boolean(isOn)) {
        isHot = Boolean(isHot) ? 1 : 0
        isOn = Boolean(isOn) ? 1 : 0


        //先查询一共有多少条数据 赋值个total返回前端
        sql1 = `select * from ${colName} WHERE isHot='${isHot}' AND isOn='${isOn}'`
        result = await query(sql1);
        sql2 = `select id,img,nm,pubDesc,wish,dir,cat from ${colName} WHERE isHot='${isHot}' AND isOn='${isOn}' limit ${startIndex},${size}`
        total = result.length
        result2 = await query(sql2);

        console.log(result.length);
        // console.log(result2);

    } else {
        //先查询一共有多少条数据 赋值个total返回前端
        if (cat) {
            console.log(cat);
            sql1 = `select * from ${colName} Where cat like '%${cat}%'`
            result = await query(sql1);

            total = result.length

            sql2 = `select id,img,nm,pubDesc,wish,dir,cat,isHot,isOn from ${colName} Where cat like '%${cat}%' limit ${startIndex},${size}`
            result2 = await query(sql2);
            console.log(result2);
        } else {
            console.log(2);
            sql1 = `select * from ${colName}`
            result = await query(sql1);
            total = result.length
            sql2 = `select id,img,nm,pubDesc,wish,dir,cat,isHot,isOn from ${colName} limit ${startIndex},${size}`
            result2 = await query(sql2);
        }
    }

    res.send(returnCode({
        code: 200,
        data: {
            total,
            data: result2
        }
    }))
})

router.delete("/", VerifyToken, async (req, res) => {
    const {
        id
    } = req.query
    var sql = `DELETE FROM ${colName} WHERE id = ${id}`
    try {
        let result = await query(sql);
        res.send(returnCode({
            code: 200,
            msg: "删除成功!"
        }))
    } catch (error) {
        console.log(error);
        res.send(returnCode({
            code: 400,
            msg: "删除失败"
        }))
    }
})


router.put("/", VerifyToken, async (req, res) => {
    const {
        id
    } = req.body

    var sql = `select * from ${colName} where id = '${id}'`

    const result = await query(sql);

    let {
        nm = result[0].nm,
            enm = result[0].enm,
            star = result[0].star,
            cat = result[0].cat,
            dir = result[0].dir,
            pubDesc = result[0].pubDesc,
            dur = result[0].dur,
            scoreLabel = result[0].scoreLabel,
            sc = result[0].sc,
            dra = result[0].dra,
            img = result[0].img,
            wish = result[0].wish,
            watched = result[0].watched,
            backgroundColor = result[0].backgroundColor,
            isHot = result[0].isHot,
            isOn = result[0].isOn,
            price = result[0].price,
    } = req.body

    const photos = result[0].photos

    let sql2 = `UPDATE ${colName} SET nm='${nm}',enm='${enm}',cat='${cat}',star ='${star}',dir='${dir}',pubDesc='${pubDesc}',dur='${dur}',scoreLabel='${scoreLabel}',sc='${sc}',dra='${dra}',img='${img}',wish='${wish}',watched='${watched}',photos='${photos}',backgroundColor='${backgroundColor}',isHot='${isHot}',isOn='${isOn}',price='${price}' Where id =${id}`;

    try {
        const result2 = query(sql2)
        res.send(returnCode({
            code: 200,
            msg: "修改成功！"
        }))
    } catch (error) {
        // res.send(returnCode({code:200,msg:"修改成功！"}))
        console.log(error);

    }

})



router.post("/", [VerifyToken, uploadMiddleware.array('photos')], async (req, res) => {
    let {
        cat,
        dir,
        dra,
        dur,
        enm,
        isHot,
        isOn,
        money,
        nm,
        pubDesc,
        star
    } = req.body
    let imgs = req.files.map(item => item.filename)
    console.log(imgs);
    const img = imgs[0]
    var photos = imgs.filter((item, index) => {
        return index != 0
    })
    photos = photos.join(",")
    var sc = (Math.random() * ((10 - 4) + 1) + 4).toFixed(1)
    var wish = parseInt(Math.random() * ((30 - 10) + 1) + 10)
    var watched = parseInt(Math.random() * ((60000 - 10000) + 1) + 10000)
    var backgroundColor  = random_scalecolor();
    var sql = `INSERT INTO ${colName} VALUES (NULL,'${nm}','${enm}','${cat}','${star}','${dir}','${pubDesc}','${dur}','猫眼综合评分','${sc}','${dra}','${img}','${wish}','${watched}','${photos}','${backgroundColor}','${isHot}','${isOn}','${money}');`
    try {
        let result = await query(sql);
        res.send(returnCode({
            code: 200,
            msg: "添加成功!"
        }))
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;