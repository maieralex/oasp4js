/*jshint -W083 */
angular.module('app.recipe-mgmt').factory('categories', function (recipeManagementRestService) {
    'use strict';

    return {
        getAllCategories: function (language) {
            return recipeManagementRestService.getAllCategories(language).then(function (response) {
                console.log(response.data);
                return response.data;
            });
        }
    };
});
