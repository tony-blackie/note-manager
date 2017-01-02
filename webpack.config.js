var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: path.join(__dirname, 'src'),
    entry: {
        app: './app/app.js',
        about: './about/about.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,    // turn off default running inside the iframe
        stats: 'errors-only' //remove built assets from console output
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

        new htmlWebpackPlugin(
            {
                template: path.join(__dirname, 'src', 'index.html'),
                inject: 'body',
                hash: true,
                filename: 'about.html',
                chunks: ['about']
            }
        )
    ]
};