/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($rootScope, $scope, $log, offers, recipes, $window) {
        'use strict';

        //maximum image size to upload in bytes
        $scope.maxImgSize = 5000000;
        $scope.showMaxImgSizeWarning = false;

        $scope.sortingBusy = false;

        $scope.recipe = {
            id: null,
            name: null,
            description: null,
            language: null,
            price: null,
            recipeIngredients: [],
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

        // ToDo: Remove once categories are fully implemented
        $scope.categories = [
            {name: 'Vorspeisen'},
            {name: 'Für den kleinen Hunger'},
            {name: 'Vom Grill'},
            {name: 'Fisch'},
            {name: 'Pasta'},
            {name: 'Pizza'},
            {name: 'Nachspeisen'}
        ];

        $scope.imageBusy = false;
        $scope.imageDirty = false;

        if ($rootScope.editRecipe !== null) {
            $scope.recipe = $rootScope.editRecipe;
            console.log($scope.recipe);
            $scope.recipe.category = {name: $scope.recipe.category}; // ToDo: Remove once categories are fully implemented
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
            for (var i = 0; i < $scope.recipe.recipeIngredients.length; i++) {
                var ing = $scope.recipe.recipeIngredients[i];
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
            if($scope.newIngredient.name.length > 0 &&
            $scope.newIngredient.unit.length > 0 &&
            $scope.newIngredient.amount.length > 0) {
                $scope.recipe.recipeIngredients.push({
                    ingredient: {
                        name: $scope.newIngredient.name
                    },
                    measuringUnit: $scope.newIngredient.unit,
                    amount: $scope.newIngredient.amount,
                    position: $scope.recipe.recipeIngredients.length + 1
                });
                $scope.newIngredient = {};
                $window.document.getElementById('ingredientInput').getElementsByTagName('input')[0].focus();
            }
        };
        
        $scope.ingredientAddControls = function (e) {
            // keyCode 13 = Enter key
            if (e.keyCode === 13) {
                $scope.addIngredient();
            }
        };
        $scope.ingredientControls = function (e, ingredient) {
            $scope.sortingBusy = true;
            var isFirstIngredient = ingredient.position === 1;
            var isLastIngredient = ingredient.position === $scope.recipe.recipeIngredients.length;
            var index = -1;
            if (e.keyCode === 38 && e.shiftKey && !isFirstIngredient) {
                for(var i = 0; i < $scope.recipe.recipeIngredients.length; i++) {
                    if($scope.recipe.recipeIngredients[i].position === ingredient.position-1) {
                        $scope.recipe.recipeIngredients[i].position++;
                        ingredient.position--;
                        break;
                    }
                }
                $window.document.getElementById('ingredientTable').getElementsByTagName('tr')[ingredient.position-1].getElementsByTagName('input')[0].focus();
            }
            else if (e.keyCode === 40 && e.shiftKey && !isLastIngredient) {
                for(var i = 0; i < $scope.recipe.recipeIngredients.length; i++) {
                    if($scope.recipe.recipeIngredients[i].position === ingredient.position+1) {
                        $scope.recipe.recipeIngredients[i].position--;
                        ingredient.position++;
                        break;
                    }
                }
                $window.document.getElementById('ingredientTable').getElementsByTagName('tr')[ingredient.position-1].getElementsByTagName('input')[0].focus();
            }
            // We need to wait for angular process the changes,
            // else the drag-n-drop callback will break it completely
            $window.setTimeout(function() {
                $scope.sortingBusy = false;
            }, 200);
        };

        $scope.updateSorting = function() {
            // This callback fires way too often which affects sorting by shortcut
            // that's why we have to limit its execution
            if(!$scope.sortingBusy) {
                for(var i = 0; i < $scope.recipe.recipeIngredients.length; i++) {
                    $scope.recipe.recipeIngredients[i].position = i+1;
                }
            }
        }

        $scope.removeIngredient = function (ingredient) {
            var removeIndex = $scope.recipe.recipeIngredients.indexOf(ingredient);
            if (removeIndex > -1) {
                $scope.recipe.recipeIngredients.splice(removeIndex, 1);
            }
        }

        $scope.saveRecipe = function () {
            if (!$scope.imageDirty) {
                $scope.recipe.image = null;
            }
            $scope.recipe.recipeIngredients = null; // Remove this, once ingredients can be saved!!!
            $scope.recipe.category = $scope.recipe.category.name; // ToDo: Remove once categories are fully implemented
            recipes.saveRecipe($scope.recipe).then(function () {
                $rootScope.reloadRecipes();
                $scope.image = null;
                $rootScope.updateSelectedRecipe();
                $scope.$close();
            });

        };

    });
