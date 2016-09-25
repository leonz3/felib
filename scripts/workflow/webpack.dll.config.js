
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].dll.js',
        /**
         * output.library
         * 将会定义window.${output.library}
         */
        library: '[name]_library'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            path: path.join(PROJECT_PATH, './dist', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};
