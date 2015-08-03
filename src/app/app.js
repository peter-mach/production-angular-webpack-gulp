'use strict';

// vendor
require('bower/angular-ui-router/release/angular-ui-router');

//app modules
require('./common/cat/cat.module');
require('./modules/showroom/showroom.module');

// app assets
require('./app.less');

// main module config
module.exports = angular.module('greatestApp', [
        // 'ui.router',
        'ui.router',

        //common,
        'greatestApp.catService',

        // modules
        'greatestApp.showroom'
    ])

    .constant('CONFIG', {
        api: {
            cat: '/kitty/'
        }
    })

    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/showroom');
    })

    .run(function($log){
        $log.info('Nice to meet you :)\nHope you\'ll find what you\'re looking for.\n\nBest,\nPiotr'); /*jshint ignore:line */
    })
;
