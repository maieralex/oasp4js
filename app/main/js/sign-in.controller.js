angular.module('app.main')
    .controller('SignInCntl', function ($scope, $location, appContext, signIn, gerichteListe) {
        'use strict';
        signIn($scope, function () {
            appContext.getCurrentUser().then(function (currentUser) {
                $location.url(currentUser.getHomeDialogPath());
            });
        });

        //How many Items to display
        $scope.quantity = 3;

        $scope.gerichteListe = gerichteListe.loadGerichteListe($scope.quantity);
        console.log($scope.gerichteListe);
    });
