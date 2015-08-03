'use strict';

module.exports = angular.module('greatestApp.catService')
    .controller('CatCtrl', function ($scope, CatService) {

        $scope.getCatUrl = angular.bind($scope, CatService.getCatUrl);

    })

;
