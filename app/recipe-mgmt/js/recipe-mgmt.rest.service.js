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
        getPaginatedRecipes: function (pagenumber, pagesize, search) {
            var recipeSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                },
                searchString: search.searchString,
                categories: search.selectedCategories,
                priceFrom: search.price.min,
                priceTo: search.price.max,
                ratingFrom: search.rating.min,
                ratingTo: search.rating.max

            };
            return $http.post(servicePath + '/recipe/search', recipeSearchCriteria);
        },
        /**
         * Created/Changed by Marc Schwede on 20.12.2015.
         * This returns the URI to a given picture id.
         * @param id Id which images needs to be shown.
         * @returns {string} URI of the picture with the given {id}.
         */
        getRecipePicture: function (id) {
            return (servicePath + '/recipe/' + id + '/picture');
        },
        getRecipePictureBytes: function (id) {
            return $http.get(servicePath + '/recipe/' + id + '/picture', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        },
        getIngredients: function() {
            return $http.get(servicePath + '/ingredient');
        },
        getAllCategories: function () {
            return $http.get(servicePath + '/categories');
        }
    };
});
