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

        /**
         * Created by Marc Schwede on 14.12.2015.
         * Functionality to change recipies with inline editing - without beeing able to change the image.
         * @param recipe
         */
        updateRecipe: function(recipe) {
            var recipeDto = angular.copy(recipe);
            delete recipeDto.image;
            return recipeManagementRestService.saveRecipe(recipeDto).then(function(response) {
                return response.data;
            });
        },
        
        getPaginatedRecipes: function (pagenumber, pagesize, search) {
            return recipeManagementRestService.getPaginatedRecipes(pagenumber, pagesize, search).then(function (response) {
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
                    return response.data;
                });
            });
        },
        /**
         * Created by Marc Schwede on 20.12.2015.
         * Return a paginated list like getPaginatedRecipes with the difference, that the recipe.image doesn't contain the raw base64 data. Instead it includes the URI where the image can be found.
         * @param pagenumber
         * @param pagesize
         * @param search
         * @returns {*}
         */
        getPaginatedRecipesWithURL: function (pagenumber, pagesize, search) {
            return recipeManagementRestService.getPaginatedRecipes(pagenumber, pagesize, search).then(function (response) {
                var promises = [];
                angular.forEach(response.data.result, function (recipe) {
                    var deferred = $q.defer();
                    promises.push(deferred.promise);
                    if (recipe.imageId != null) {
                        recipe.image = recipeManagementRestService.getRecipePicture(recipe.imageId);
                    }
                    deferred.resolve();
                });
                    return $q.all(promises).then(function() {
                        return response.data;
                    });
            });
        },

        getIngredients: function() {
            return recipeManagementRestService.getIngredients().then( function (response) {
                return response.data;
            });
        },
        getCosts: function(ingredients) {
            return recipeManagementRestService.getCosts(ingredients).then( function (response) {
                return response.data;
            });
        }
    };
});
