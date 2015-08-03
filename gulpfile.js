// Gulp plugins
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var gutil        = require('gulp-util');

// Misc
var path   = require('path');
var spawn  = require('child_process').spawn;
var argv   = require('minimist')(process.argv.slice(2));
var rimraf = require('rimraf');

// Webpack
var webpack          = require('webpack');
var webpackConfig    = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// Karma
var karma       = require('karma');
var karmaServer = karma.server;

// Ports
var ports = {
    livereload: 35730,
    dev: 5000
};

// Paths
var paths = {
    other: [
        'src/assets/**',
        'src/favicon.ico',
    ],
    distDir: './static/'
};


// Webpack config -- PRODUCTION
if (argv.production) { // --production option taken out from minimist
    webpackConfig.plugins = webpackConfig.plugins.concat(
        new ngAnnotatePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.devtool = false;
    webpackConfig.debug = false;
}

var prodConfig = Object.create(webpackConfig);
prodConfig.plugins = webpackConfig.plugins.concat(
    new webpack.DefinePlugin({
        'process-env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.DedupePlugin()
);

gulp.task('webpack:build', function (done) {
    webpack(prodConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));

        done();
    });
});



// Webpack config -- DEVELOPMENT
var webpackDevConfig = Object.create(webpackConfig);
webpackDevConfig.devtool = 'cheap-module-eval-source-map';
webpackDevConfig.debug = true;

gulp.task('webpack-dev-server', function (cb) {
    new WebpackDevServer(webpack(webpackDevConfig), {
        contentBase: './static/',
        quiet: false,
        noInfo: false,
        lazy: false,
        watchDelay: 300,
        // proxy for API calls
        proxy: {
            '/kitty/*': 'http://localhost:8000',
        },
        stats: {
            colors: true
        }
    }).listen(ports.dev, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://localhost:' + ports.dev);
    });

});

// gulp watch, watch for changes
gulp.task('watch', ['clearTarget', 'other'], function () {
    webpack(webpackDevConfig)
        .watch(200, function (err, stats) {
            if (err) {
                throw new gutil.PluginError('webpack', err);
            }

            gutil.log('[webpack]', stats.toString({
                colors: true
            }));
        });

    gulp.watch(paths.other, ['other']);
});


// clears dist directory
gulp.task('clearTarget', function () {
    rimraf.sync(paths.distDir, {}, gutil.log);
//    rimraf(paths.distDir, gutil.log);
});

// gulp other, moves changed files from source to static
gulp.task('other', function () {
    gulp.src(paths.other)
        .pipe(changed(paths.distDir))
        .pipe(gulp.dest(function(file) {
//            return proper location
            return  path.join(paths.distDir, path.dirname(file.path).replace(path.join(__dirname, '/src'), '') );
        }));
});

//TEST tasks

// gulp test:unit, runs unit test suite
gulp.task('test:unit', function () {
    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
});

//TASKS

// gulp test, runs full test suite
gulp.task('test', ['test:unit']);


// gulp serve, launches webpack-dev-server and watches
gulp.task('serve', [ 'clearTarget', 'other', 'webpack-dev-server']);

// gulp build:dev build the project and watches
gulp.task('build:dev', [ 'clearTarget', 'other', 'watch']);

// gulp build, runs build
gulp.task('build', [ 'clearTarget', 'other', 'webpack:build'  ]);

// gulp, default gulp behavior (build)
gulp.task('default', ['build']);
