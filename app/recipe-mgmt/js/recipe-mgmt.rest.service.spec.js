describe('Module: recipeMgmt, Service: recipeManagementRestService', function () {
    'use strict';
    var recipeManagementRestService, contextPath = '/contextPath/', search = {};

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

        search.searchString = '';
        search.selectedCategories = [];
        search.price = {
            min: 0,
            max: 30
        };
        search.rating = {
            min: 1,
            max: 5
        };

        recipeManagementRestService.getPaginatedRecipes(1, 3, search);
        //then
        expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/search',
            {
                pagination: {
                    size: 3,
                    page: 1,
                    total: true
                },
                searchString: '',
                categories: [],
                priceFrom: 0,
                priceTo: 30,
                ratingFrom: 1,
                ratingTo: 5
            });
    }));

    it('should call $http.get when recipeManagementRestService.getAllCategories is called', inject(function ($http) {
        //given
        var language = 'de';
        spyOn($http, 'get');
        //when
        recipeManagementRestService.getAllCategories(language);
        //then
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/categories/' + language);
    }));

});
/*globals oasp*/
