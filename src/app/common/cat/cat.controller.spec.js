'use strict';


describe('Controller: CatCtrl', function () {
  var CatCtrl, scope, CatService;

    beforeEach(function () {
        // angular.mock.module('greatestApp.catService');
        angular.mock.module( require('./cat.module').name );

        angular.mock.module(function ($provide) {
            $provide.value('CatService', {
                    getCatUrl: function() {}
                });
        });

        inject(function ($rootScope, $controller, _CatService_) {
            scope = $rootScope.$new();
            CatService = _CatService_;

            // define spies
            spyOn(CatService, 'getCatUrl').and.returnValue('url');

            CatCtrl = $controller('CatCtrl', {
                $scope: scope,
                CatService: _CatService_
            });
        });

    });

    it('should exist', function () {
        expect(!!CatCtrl).toBe(true);
    });

    it('should call getCatUrl on CatService', function () {
        scope.getCatUrl();
        expect(CatService.getCatUrl.calls.count()).toBe(1);
        expect(CatService.getCatUrl.calls.all()).toEqual([{object:scope, args:[], returnValue: 'url'}]);
    });
});
