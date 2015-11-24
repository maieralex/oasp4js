angular.module('app.main')
    .controller('SignInCntl', function ($scope, $location, appContext, signIn, recipeList, $rootScope, $translate) {
        'use strict';
        signIn($scope, function () {
            appContext.getCurrentUser().then(function (currentUser) {
                $location.url(currentUser.getHomeDialogPath());
            });
        });

        //How many Items to display
        $scope.quantity = 3;


        $scope.loadRandomRecipes = function (languageFlag) {
            if(languageFlag == "start"){
                languageFlag = $translate.proposedLanguage() || $translate.use();
            }
            recipeList.getAllRandomRecipes($scope.quantity, languageFlag).then(function (randomList){
                return randomList;
            }).then(function (res){
                $scope.recipeRandomList = res;
            });
        };

        $scope.loadRandomRecipes("start");

        $rootScope.$on("loadRandomRecipesParent", function(event, message){
            $scope.loadRandomRecipes(message);
        });
    });
