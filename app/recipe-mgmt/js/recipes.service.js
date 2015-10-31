angular.module('app.recipe-mgmt').factory('recipes', function (recipeManagementRestService) {
    'use strict';
    var paginatedRecipes = {};

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
        },

        getPaginatedRecipes: function (pagenumber, pagesize) {
            return recipeManagementRestService.getPaginatedRecipes(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedRecipes);
                return paginatedRecipes;
            });
        }
    };
});
