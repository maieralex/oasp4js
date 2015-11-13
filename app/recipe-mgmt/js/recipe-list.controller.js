/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeListCntl', function ($rootScope, $scope, $modal, $log, offers, recipes) {
        'use strict';
        $scope.numPerPage = 5;
        $scope.currentPage = 1;
        $scope.totalItems = 5; //getTotal ToDo
        $scope.recipesList = [];

        $rootScope.reloadRecipes = function () {
            $scope.recipePromise = recipes.getPaginatedRecipes($scope.currentPage, $scope.numPerPage).then(function (paginatedRecipes) {
                return paginatedRecipes;
            }).then(function (res) {
                $scope.recipesList = res.result;
                $scope.totalItems = res.pagination.total;
            });
        };

        $scope.$watch('currentPage', function () {
            $rootScope.reloadRecipes();
        });

        $scope.setNumPerPage = function (numPerPage) {
            $scope.numPerPage = numPerPage;
            $rootScope.reloadRecipes();
        };

        $scope.selectedRecipes = [];

        $scope.selectRecipe = function(id, multisel) {
            if(!multisel) {
                $scope.selectedRecipes.pop();
            }

            var idx = $scope.selectedRecipes.indexOf(id);
            if(idx === -1) {
                $scope.selectedRecipes.push(id);
            }
            else {
                $scope.selectedRecipes.splice(idx, 1);
            }

            // for sidebar
            var idxn = $scope.recipesList.map(function(e) { return e.id }).indexOf(id);
            $scope.srname = $scope.recipesList[idxn].name;
            $scope.srdesc = $scope.recipesList[idxn].description;
            $scope.srprice = $scope.recipesList[idxn].price;

            if(!$scope.sidebarIsVisible) {
                $scope.sidebarIsVisible = true;
            }
        };

        $scope.openEdit = function() {
            $modal.open({
                templateUrl: 'recipe-mgmt/html/recipe-add.html'
            });
        };
    });
