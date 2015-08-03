'use strict';

module.exports = angular.module('greatestApp.catService')
    .directive('cat', function() {
        return {
            controller: 'CatCtrl',
            scope: {},
            restrict: 'E',
            template: '<img class="cat" ng-src="{{getCatUrl()}}" alt="cat"/>',
            replace: true
        };
    })

;
