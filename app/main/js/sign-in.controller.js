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
        
    });
