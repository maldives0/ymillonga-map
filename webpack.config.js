const webpack = require('webpack');
const path = require('path');
const prod = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'eval' : 'hidden-source-map',
    resolve: {
        extensions: ['.js'],
    },
    entry: {
        active: [path.join(__dirname, './js/active.js'), path.join(__dirname, './css/style.scss')],
        map: [path.join(__dirname, './js/map.js'), path.join(__dirname, './css/map.scss')],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/img',
                            publicPath: '/img',
                            emitFile: false
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
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