angular.module('app.recipe-mgmt').factory('recipes', function (recipeManagementRestService) {
    'use strict';
    return {
        loadRecipe: function (recipeId) {
            return recipeManagementRestService.getRecipe(recipeId).then(function (response) {
                return response.data;
            });
        },
        saveRecipe: function(recipe) {
        	return recipeManagementRestService.saveRecipe(recipe).then(function(response) {
        		return response.data;
        	});
        }
    };
});
