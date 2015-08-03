'use strict';

describe('Directive: <cat></cat>', function () {
    var element, scope, $httpBackend,
        directiveHTML = '<cat></cat>';


    beforeEach(function () {

        // Load the directive's module
        // module('greatestApp.catService');
        angular.mock.module(require('./cat.module').name);

        // Provide any mocks needed
        angular.mock.module(function ($provide) {
            $provide.value('CONFIG', {
                api: {
                    cat: '/kitty/'
                }
            });
        });

        inject(function ($rootScope, $compile, _$httpBackend_) {
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            element = $compile(directiveHTML)(scope);
        });
    });


    it('should render valid template', function () {
        scope.$apply();

        expect(element[0].nodeType ).toEqual(1);
        expect(element[0].nodeName ).toEqual('IMG');
        expect(element[0].classList.contains('cat')).toBe(true);
        expect(element[0].alt).toBe('cat');
        expect(element[0].src).toMatch(/\/cat\/\?r=([1-9][1-9])|[0-9]$/);
    });

});
