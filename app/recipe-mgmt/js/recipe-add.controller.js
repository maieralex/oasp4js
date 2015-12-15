/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window, categories) {
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
            category: null,
            image: null,
            rating: null
        };

        $scope.existingIngredients = [];
        recipes.getIngredients().then(function(ings) {
            $scope.existingIngredients = ings;
        });

        categories.getAllCategories().then(function (response) {
            $scope.categories = response;
        });

        $scope.imageBusy = false;
        $scope.imageDirty = false;

        if ($rootScope.editRecipe !== null) {
            $scope.recipe = $rootScope.editRecipe;
            console.log($scope.recipe);
            $scope.recipe.ingredients = []; // ToDo: Remove once ingredients are fully implemented
            $scope.editmode = 'edit';
        }

        $window.document.getElementById('recipeImage').addEventListener('change', function (event) {
            $scope.$apply(function () {
                $scope.recipe.image = event.target.files[0];
                if ($scope.recipe.image.size < $scope.maxImgSize) {
                    $scope.imageDirty = true;
                }
            });
        }, false);

        $scope.emptyIngredientExists = function () {
            var emptyIngredient = false;
            for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
                var ing = $scope.recipe.ingredients[i];
                if ((ing.name === null || ing.name === '') ||
                    (ing.unit === null || ing.unit === '') ||
                    (ing.amount === null || ing.amount === '' || ing.amount === 0)) {
                    emptyIngredient = true;
                }
            }
            return emptyIngredient;
        };

        $scope.newIngredient = {};
        $scope.addIngredient = function () {
            $scope.recipe.ingredients.push($scope.newIngredient);
            $scope.newIngredient = {};
            $window.document.getElementById('ingredientInput').getElementsByTagName('input')[0].focus();
        };
        
        $scope.ingredientAddControls = function (e) {
            // keyCode 13 = Enter key
            if (e.keyCode === 13) {
                $scope.addIngredient();
            }
        };
        $scope.ingredientControls = function (e, ingredient) {
            var isFirstIngredient = ingredient === $scope.recipe.ingredients[0];
            var isLastIngredient = ingredient === $scope.recipe.ingredients[$scope.recipe.ingredients.length - 1];
            var index = -1;
            var tmp = null;
            if (e.keyCode === 38 && e.shiftKey && !isFirstIngredient) {
                index = $scope.recipe.ingredients.indexOf(ingredient);
                tmp = $scope.recipe.ingredients[index];
                $scope.recipe.ingredients[index] = $scope.recipe.ingredients[index - 1];
                $scope.recipe.ingredients[index - 1] = tmp;
                $window.document.getElementById('ingredientTable').getElementsByTagName('tr')[index - 1].getElementsByTagName('input')[0].focus();
            }
            else if (e.keyCode === 40 && e.shiftKey && !isLastIngredient) {
                index = $scope.recipe.ingredients.indexOf(ingredient);
                tmp = $scope.recipe.ingredients[index];
                $scope.recipe.ingredients[index] = $scope.recipe.ingredients[index + 1];
                $scope.recipe.ingredients[index + 1] = tmp;
                $window.document.getElementById('ingredientTable').getElementsByTagName('tr')[index + 1].getElementsByTagName('input')[0].focus();
            }
        };
        $scope.removeIngredient = function (ingredient) {
            var removeIndex = $scope.recipe.ingredients.indexOf(ingredient);
            if (removeIndex > -1) {
                $scope.recipe.ingredients.splice(removeIndex, 1);
            }
        };

        $scope.saveRecipe = function () {
            if (!$scope.imageDirty) {
                $scope.recipe.image = null;
            }
            $scope.recipe.ingredients = null; // Remove this, once ingredients can be saved!!!
            recipes.saveRecipe($scope.recipe).then(function () {
                $rootScope.reloadRecipes();
                $scope.image = null;
                $rootScope.updateSelectedRecipe();
                $scope.$close();
            });

        };

        $scope.closeModal = function () {
            $rootScope.reloadRecipes();
            $scope.$close();
        };
    });
