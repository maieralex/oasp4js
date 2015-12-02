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

        $scope.addIngredient = function() {
            if(!$scope.emptyIngredientExists()) {
                $scope.recipe.ingredients.push({
                    name: '',
                    unit: '',
                    amount: '',
                });
            }
        };

        $scope.emptyIngredientExists = function() {
            var emptyIngredient = false;
            for(var i = 0; i < $scope.recipe.ingredients.length; i++) {
                var ing = $scope.recipe.ingredients[i];
                if((ing.name === null || ing.name === '') ||
                    (ing.unit === null || ing.unit === '') ||
                    (ing.amount === null || ing.amount === '' || ing.amount === 0)) {
                    emptyIngredient = true;
                }
            }
            return emptyIngredient;
        }

        $scope.ingredientControls = function(e, element) {
            var isFirstIngredient = element.ingredient === $scope.recipe.ingredients[0];
            var isLastIngredient = element.ingredient === $scope.recipe.ingredients[$scope.recipe.ingredients.length-1]
            // keyCode 9 = TAB
            if(e.keyCode === 9 && isLastIngredient && !$scope.emptyIngredientExists()) {
                $scope.recipe.ingredients.push({
                    name: '',
                    unit: '',
                    amount: '',
                });
            }
            if(e.keyCode === 38 && !isFirstIngredient) {
                var index = $scope.recipe.ingredients.indexOf(element.ingredient);
                var tmp = $scope.recipe.ingredients[index];
                $scope.recipe.ingredients[index] = $scope.recipe.ingredients[index-1];
                $scope.recipe.ingredients[index-1] = tmp;
                document.getElementById('ingredientTable').getElementsByTagName('tr')[index-1].getElementsByTagName('input')[0].focus();
            }
            if(e.keyCode === 40 && !isLastIngredient) {
                var index = $scope.recipe.ingredients.indexOf(element.ingredient);
                var tmp = $scope.recipe.ingredients[index];
                $scope.recipe.ingredients[index] = $scope.recipe.ingredients[index+1];
                $scope.recipe.ingredients[index+1] = tmp;
                document.getElementById('ingredientTable').getElementsByTagName('tr')[index+1].getElementsByTagName('input')[0].focus();
            }
        };

        $scope.saveRecipe = function() {
            if(!$scope.imageDirty) {
                $scope.recipe.image = null;
            }
            $scope.recipe.ingredients = null; // Remove this, once ingredients can be saved!!!
        	recipes.saveRecipe($scope.recipe).then(function() {
                $rootScope.reloadRecipes();
                $scope.image = null;
                $rootScope.updateSelectedRecipe();
                $scope.$close();
            });

        };

        $scope.setupExampleIngredients();
    });
