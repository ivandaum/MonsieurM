const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
    context: __dirname,
    entry: './assets/scripts/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js',
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=100000',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            sourceMap: false,
            filename: 'index.css',
        }),
    ],
}
