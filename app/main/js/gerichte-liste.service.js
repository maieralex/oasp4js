angular.module('app.main').factory('gerichteListe', function (gerichteListeRestService) {
    'use strict';
    return {
        loadRecipe: function (recipeId) {
            return gerichteListeRestService.getRecipe(recipeId).then(function (response) {
                return response.data;
            });
        },
        loadGerichteListe : function (listLength) {

            // Fisher–Yates shuffle algorithm
            /*var shuffleArray = function(array) {
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
            };*/

            console.log(listLength);
            var returnArray = [];
            for (var i=0; i < (listLength); i++) {
                gerichteListeRestService.getRecipe(i).then(function(response) {
                    //dreckiger fallback auf eine fixe URL, sollte imageId null sein.
                    if (response.data.imageId == null) response.data.imageId = "http://files.schwedenmut.de/fallback.jpg"
                    returnArray.push(response.data);
                });
            }
            return returnArray;
        }
    }
});
