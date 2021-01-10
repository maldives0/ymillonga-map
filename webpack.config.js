const webpack = require('webpack');
const path = require('path');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'eval' : 'hidden-source-map',
    resolve: {
        extensions: ['.js'],
    },
    entry: {
        active: [path.join(__dirname, './js/active.js')],
        map: [path.join(__dirname, './js/map.js')],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', {
                                modules: false,
                                targets: '> 0.25%, not dead',
                            }
                        ],

                    ],
                },
                exclude: ['/node_modules'],
            }
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
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