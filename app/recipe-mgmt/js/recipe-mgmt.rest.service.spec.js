/*globals oasp*/
describe('Module: recipeMgmt, Service: recipeManagementRestService', function () {
    'use strict';
    var recipeManagementRestService, contextPath = '/contextPath/';

    beforeEach(module('app.recipe-mgmt', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_recipeManagementRestService_) {
        recipeManagementRestService = _recipeManagementRestService_;
    }));

    it('should call $http.get when recipeManagementRestService.getRecipe is called', inject(function ($http) {
        //given
        var id = 'recipeId';
        spyOn($http, 'get');
        //when
        recipeManagementRestService.getRecipe(id);
        //then
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/' + id);
    }));

    //Test saveRecipe ToDo

    it('should call $http.post when recipeManagementRestService.getPaginatedRecipes is called', inject(function ($http) {
        //given
        spyOn($http, 'post');
        //when
        recipeManagementRestService.getPaginatedRecipes(1, 3);
        //then
        expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/search',
            {
                pagination: {
                    size: 3,
                    page: 1,
                    total: true
                },
                searchString: undefined
            });
    }));

});
