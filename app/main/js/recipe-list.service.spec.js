/**
 * Created by mschwede on 02.11.15.
 */
describe('Module: \'app.main\', Service: \'recipeList\'', function() {
    'use strict';
    var recipeList, $httpBackend, contextPath = '/contextPath/';

    beforeEach(module('app.main', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_recipeList_) {
        recipeList = _recipeList_;

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    }));

    it('load a certain recipe', function(){
        var recipe = {
            description: 'Pasta nach Bolognese Art',
            id: 21,
            imageId: 'http://files.schwedenmut.de/fallback.jpg',
            name: 'Spaghetti',
            price: '8.99'
        }, loadedRecipe;
        //21 is only half of the truth
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/21').respond(recipe);
        // when
        recipeList.loadRecipe(21)
            .then(function (gericht) {
                loadedRecipe = gericht;
            });
        $httpBackend.flush();
        // then
        expect(loadedRecipe).toEqual(recipe);
    });
    it('load list of recipes', function(){
        var recipe = [
            {description: 'Pasta nach Bolognese Art', id: 0, imageId: 'http://files.schwedenmut.de/fallback.jpg', name: 'Spaghetti', price: '8.99'},
            {description: 'Leckere Delikatesse', id: 1, imageId: 'http://files.schwedenmut.de/fallback.jpg', name: 'Kaiserschmarn', price: '7.99'},
            {description: 'Schnitzel Wiener Art', id: 2, imageId: 'http://files.schwedenmut.de/fallback.jpg', name: 'WienerSchnitzel', price: '7.99'}
        ], quantity = 3, loadedRecipeList = [];
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/0').respond(recipe[0]);
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/1').respond(recipe[1]);
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/2').respond(recipe[2]);
        loadedRecipeList = recipeList.loadRecipeList(quantity);
        $httpBackend.flush();
        expect(loadedRecipeList).toEqual(recipe);
    });
});
