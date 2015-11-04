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
            /*
            offers.getProduct(4).then(function(data) {
                $log.log(data);
            });*/
            recipes.loadRecipe(4).then(function(data) {
                console.log(data);
            });
        };

        //Recipe Table List


        $scope.numPerPage = 1;
        $scope.currentPage = 1;
        $scope.totalItems = 5; //getTotal ToDo


        $scope.recipesList = [];

        $scope.reloadRecipes = function () {
            $scope.recipePromise = recipes.getPaginatedRecipes($scope.currentPage, $scope.numPerPage).then(function (paginatedRecipes) {
                return paginatedRecipes;
            }).then(function (res) {
                $scope.recipesList = res.result;
                $scope.totalItems = res.pagination.total;
            });
        };

        $scope.$watch('currentPage', function () {
            $scope.reloadRecipes();
        });

        $scope.selectedRecipes = [];

        $scope.selectRecipe = function(id, multisel) {
            if(!multisel) {
                $scope.selectedRecipes.pop();
            }

            var idx = $scope.selectedRecipes.indexOf(id);
            idx == -1 ? $scope.selectedRecipes.push(id) : $scope.selectedRecipes.splice(idx, 1);
        };

        $scope.getState = function(id) {
            return $scope.selectedRecipes.indexOf(id) != -1 ? 'active' : 'inactive';
        };

        $scope.setNumPerPage = function (numPerPage) {
            $scope.numPerPage = numPerPage;
            $scope.reloadRecipes();
        };

    });
