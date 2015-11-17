angular.module('app.recipe-mgmt').factory('recipeManagementRestService', function ($http, $q, $window, currentContextPath, $document) {
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
            var deferred = $q.defer();
            /*var header = {
                'Content-Type': 
            };*/

            var formData = new $document.FormData();
            formData.append('picture', image);
            deferred.resolve($http.post(servicePath + '/recipe/' + id + '/picture2', formData));
            /*
            var reader = new $window.FileReader();
            reader.onloadend = function(event) {
                var file = new $window.Blob([event.target.result], {type: image.type});
                deferred.resolve($http.post(servicePath + '/recipe/' + id + '/picture', file));
            };
            reader.readAsArrayBuffer(image);*/
            return deferred.promise;
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
            return $http.get(servicePath + '/recipe/' + id + '/picture', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        }
    };
});
