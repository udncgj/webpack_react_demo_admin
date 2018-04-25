const path = require("path");
// const uglify = require('uglifyjs-webpack-plugin');//JS压缩插件，简称uglify
const htmlPlugin = require('html-webpack-plugin');
//css和js分离，虽然webpack官方不建议如此
//react使用存在问题
const extractTextPlugin = require("extract-text-webpack-plugin");
if(process.env.NODE_ENV == "dev"){
    var website={
        // publicPath:"http://192.168.43.225:1717/"
        publicPath:"http://localhost:1718/"
    }
}else{
    var website={
        publicPath:"http://cdn.jspang.com/"
    }
}
//消除未使用的CSS,需要配合extract-text-webpack-plugin使用
// const glob = require('glob');
//react使用存在问题
const PurifyCSSPlugin = require("purifycss-webpack");
//打包第三方类库，直接js里面import，或。。。
const webpack = require('webpack');
//静态资源打包
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
    //入口文件的配置项
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    // entry:  __dirname + "./src/entry.js",
    entry:{
        //里面的entery是可以随便写的
        // entry:'./src/entry.js',
        index:'./src/index.js',
        //这里我们又引入了一个入口文件
        //entry2:'./src/entry2.js'
        //抽离第三方类库步骤2(打包)
        // jquery:'jquery',
    },
    //出口文件的配置项
    output:{
        //打包的路径文职
        path:path.resolve(__dirname,'dist'),
        //打包的文件名称
        filename:'[name].js',//'[name].js'多出口设置，打包成相同的名称
        //css和js分离,处理图片路径问题
        publicPath:website.publicPath
    },
    resolve: {//指定可以被import的文件名后缀  
        extensions: ['.js', '.jsx','.less','.ts','.css']  
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules:[
            // {
            //     test:/\.css$/,
            //     // use:['style-loader','css-loader']//原配置
            //     //css和js分离
            //     use: extractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ["css-loader","autoprefixer-loader"]
            //     })
            // },
            {
                test: /\.(less|css)$/,
                // use:['style-loader','css-loader','less-loader']
                //autoprefixer-loader浏览器兼容，添加前缀
                //less分离
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","autoprefixer-loader","less-loader"]
                })
            },{
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env', 'react']
                    }
                },
                exclude:/node_modules/
            },{
                test:/\.(png|jpg|gif)/,
                use:[{loader:'url-loader', options:{limit:500000, outputPath:'img'}
                }]
            },{
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        // new uglify(),
        new htmlPlugin({
            minify:{//是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
                removeAttributeQuotes:true
            },
            hash:true,//为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html'//是要打包的html模版路径和文件名称
        }),
        new extractTextPlugin("main.css"),
        //消除未使用的CSS,需要配合extract-text-webpack-plugin使用,放在extractTextPlugin后
        //react使用存在问题
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'src/*.html')),
        // }),
        //打包第三方类库，直接js里面import，或。。。
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
        //静态资源打包
        new copyWebpackPlugin([{
            from: __dirname+'/src/img',
            to:'./img'
        }]),
        //抽离第三方类库步骤2(打包)jquery:'jquery',
        // new webpack.optimize.CommonsChunkPlugin({
        //     //name对应入口文件中的名字，我们起的是jQuery
        //     name:['jquery'],
        //     //把文件打包到哪里，是一个路径
        //     filename:"vendor/js/[name].js",
        //     //最小打包的文件模块数，这里直接写2就好
        //     minChunks:2
        // }),
        //Webpack生产版本(react有效)
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin(),
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        // host:'192.168.43.225',
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1718,
        historyApiFallback: {
            disableDotRule: true,
        },
        proxy: {
            '/api/': {
              target: 'http://localhost:8080/jnshuProject/',
              pathRewrite: {'^/api/' : ''},
              changeOrigin: true
            },
            '/dvaApi/': {
              target: 'http://jsonplaceholder.typicode.com/',
              pathRewrite: {'^/dvaApi/' : ''},
              changeOrigin: true
            }
        },
    },
    //监控代码改动，自动打包(打包)
    // watch: true, // boolean
    // 启用观察
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 1000, // in ms
    //     // 将多个更改聚合到单个重构建(rebuild)
    //     poll: 500, // 间隔单位 ms
    //     // 启用轮询观察模式
    //     // 必须用在不通知更改的文件系统中
    //     // 即 nfs shares（译者注：Network FileSystem，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
    // },
}