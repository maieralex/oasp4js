/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window) {
        'use strict';

        $scope.recipeName = '';
        $scope.recipeDescription = '';
        $scope.recipePrice = '';
        $scope.recipeImage = null;

        $scope.imageBusy = false;

        $window.document.getElementById('recipeImage').addEventListener('change', function(event) {
            $scope.recipeImage = event.target.files[0];
        }, false);

        $scope.findRecipes = function() {
        	recipes.loadRecipe(0).then(function(data) {
                $log.log(data);
            });
        };

        $scope.saveRecipe = function() {
        	var recipe = {
        					'name': $scope.recipeName,
        					'description': $scope.recipeDescription,
        					'price': $scope.recipePrice,
                            'image': $scope.recipeImage
        				};
        	recipes.saveRecipe(recipe).then(function() {
                $rootScope.reloadRecipes();
                $scope.$close();
            });

        };

        $scope.temporaryGetProduct = function() {
            /*
            offers.getProduct(4).then(function(data) {
                $log.log(data);
            });*/
            recipes.loadRecipe(4).then(function(data) {
                console.log(data);
            });
        };

    });
