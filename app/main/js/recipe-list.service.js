/*jshint -W083 */
angular.module('app.main')
    .factory('recipeList', function (recipeListRestService) {
    'use strict';
    return {
        loadRecipe: function (recipeId) {
            return recipeListRestService.getRecipe(recipeId).then(function (response) {
                return response.data;
            });
        },
        loadRecipeList : function (listLength) {
            var returnArray = [];
            for (var i=0; i < (listLength); i++) {
                recipeListRestService.getRecipe(i).then(function(response) {
                    //dreckiger fallback auf eine fixe URL, sollte imageId null sein.

                    if (response.data.imageId === null) {
                        response.data.imageId = 'http://files.schwedenmut.de/fallback.jpg';
                        //response.data.imageId = recipeListRestService.getRecipePictureBytes(i);
                    }
                    returnArray.push(response.data);
                });
            }
            return returnArray;
        },
        getAllRandomRecipes: function (numberOfEntities) {
            return recipeListRestService.getRandomRecipes(numberOfEntities).then(function (response) {
                return response.data;
            });
        }
    };
});
