const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js'],
    },
    entry: {
        active: path.join(__dirname, './js/active.js'),
        map: path.join(__dirname, './js/map.js'),
    },
    module: {

    },
    plugins: [

    ],
    devServer: {
        historyApiFallback: true,
        publicPath: '/dist',
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
    },
};