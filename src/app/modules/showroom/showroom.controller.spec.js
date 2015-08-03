'use strict';

describe('Controller: ShowroomCtrl', function(){
    var ShowroomCtrl;

    beforeEach(function () {
        require('bower/angular-ui-router/release/angular-ui-router');
        angular.mock.module('ui.router');

        angular.mock.module(require('./showroom.module').name );

        inject(function($rootScope, $controller) {
            ShowroomCtrl = $controller('ShowroomCtrl', {});
        });
    });

    it('should exist', function () {
        expect(!!ShowroomCtrl).toBe(true);
    });

});
