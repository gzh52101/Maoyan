const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    resolve: {
        // 路径别名
        alias: {
            '@': path.join(__dirname, '../src')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['@babel/plugin-proposal-decorators', {legacy: true }],
                        ['@babel/plugin-proposal-class-properties',{loose:true}]
                    ],
                    presets: ['@babel/preset-react']}

        }],
        exclude: path.join(__dirname, '../node_modules')
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },{
        test: /\.s[ca]ss$/,
        use: ['style-loader', 'css-loader','sass-loader']
    },{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //
        loader: 'url-loader',
         options: {
         limit: 10000,
         }
         }
        ]},
        plugins:[
            new HtmlWebpackPlugin({
                template:path.join(__dirname,'../public/index.html')
            })
        ]

}