
const path = require('path');
const base = require('./webpack.base');
module.exports = {
    ...base,
    mode:'development',
    devServer:{
        // contentBase:path.join(__dirname,'./public'),
        static:path.join(__dirname,'../public'),
        // proxy:{
        //     '/api':{
        //         target: 'http://120.76.247.5:2002', 
        //         changeOrigin: true,
        //     }
        // }
    },
}