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
                for(var i = 0; i < $scope.selectedRecipes.length; i++) {
                    for(var j = 0; j < $scope.recipesList.length; j++) {
                        if($scope.selectedRecipes[i].id === $scope.recipesList[j].id) {
                            $scope.selectedRecipes[i] = $scope.recipesList[j];
                            console.log('yay');
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

        $scope.setNumPerPage = function (numPerPage) {
            $scope.numPerPage = numPerPage;
            $rootScope.reloadRecipes();
        };

        $scope.selectedRecipes = [];

        $rootScope.updateSelectedRecipe = function() {
            $scope.selectRecipe($scope.selectedRecipes[0]);
        };

        $scope.selectRecipe = function(recipe, multisel) {
            var idx = $scope.selectedRecipes.indexOf(recipe);
            if(idx === -1) {
                if(!multisel) {
                    $scope.selectedRecipes.pop();
                }
                $scope.selectedRecipes.push(recipe);
            }
            else {
                $scope.selectedRecipes.splice(idx, 1);
            }

            // disable sidebar if more than 1 item is selected or no item is selected
            $scope.sidebarIsVisible = $scope.selectedRecipes.length === 1;
        };
        
        $scope.disbaleSidebar = function () {
            $scope.sidebarIsVisible = false;
            $scope.selectedRecipes = [];
        };

        $scope.openEdit = function(recipe) {
            $rootScope.editRecipe = recipe;
            $modal.open({
                templateUrl: 'recipe-mgmt/html/recipe-add.html'
            });
        };
    });
