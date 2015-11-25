/**
 * Created by mschwede on 02.11.15.
 */
describe('Module: app.main, Service: recipeListRestService', function () {
    'use strict';
    var recipeListRestService, contextPath = '/contextPath/';

    beforeEach(module('app.main', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_recipeListRestService_) {
        recipeListRestService = _recipeListRestService_;
        }));

    it('should call $http.get when recipeListRestService.getRecipe is called', inject(function ($http) {
        var id = 0;
        spyOn($http, 'get');
        recipeListRestService.getRecipe(id);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+ id);
    }));

    it('should call $http.get when recipeListRestService.getRecipePictureBytes is called', inject(function ($http) {
        var params = {id: '0'};
        spyOn($http, 'get');
        recipeListRestService.getRecipePictureBytes(params);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+params+'/picture', {
            transformResponse: [function (data) {
                return data;
            }],
            responseType: 'blob'
        });
    }));

    it('should call $http.get when recipeListRestService.getRandomRecipe is called', inject(function ($http) {
        var params;
        params = {numberOfEntities: '3', languageFlag: 'EN'};
        spyOn($http, 'get');
        recipeListRestService.getRandomRecipes(params.numberOfEntities, params.languageFlag);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/randomList/'+ params.numberOfEntities + '/' + params.languageFlag);
    }));
});
