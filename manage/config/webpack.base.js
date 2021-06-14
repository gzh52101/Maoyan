const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    //入口文件
    entry:path.join(__dirname,"../src/index.js"),

    //路径别名
    resolve:{
        alias :{
            "@":path.join(__dirname,"../src")
        },
         //模块拓展名   
        extensions:['.js','.jsx']
    },


    module:{
        rules:[
            {
                //匹配js或者jsx文件
                test:/\.jsx?$/,
                use:[{
                    //在类里面使用箭头函数插件
                    loader:'babel-loader',
                    options:{
                        plugins:['@babel/plugin-proposal-class-properties'],
                        presets:['@babel/preset-react']
                    }
                }]
            },

            //匹配css
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            //匹配sass
            {
                test:/\.s[ca]ss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //
                loader: 'url-loader',
                options: {
                  limit: 10000,
                }
            }
        ]
    },

    plugins:[

        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../public/index.html')
        }),
    ]



}