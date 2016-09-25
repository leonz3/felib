
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');   //package css
const HtmlWebpackPlugin = require('html-webpack-plugin');           //create html

module.exports = {
    watch: true,            //watch file
    profile: true,
    cache: true,
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'css', 'scss', 'html'],
        alias: {
            '$': 'jquery'
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
        }, {
            test: /\.less/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=20000&name=[name].[ext]'
        }]
    },
    plugins: [

        //设置抽取的css文件名
        new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
            disable: false,
            allChunks: true
        }),

        //生成html
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/templates/index.html',
            hash: true,
        }),

        //在js中不用引入常用模块，直接使用配置的变量，wepbakc自动引入
        new webpack.ProvidePlugin({
            Moment: 'moment',
            $: "jquery"
        }),

        //提取公共公共模块，包括css和js
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),

        //模块热替换
        new webpack.HotModuleReplacementPlugin(),

        //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack.NoErrorsPlugin(),

        //定义环境变量，js中就能使用 process.env.NODE_ENV
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'development'
            }
        })),

        //js压缩
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$', 'exports', 'require']       //防止变量被改变
            }
        }),
        
        //删除重复依赖
        new webpack.optimize.DedupePlugin()
    ],

    //表明从外部导入，不打包
    externals: {
        react: 'react'
    },

    //postcss settings
    postcss: [
        require('autoprefixer')({
            browers: ['last 2 versions', 'ie >= 9', '> 5% in CN'] 
        }),
        require('postcss-flexibility'),
        require('postcss-will-change'),
        require('postcss-color-rgba-fallback'),
        require('postcss-opacity'),
        require('postcss-pseudoelements'),
        require('postcss-sorting'),
        require('cssnano')({
            // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
            autoprefixer: false, 
            reduceIdents: false,
            zindex: false,
            discardUnused: false,
            mergeIdents: false
        })
    ]
};