const path = require('path');
const prod = process.env.NODE_ENV === 'production';
module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'eval' : 'hidden-source-map',
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