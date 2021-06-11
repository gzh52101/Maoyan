
const path = require('path');
const base = require('./webpack.base');
module.exports = {
    ...base,
    mode:'development',
    devServer:{
        // contentBase:path.join(__dirname,'./public'),
        static:path.join(__dirname,'../public'),
        proxy:{
            '/api':{
                target: 'http://159.75.52.223:5555', 
                // target: 'http://192.168.1.104:5555', 
                changeOrigin: true,
            }
        }
    },
}