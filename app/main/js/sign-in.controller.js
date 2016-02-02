angular.module('app.main')
    .controller('SignInCntl', function ($scope, $location, appContext, signIn, recipeList, $rootScope, $translate) {
        'use strict';
        signIn($scope, function () {
            appContext.getCurrentUser().then(function (currentUser) {
                $location.url(currentUser.getHomeDialogPath());
            });
        });

        /**
         * Definition of how many recipes should be shown at the sign-in page.
         * This also could be set dynamically based on the screen-size.
         * @type {number}
         */
        $scope.quantity = 3;

        /**
         * loadRandomRecipes loads in the current selected language the predefined amout($scope.quantity) of recipes
         * and returns those recipes in the $scope.recipeRandomList.
         * @param $scope.quantity
         * @param languageFlag
         * @returns $scope.recipeRandomList
         */
        $scope.loadRandomRecipes = function (languageFlag) {
            if(languageFlag === 'start'){
                languageFlag = $translate.proposedLanguage() || $translate.use();
            }
            recipeList.getAllRandomRecipes($scope.quantity, languageFlag).then(function (randomList){
                return randomList;
            }).then(function (res){
                $scope.recipeRandomList = res;
            });
        };

        $scope.loadRandomRecipes('start');

        $rootScope.$on('loadRandomRecipesParent', function(event, message){
            $scope.loadRandomRecipes(message);
        });
    });
