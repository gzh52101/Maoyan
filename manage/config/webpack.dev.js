const path = require("path")
const base = require("./webpack.base")

module.exports = {
    ...base,
    mode:"development",
    devServer:{
        static:path.join(__dirname,"../public"),
        // proxy:{
        //     '/api':{
        //         target: 'http://10.3.136.249:5555', 
        //         changeOrigin: true,
        //         pathRewrite:{   
        //             '^/api':'/api'
        //         }
        //     }
        // }    
    },
}