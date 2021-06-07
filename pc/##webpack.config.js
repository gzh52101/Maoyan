const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports={
    mode:'development',
    // 入口文件
    entry:'./src/index.js',

    // 出口文件
    output:{
        path:path.join(__dirname,'./dist'),
    },
    // 开发服务器
    devServer:{
        static:path.join(__dirname,'./public'),
        // proxy:{}
    },
    // 加载器
    module:{
        rules:[{
            // 编译jsx的加载器
            test:/\.js$/,
            use:[{
                loader:'babel-loader',
                options:{
                    // babel插件
                    plugins:[
                        '@babel/plugin-proposal-class-properties'
                    ],
                    presets:['@babel/preset-react'],//插件集
                }
            }]
        },
        // css和sass的加载器
        // {
        //     test:/\.css$/,
        //     use:['style-loader','css-loader']
        // },
        // {
        //     test:/\.s[ac]ss$/,
        //     use:['style-loader','css-loader','sass-loader']
        // }
    ]
    },
    // webpack插件  
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/template.html'
        })
    ]
}