angular.module('app.main').factory('recipeListRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/recipemanagement/v1';

    return {
        getRecipe: function (id) {
            return $http.get(servicePath + '/recipe/' + id);
        },
        getRecipePictureBytes: function(id) {
            return $http.get(servicePath + '/recipe/' + id + '/pictureBytes', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        },
        getRandomRecipes: function (numberOfEntities) {
            var recipeSearchRandomCriteria = {
                pagination: {
                    size: numberOfEntities,
                    page: 1,
                    total: true
                }
            };
            return $http.post(servicePath + '/recipe/random', recipeSearchRandomCriteria);
        }

    };
});
