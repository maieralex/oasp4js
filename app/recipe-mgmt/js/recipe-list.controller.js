/*jslint browser: true*/
angular.module('app.recipe-mgmt')
    .controller('RecipeListCntl', function ($rootScope, $scope, $modal, $log, offers, recipes) {
        'use strict';
        

        //Recipe Table List


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
        };

        $scope.getState = function(id) {
            return $scope.selectedRecipes.indexOf(id) !== -1 ? 'active' : 'inactive';
        };

        $scope.setNumPerPage = function (numPerPage) {
            $scope.numPerPage = numPerPage;
            $rootScope.reloadRecipes();
        };
        $scope.openEdit = function() {
            $modal.open({
                templateUrl: 'recipe-mgmt/html/recipe-add.html'
            });
        };
    });