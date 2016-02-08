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

    it('should call recipeManagementRestService.getRecipePicture', inject(function () {
        //given
        var id = 'recipeId';
        spyOn(recipeManagementRestService, 'getRecipePicture').and.callThrough();
        //when
        var result = recipeManagementRestService.getRecipePicture(id);
        //then
        expect(recipeManagementRestService.getRecipePicture).toHaveBeenCalledWith(id);
        expect(result).toEqual(contextPath + 'services/rest/recipemanagement/v1/recipe/' + id + '/picture');
    }));

    it('should call $http.get when recipeManagementRestService.getRecipePictureBytes is called', inject(function ($http) {
        //given
        var id = 'recipeId';
        spyOn($http, 'get');
        //when
        recipeManagementRestService.getRecipePictureBytes(id);
        //then
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/' + id + '/picture',
            {
            transformResponse: jasmine.any(Object),
            responseType: 'blob'
        });
    }));

    it('should call $http.get when recipeManagementRestService.getIngredients is called', inject(function ($http) {
        //given
        spyOn($http, 'get');
        //when
        recipeManagementRestService.getIngredients();
        //then
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/ingredient');
    }));

    //Test saveRecipe ToDo
    it('should call $http.post when recipeManagementRestService.saveRecipePicture is called', inject(function ($http) {
        //given
        var id = 'recipeId';
        var image = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/iPCijj//8PAK09SrZrfO6mAAAAAElFTkSuQmCC';
        spyOn($http, 'post');

        //when
        recipeManagementRestService.saveRecipePicture(id,image);
        //then
        expect($http.post).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/' + id + '/picture',jasmine.any(Object),{headers:{'Content-Type': 'multipart/mixed'}});
    }));

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
