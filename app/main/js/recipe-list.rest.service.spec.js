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
        var params = {id: '0'};
        spyOn($http, 'get');
        recipeListRestService.getRecipe(params);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+params);
    }));

    it('should call $http.get when recipeListRestService.getRecipePicture is called', inject(function ($http) {
        var params = {id: '0'};
        spyOn($http, 'get');
        recipeListRestService.getRecipePicture(params);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+params+'/picture');
    }));
});
