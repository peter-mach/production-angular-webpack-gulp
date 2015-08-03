var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var appRoot           = path.join(__dirname, '/src');
var bowerRoot         = path.join(__dirname, '/bower_components');

module.exports = {
    cache: true,
    debug: true,
    singleRun: true,

    // The entry point
    entry: [
        path.join(appRoot, '/app/app.js')
    ],

    output: {
        path: path.join(__dirname, './static'),
        publicPath: './',
        filename: '[hash].bundle.js',
        chunkFilename: '[chunkhash].js'
    },


    module: {
        loaders: [
            {
                test: /\.less$/, loader: 'style!css!less'
            },
            {
                // require raw html for partials
                test: /\.html$/, loader: 'ng-cache'
            },
            {
                test: /\.json$/, loader: 'json'
            }
        ],

        // don't parse some dependencies to speed up build.
        noParse: [
            path.join(bowerRoot, '/angular-ui-router'),
            path.join(bowerRoot, '/angular-mocks'),
            path.join(bowerRoot, '/angular')
        ],
    },

    resolve: {
        alias: {
            bower: bowerRoot
        },

        extensions: [
            '',
            '.js',
            '.less',
            '.css'
        ],

        root: [appRoot],
    },


    plugins: [
        // bower.json resolving
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ], ['normal', 'loader']),

        // disable dynamic requires
        new webpack.ContextReplacementPlugin(/.*$/, /a^/),

        new webpack.ProvidePlugin({
            'angular': 'exports?window.angular!bower/angular'
        }),

        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),

    ],

};
