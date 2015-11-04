angular.module('app.recipe-mgmt').factory('recipes', function (recipeManagementRestService, $q) {
    'use strict';
    var paginatedRecipes = {};

    return {
        getRecipe: function (recipeId) {
            return recipeManagementRestService.getRecipe(recipeId).then(function (response) {
                if(response.data.pictureId !== null) {
                    return recipeManagementRestService.getRecipePictureBytes(recipeId).then(function(pResponse) {
                        return pResponse.data;
                    }).then(function(pictureData) {
                        var deferred = $q.defer();
                        var reader = new FileReader();
                        reader.onloadend = function(picture) {
                            response.data.image = picture.target.result;
                            deferred.resolve(response.data);
                        };
                        reader.readAsDataURL(new Blob([pictureData], {type:'image/png'}));
                        return deferred.promise;
                    });
                }
                else
                    return response.data;
            });
        },
        saveRecipe: function(recipe) {
            var image = recipe.image;
            delete recipe.image;
        	return recipeManagementRestService.saveRecipe(recipe).then(function(response) {
        		return response.data;
        	});
        },

        getPaginatedRecipes: function (pagenumber, pagesize) {
            return recipeManagementRestService.getPaginatedRecipes(pagenumber, pagesize).then(function (response) {
                var promises = [];
                for(var i = 0; i < response.data.result.length; i++) {
                    var currentIndex = i;
                    var deferred = $q.defer();
                    promises.push(deferred.promise);
                    if(response.data.result[i].imageId !== null) {
                        recipeManagementRestService.getRecipePictureBytes(response.data.result[i].id).then(function(pResponse) {
                            return pResponse.data;
                        }).then(function(pictureData) {
                            var reader = new FileReader();
                            reader.onloadend = function(picture) {
                                response.data.result[currentIndex].image = picture.target.result;
                                deferred.resolve(response.data);
                            };
                            reader.readAsDataURL(new Blob([pictureData], {type:'image/png'}));
                        });
                    }
                    else {
                        deferred.resolve();
                    }
                }
                return $q.all(promises).then(function() {
                    return response.data;
                });
            });
        }
    };
});
