
const path = require('path');
const webpack = require('webpack');

const INPUT_PATH = require(__dirname, './src');
const OUTPUT_PATH = require(__dirname, './dist');

module.exports = {
    watch: true,
    target: 'electron',             //can use require in electron
    devtool: 'cheap-source-map',
    entry: {
        index: path.join(INPUT_PATH, 'index.js')
    },
    output: {
        path: OUTPUT_PATH,
        filename: '[name].js',
        libraryTarget: "commonjs2"      //exports by `module.exports`
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', 'js', 'jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: INPUT_PATH,
                query: {
                    // presets: ['es2015', 'react']
                    presets: ['react']
                }
            }
        ]
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    ],
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    }
};
