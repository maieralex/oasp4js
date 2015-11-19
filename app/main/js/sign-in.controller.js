angular.module('app.main')
    .controller('SignInCntl', function ($scope, $location, appContext, signIn, recipeList) {
        'use strict';
        signIn($scope, function () {
            appContext.getCurrentUser().then(function (currentUser) {
                $location.url(currentUser.getHomeDialogPath());
            });
        });

        //How many Items to display
        $scope.quantity = 3;

        $scope.loadRandomRecipes = function () {
            recipeList.getAllRandomRecipes($scope.quantity).then(function (recipeRandomList) {
                $scope.recipeRandomList = recipeRandomList;
            });
        };

        $scope.loadRandomRecipes();
    });
