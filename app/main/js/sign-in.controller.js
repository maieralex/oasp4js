angular.module('app.main')
    .controller('SignInCntl', function ($scope, $location, appContext, signIn) {
        'use strict';
        signIn($scope, function () {
            appContext.getCurrentUser().then(function (currentUser) {
                $location.url(currentUser.getHomeDialogPath());
            });
        });
        //Marc Schwede - bislang nur Dummy Informationen für den Login Screen
        $scope.gerichteListe = [
            {bild: "http://files.schwedenmut.de/kartoffelsalat.jpg", bezeichnung: "Schwäbischer Kartoffelsalat", beschreibung: "Über Jahrhunderte erlaubten die kargen und steinreichen Bedingungen auf der Schwäbischen Alb kaum Viehzucht in größerem Maße. Fleisch konnten sich daher nur wenige leisten; es galt als \„Herrenessen\“.", preis: "2,50"},
            {bild: "http://files.schwedenmut.de/steak.jpg", bezeichnung: "T-Bone Steak in Rosmarin", beschreibung: "Scharf angebratenes T-Bone Steak (rare/medium bzw. auf Anfrage well-done) garniert mit frischen Rosmarinnadeln und Bratkartoffeln.", preis: "19,90"},
            {bild: "http://files.schwedenmut.de/bandnudeln.jpg", bezeichnung: "Bandnudeln mit Spinat", beschreibung: "Bandnudeln mit blanchiertem Spinat. Garniert mit Coktailtomaten, Parmesan und etwas Nuss-Öl. Sommerliches Gericht, auf Wunsch mit Pinienkernen.", preis: "9,80"},
            {bild: "http://files.schwedenmut.de/dorade.jpg", bezeichnung: "Gebackene Dorade mit scharfen Ofenkartoffeln", beschreibung: "Test 4", preis: "17,00"},
            {bild: "http://files.schwedenmut.de/sushi.jpg", bezeichnung: "Süßes Sushi", beschreibung: "Eine süße Kombination aus Milchreis, Kokos, Mangos, Erdbeeren und Kiwis präsentiert als Sushi.", preis: "8,90"}
        ];
        //How many Items to display
        $scope.quantity = 3;
        // Fisher–Yates shuffle algorithm
        $scope.shuffleArray = function(array) {
            var m = array.length, t, i;
            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
        $scope.shuffledGerichteListe = $scope.shuffleArray($scope.gerichteListe);


    });

angular.module('app.main').directive('menu', function(){
        return function (scope, element, attrs) {
            element.height($(window).height() - $('.navbar-fixed-top').outerHeight() - '75');
        }
    });
//Change the height of menuItems to fit the screen
angular.module('app.main').directive('menuitem', function(){
    return function (scope, element, attrs) {
        element.height(($(window).height() - $('.navbar-fixed-top').outerHeight() - '75')/ scope.quantity);
    }
});
