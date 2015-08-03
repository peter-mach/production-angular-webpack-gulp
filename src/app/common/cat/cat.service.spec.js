'use strict';

describe('Service: CatService', function () {
    var CatService;


    beforeEach(function () {
        angular.mock.module( require('./cat.module').name );

        //providers
        angular.mock.module(function ($provide) {
            $provide.value('CONFIG', {
                api: {
                    cat: '/kitty/'
                }
            });
        });

        // dependencies
        inject(function (_CatService_) {
            CatService = _CatService_;
        });
    });


    it('should exist', function () {
        expect(!!CatService).toBe(true);
    });

    it('should provide cat API url', function () {
        expect(CatService.getCatUrl()).toMatch(/\/kitty\/\?r=([1-9][1-9])|[0-9]$/);
    });

    it('should not provide 2 same cat IDs in a row', function () {
        var previousValue;
        for (var i = 99; i >= 0; i--) {
            var catId = CatService.getCatUrl.call({}).match(/r=([1-9][1-9])|[0-9]$/);
            if (catId[1]) {
                expect(catId[1]).not.toEqual(previousValue);
            } else {
                expect(catId[0]).not.toEqual(previousValue);
            }

            previousValue = catId;
        }
    });

    it('should set ad url on th provided scope', function () {
        var scope = {};
        CatService.getCatUrl.call(scope);
        expect(scope.url).toMatch(/\/kitty\/\?r=([1-9][1-9])|[0-9]$/);
    });

});
