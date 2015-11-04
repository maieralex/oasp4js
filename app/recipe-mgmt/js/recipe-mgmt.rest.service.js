angular.module('app.recipe-mgmt').factory('recipeManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/recipemanagement/v1';

    return {
        getRecipe: function (id) {
            return $http.get(servicePath + '/recipe/' + id);
        },
        saveRecipe: function (recipe) {
            return $http.post(servicePath + '/recipe/', recipe);
        },
        saveRecipePicture: function(id, image) {
            return $http.post(servicePath + '/recipe/' + id + '/picture');
        },
        getPaginatedRecipes: function (pagenumber, pagesize) {
            var recipeSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
            return $http.post(servicePath + '/recipe/search', recipeSearchCriteria);
        },
        getRecipePicture: function(id) {
            return $http.get(servicePath + '/recipe/' + id + '/picture');
        },
        getRecipePictureBytes: function(id) {
            return $http.get(servicePath + '/recipe/' + id + '/pictureBytes', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        }
    };
});
