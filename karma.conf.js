var fullWebpackConfig, webpack, webpackConfig;

webpack = require('webpack');

fullWebpackConfig = require('./webpack.config.js');

webpackConfig = {
    module: fullWebpackConfig.module,
    resolve: fullWebpackConfig.resolve,
    plugins: [
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])], ["normal", "loader"]), new webpack.ContextReplacementPlugin(/.*$/, /a^/), new webpack.ProvidePlugin({
            // 'angular': 'exports?window.angular!bower/angular'
        })
    ],
    devtool: 'eval',
    cache: true
};

module.exports = function(config) {
    return config.set({
        basePath: __dirname,
        frameworks: ['jasmine'],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.spec.js'
        ],
        exclude: [],
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher')
        ],
        preprocessors: {
            'src/**/*.spec.js': ['webpack']
        },
        webpack: webpackConfig,
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};

