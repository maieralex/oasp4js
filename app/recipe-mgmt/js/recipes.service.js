/*jshint -W083 */
angular.module('app.recipe-mgmt').factory('recipes', function (recipeManagementRestService, $window, $q) {
    'use strict';

    return {
        getRecipe: function (recipeId) {
            return recipeManagementRestService.getRecipe(recipeId).then(function (response) {
                if(response.data.pictureId !== null) {
                    return recipeManagementRestService.getRecipePictureBytes(recipeId).then(function(pResponse) {
                        return pResponse.data;
                    }).then(function(pictureData) {
                        var deferred = $q.defer();
                        var reader = new $window.FileReader();
                        reader.onloadend = function(picture) {
                            response.data.image = picture.target.result;
                            deferred.resolve(response.data);
                        };
                        reader.readAsDataURL(new $window.Blob([pictureData], {type:'image/png'}));
                        return deferred.promise;
                    });
                }
                else {
                    return response.data;
                }
            });
        },
        saveRecipe: function(recipe) {
            var recipeDto = angular.copy(recipe);
            delete recipeDto.image;
        	return recipeManagementRestService.saveRecipe(recipeDto).then(function(response) {
                var newId = response.data.id;
                if(recipe.image === null) {
                    return response.data;
                }
                else {
                    return recipeManagementRestService.saveRecipePicture(newId, recipe.image).then(function() {
                        return response.data;
                    });
                }
        	});
        },

        getPaginatedRecipes: function (pagenumber, pagesize, searchString) {
            return recipeManagementRestService.getPaginatedRecipes(pagenumber, pagesize, searchString).then(function (response) {
                var promises = [];
                angular.forEach(response.data.result, function(recipe) {
                    var deferred = $q.defer();
                    promises.push(deferred.promise);
                    if(recipe.imageId !== null) {
                        recipeManagementRestService.getRecipePictureBytes(recipe.id).then(function(pResponse) {
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
                    console.log(response.data);
                    return response.data;
                });
            });
        }
    };
});
