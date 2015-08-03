'use strict';

module.exports = angular.module('greatestApp.catService')
    .factory('CatService', function (CONFIG) {
        var previousId;

        function getUniqueCatId () {
            var id;
            do {
                id = (Math.floor(Math.random()*1000) % 16) + 1;
            } while (id === previousId);
            previousId = id;
            return  id;
        }

        function constructCatUrl () {
            return CONFIG.api.cat + '?r=' + getUniqueCatId();
        }

        function getCatUrl () {
            if (this.url) {
                return this.url;
            }
            this.url = constructCatUrl();
            return this.url;
        }

        return {
            getCatUrl: getCatUrl
        };
    })

;
