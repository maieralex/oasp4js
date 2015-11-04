/**
 * Created by mschwede on 02.11.15.
 */
describe('Module: app.main, Service: gerichteListeRestService', function () {
    'use strict';
    var gerichteListeRestService, contextPath = '/contextPath/';

    beforeEach(module('app.main', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_gerichteListeRestService_) {
        gerichteListeRestService = _gerichteListeRestService_;
        }));

    it('should call $http.get when gerichteListeRestService.getRecipe is called', inject(function ($http) {
        var params = {id: '0'};
        spyOn($http, 'get');
        gerichteListeRestService.getRecipe(params);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+params);
    }));

    it('should call $http.get when gerichteListeRestService.getRecipePicture is called', inject(function ($http) {
        var params = {id: '0'};
        spyOn($http, 'get');
        gerichteListeRestService.getRecipePicture(params);
        expect($http.get).toHaveBeenCalledWith(contextPath + 'services/rest/recipemanagement/v1/recipe/'+params+'/picture');
    }));
});
