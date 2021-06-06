const express = require("express");
const app = express();
const {Port} =require("./config");
const path = require("path");
const allRouter = require("./routers");


app.use(express.static(path.join(__dirname,"../public")))
app.use("/api",allRouter);

app.listen(Port,()=>{
    console.log(`sever run at port ${Port}`);
})