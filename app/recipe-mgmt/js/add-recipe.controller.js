angular.module('app.recipe-mgmt')
    .controller('AddRecipeCntl', function ($scope, recipes) {
        'use strict';

        $scope.recipeName = '';
        $scope.recipeDescription = '';
        $scope.recipePrice = '';
        //$scope.recipeImage = '';

        $scope.findRecipes = function() {
        	console.log(recipes.loadRecipe(0));
        }

        $scope.saveRecipe = function() {
        	var recipe = {
        					"name": $scope.recipeName,
        					"description": $scope.recipeDescription,
        					"price": $scope.recipePrice,
        					"image": null //$scope.recipeImage
        				};
        	recipes.saveRecipe(recipe);
        }
    });
