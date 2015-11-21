/*jshint -W083 */
angular.module('app.main')
    .factory('recipeList', function (recipeListRestService, recipeManagementRestService, $window, $q) {
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
        getAllRandomRecipes: function (numberOfEntities, languageFlag) {
            return recipeListRestService.getRandomRecipes(numberOfEntities, languageFlag).then(function (response) {
                var promises = [];
                angular.forEach(response.data, function(recipe) {
                    var deferred = $q.defer();
                    promises.push(deferred.promise);
                    if(recipe.imageId !== null) {
                        recipeListRestService.getRecipePictureBytes(recipe.id).then(function(pResponse) {
                            return pResponse.data;
                        }).then(function(pictureData) {
                            var reader = new $window.FileReader();
                            reader.onloadend = function(picture) {
                                recipe.image = picture.target.result;
                                deferred.resolve();
                            };
                            reader.readAsDataURL(new $window.Blob([pictureData], {type:'image/png'}));
                        });
                    }
                    else {
                        deferred.resolve();
                    }
                });
                return $q.all(promises).then(function() {
                    return response.data;
                });
            });
        }
    };
});
