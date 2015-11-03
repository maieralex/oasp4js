/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeAddCntl', function ($scope, $log, offers, recipes, $window) {
        'use strict';

        $scope.recipeName = '';
        $scope.recipeDescription = '';
        $scope.recipePrice = '';
        $scope.recipeImage = null;

        $scope.imageBusy = false;

        $window.document.getElementById('recipeImage').addEventListener('change', function(event) {
        	var file = event.target.files[0];
        	var reader = new FileReader();
        	reader.onload = function(e) {
        		$scope.recipeImage = e.target.result;
        	};
        	reader.onloadstart = function() {
        		$scope.imageBusy = true;
        	};
        	reader.onloadend = function() {
        		$scope.imageBusy = false;
        	};
        	// Convert image to BASE64
        	reader.readAsDataURL(file);
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
        	recipes.saveRecipe(recipe);
        };

        $scope.temporaryGetProduct = function() {
            offers.getProduct(4).then(function(data) {
                $log.log(data);
            });
        }
    });
