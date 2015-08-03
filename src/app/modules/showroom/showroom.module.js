'use strict';

module.exports = angular.module('greatestApp.showroom', [
        'greatestApp.catService',
    ])
.config(function ($stateProvider) {

    $stateProvider
        .state('showroom', {
            url: '/showroom',
            templateUrl: 'showroom.html',
            controller: 'ShowroomCtrl'
        });

});

//dependencies
//module requirements
require('./showroom.controller');
require('./showroom.html');
require('./showroom.less');
