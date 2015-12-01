angular.module('app.recipe-mgmt').factory('recipeManagementRestService', function ($http, $q, $window, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/recipemanagement/v1';
    return {
        getRecipe: function (id) {
            return $http.get(servicePath + '/recipe/' + id);
        },
        saveRecipe: function (recipe) {
            return $http.post(servicePath + '/recipe/', recipe);
        },
        saveRecipePicture: function (id, image) {
            var deferred = $q.defer();
            var header = {
                'Content-Type': 'multipart/mixed'
            };

            var eto = {
                'mimeType': image.type
            };

            var content = JSON.stringify(eto); // the body of the new file
            var blob = new $window.Blob([content], { type: 'application/json'});

            var formData = new $window.FormData();
            formData.append('blob', image);
            formData.append('binaryObjectEto', blob);
            deferred.resolve($http.post(servicePath + '/recipe/' + id + '/picture', formData, {headers:header}));

            return deferred.promise;
        },
        getPaginatedRecipes: function (pagenumber, pagesize, searchString) {
            var recipeSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                },
                searchString: searchString
            };
            return $http.post(servicePath + '/recipe/search', recipeSearchCriteria);
        },
        getRecipePicture: function (id) {
            return $http.get(servicePath + '/recipe/' + id + '/picture');
        },
        getRecipePictureBytes: function (id) {
            return $http.get(servicePath + '/recipe/' + id + '/picture', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        }
    };
});
