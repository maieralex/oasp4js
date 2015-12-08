/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window) {
        'use strict';

        //maximum image size to upload in bytes
        $scope.maxImgSize = 5000000;
        $scope.showMaxImgSizeWarning = false;

        $scope.recipe = {
            id: null,
            name: null,
            description: null,
            language: null,
            price: null,
            ingredients: [],
            cookingInstructions: null,
            portions: null,
            cookTimeMinutes: null,
            prepTimeMinutes: null,
            difficulty: null,
            calories: null,
            categories: null,
            image: null
        };

        $scope.setupExampleIngredients = function() {
            $scope.recipe.ingredients = [];
            $scope.recipe.ingredients.push({
                name: 'Flour',
                unit: 'g',
                amount: 200
            });
            $scope.recipe.ingredients.push({
                name: 'Eggs',
                unit: 'piece',
                amount: 2
            });
            $scope.recipe.ingredients.push({
                name: 'Water',
                unit: 'g',
                amount: 300
            });
            console.log($scope.recipe);
        };

        $scope.imageBusy = false;
        $scope.imageDirty = false;

        if($rootScope.editRecipe !== null) {
            $scope.recipe = $rootScope.editRecipe;
        }

        $window.document.getElementById('recipeImage').addEventListener('change', function(event) {
            $scope.$apply(function(){
                $scope.recipe.image = event.target.files[0];
                if ($scope.recipe.image.size < $scope.maxImgSize) {
                    $log.log('yop!');
                    $scope.imageDirty = true;
                }
            });
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

        $scope.setupExampleIngredients();
    });
