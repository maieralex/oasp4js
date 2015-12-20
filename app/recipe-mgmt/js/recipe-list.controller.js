/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeListCntl', function ($rootScope, $scope, $modal, $log, offers, recipes) {
        'use strict';
        $scope.numPerPage = 5;
        $scope.currentPage = 1;
        $scope.totalItems = 5; //getTotal ToDo
        $scope.recipesList = [];

        $scope.search = {};  //only do this if $scope.course has not already been declared
        $scope.search.searchString = '';

        $scope.checkboxModel = {
            value1 : 'false',
            value2 : 'false',
            value3 : 'false',
            value4 : 'false',
            value5 : 'false',
            value6 : 'false',
            value7 : 'false'
        };

        $scope.search.price = {
          min: 0,
          max: 30
        };

        $scope.search.rating = {
            min: 1,
            max: 5
        };

        $rootScope.reloadRecipes = function () {
            $scope.search.selectedCategories = [];
            $scope.getSelectedCategories();
            console.log($scope.selectedCategories);
            /**
             * use recipes.getPaginatedRecipes if you want the base64 stuff
             * use recipes.getPaginatedRecipesWithURL if you want the URI of an Image
             */
            $scope.recipePromise = recipes.getPaginatedRecipesWithURL($scope.currentPage, $scope.numPerPage, $scope.search).then(function (paginatedRecipes) {
                return paginatedRecipes;
            }).then(function (res) {
                $scope.recipesList = res.result;
                for (var i = 0; i < $scope.selectedRecipes.length; i++) {
                    for (var j = 0; j < $scope.recipesList.length; j++) {
                        if ($scope.selectedRecipes[i].id === $scope.recipesList[j].id) {
                            $scope.selectedRecipes[i] = $scope.recipesList[j];
                            break;
                        }
                    }
                }
                $scope.totalItems = res.pagination.total;
            });
        };

        $scope.$watch('currentPage', function () {
            $rootScope.reloadRecipes();
        });

        $scope.$watch('search.searchString', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.delay(function () {
                    $rootScope.reloadRecipes();
                }, 1000);
            }
        });

        $scope.$watch('checkboxModel', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $rootScope.reloadRecipes();
            }
        }, true);

        $scope.$watch('search.price', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.delay(function () {
                    $rootScope.reloadRecipes();
                }, 1000);
            }
        }, true);

        $scope.$watch('search.rating', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.delay(function () {
                    $rootScope.reloadRecipes();
                }, 1000);
            }
        }, true);

        $scope.setNumPerPage = function (numPerPage) {
            $scope.numPerPage = numPerPage;
            $rootScope.reloadRecipes();
        };

        $scope.getSelectedCategories = function () {
            var key, value, i = 0;
            for(key in $scope.checkboxModel) {
                value = $scope.checkboxModel[key];
                if(value !== 'false') {
                    $scope.search.selectedCategories[i] = value;
                    i++;
                }
            }
        };

        $scope.selectedRecipes = [];

        $rootScope.updateSelectedRecipe = function () {
            $scope.selectRecipe($scope.selectedRecipes[0]);
        };

        $scope.selectRecipe = function (recipe, multisel) {
            var idx = $scope.selectedRecipes.indexOf(recipe);
            if (idx === -1) {
                if (!multisel) {
                    $scope.selectedRecipes.pop();
                }
                $scope.selectedRecipes.push(recipe);
            }
            else {
                $scope.selectedRecipes.splice(idx, 1);
            }

            // disable sidebar if more than 1 item is selected or no item is selected
            $scope.sidebarIsVisible = $scope.selectedRecipes.length === 1;

            // disable filter if item is selected
            if ($scope.sidebarIsVisible) {
                $scope.filterIsVisible = false;
            }
        };

        $scope.disableSidebar = function () {
            $scope.sidebarIsVisible = false;
            $scope.selectedRecipes = [];
        };

        $scope.toggleFilterbar = function () {
            $scope.filterIsVisible = !$scope.filterIsVisible;
            if ($scope.filterIsVisible) {
                $scope.disableSidebar();
            }
        };

        $scope.openEdit = function (recipe) {
            $rootScope.editRecipe = recipe;
            $modal.open({
                templateUrl: 'recipe-mgmt/html/recipe-add.html'
            });
        };

        $scope.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        /**
         * Created by Marc Schwede on 14.12.2015.
         * Functionality to change recipies with inline editing.
         * @param recipe
         */
        $scope.updateRecipe = function (recipe) {
            recipes.updateRecipe(recipe);
        };
    });
