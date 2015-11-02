/**
 * Created by TH-Koeln on 22.10.15.
 * Alexander Wecker
 */

angular.module("app.recipe-mgmt")
    .controller("RecipeListCntl", function($scope, recipes) {
        'use strict';

        /* $scope.recipesList = [
                { id: "0", title:"Pizza Italia", description:"Nur die frischesten Zutaten aus der Region kommen auf diese ganz besondere Pizza.", price:"11,95 €", image:"main/img/pizza.jpg" },
                { id: "1", title:"Jalapeno Burger", description:"Bestes Beef und Jalapenos - eine scharfe Mischung!", price:"8,95 €", image:"main/img/burger.jpg" },
                { id: "2", title:"Dry Aged Steak", description:"28 Tage abgehangen - gealtert bis zur Perfektion.", price:"20,95 €", image:"main/img/steak.jpg" }
        ];*/

        $scope.numPerPage = 5;
        $scope.currentPage = 1;



        $scope.recipesList = [];

        $scope.reloadRecipes = function () {
            recipes.getPaginatedRecipes($scope.currentPage, $scope.numPerPage).then(function (paginatedRecipes) {
                return paginatedRecipes;
            }).then(function (res) {
                $scope.recipesList = res.result;
                console.log(res.result);
            });
        };


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
    });
