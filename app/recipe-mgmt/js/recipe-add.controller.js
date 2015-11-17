/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window) {
        'use strict';

        $scope.recipe = {
            id: null,
            name: null,
            description: null,
            price: null,
            ingredients: null,
            cookingInstructions: null,
            portions: null,
            cookTimeMinutes: null,
            prepTimeMinutes: null,
            difficulty: null,
            calories: null,
            categories: null,
            image: null
        }


        $scope.imageBusy = false;

        if($rootScope.editRecipe !== null) {
            $scope.recipe = $rootScope.editRecipe;
        }

        $window.document.getElementById('recipeImage').addEventListener('change', function(event) {
            $scope.recipe.image = event.target.files[0];
        }, false);

        $scope.findRecipes = function() {
        	recipes.loadRecipe(0).then(function(data) {
                $log.log(data);
            });
        };

        $scope.saveRecipe = function() {
        	recipes.saveRecipe($scope.recipe).then(function() {
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
