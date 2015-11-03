angular.module('app.main').factory('gerichteListeRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/recipemanagement/v1';

    return {
        getRecipe: function (id) {
            return $http.get(servicePath + '/recipe/' + id);
        }
    };
});
