/*jshint -W083 */
angular.module('app.recipe-mgmt').factory('categories', function (recipeManagementRestService) {
    'use strict';

    return {
        getAllCategories: function () {
            return recipeManagementRestService.getAllCategories().then(function (response) {
                console.log(response.data);
                return response.data;
            });
        }
    };
});
