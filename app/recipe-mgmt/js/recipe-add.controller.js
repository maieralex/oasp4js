/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window) {
        'use strict';

        $scope.recipe = {
            id: null,
            name: null,
            description: null,
            language: null,
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
        };

        $scope.imageBusy = false;
        $scope.imageDirty = false;

        if($rootScope.editRecipe !== null) {
            $scope.recipe = $rootScope.editRecipe;
        }

        $window.document.getElementById('recipeImage').addEventListener('change', function(event) {
            $scope.recipe.image = event.target.files[0];
            $scope.imageDirty = true;
        }, false);

        $scope.saveRecipe = function() {
            if(!$scope.imageDirty) {
                $scope.recipe.image = null;
            }
        	recipes.saveRecipe($scope.recipe).then(function() {
                $rootScope.reloadRecipes();
                $scope.image = null;
                $rootScope.updateSelectedRecipe();
                $scope.$close();
            });

        };

    });
