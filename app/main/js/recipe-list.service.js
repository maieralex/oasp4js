/*jshint -W083 */
angular.module('app.main')
    .factory('recipeList', function (recipeListRestService) {
    'use strict';
    return {
        loadRecipe: function (recipeId) {
            return recipeListRestService.getRecipe(recipeId).then(function (response) {
                return response.data;
            });
        },
        loadRecipeList : function (listLength) {
            var returnArray = [];
            for (var i=0; i < (listLength); i++) {
                recipeListRestService.getRecipe(i).then(function(response) {
                    //dreckiger fallback auf eine fixe URL, sollte imageId null sein.

                    if (response.data.imageId === null) {
                        response.data.imageId = 'http://files.schwedenmut.de/fallback.jpg';
                    }
                    returnArray.push(response.data);
                    console.log(response.data);
                });
            }
            return returnArray;
        }
    };
})
    .factory('sessionInjector', function($q, oaspUnauthenticatedRequestResender) {
        'use strict';
        return {
            responseError: function (response) {
                var originalRequest;
                console.log(response.status);
                if (response.status === 403) {
                    console.log(response.config);
                    originalRequest = response.config;
                    return oaspUnauthenticatedRequestResender.addRequest(originalRequest);
                } else {
                    return $q.reject(response);
                }
            }
        };
    });
