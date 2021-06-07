const path = require('path')
const base = require('./webpack.base')
module.exports ={
    ...base,
    mode:'development',
    devServer:{
        static:path.join(__dirname,'../public'),

    }
}