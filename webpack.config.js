var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var eslint = require('eslint');

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, 'src'),
    entry: {
        app: './app/routes.tsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/, 
                loader: 'ts-loader'
            },
            {
                test: /\.jsx$|\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'css!sass'
                )
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,    // turn off default running inside the iframe
        stats: 'errors-only' //remove built assets from console output
    },
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    plugins: [
        new htmlWebpackPlugin(
            {
                template: path.join(__dirname, 'src', 'index.html'),
                inject: 'body', //this is default, but can be injected elsewhere
                hash: true, //add random hash to every bundle on rebuild
                filename: 'index.html',
                chunks: ['app']
            }
        ),
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]
};
