/**
 * Created by mschwede on 02.11.15.
 */
describe('Module: \'app.main\', Service: \'gerichteListe\'', function() {
    'use strict';
    var gerichteListe, $httpBackend, contextPath = '/contextPath/';

    beforeEach(module('app.main', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_gerichteListe_) {
        gerichteListe = _gerichteListe_;

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    }));

    it('load a certain recipe', function(){
        var gericht = {
            description: "Pasta nach Bolognese Art",
            id: 21,
            imageId: "http://files.schwedenmut.de/fallback.jpg",
            name: "Spaghetti",
            price: "8.99"
        }, loadedGericht
        //21 is only half of the truth
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/21').respond(gericht);
        // when
        gerichteListe.loadRecipe(21)
            .then(function (gericht) {
                loadedGericht = gericht;
            });
        $httpBackend.flush();
        // then
        expect(loadedGericht).toEqual(gericht);
    });
    it('load list of recipes', function(){
        var gerichte = [
            {description: "Pasta nach Bolognese Art", id: 0, imageId: "http://files.schwedenmut.de/fallback.jpg", name: "Spaghetti", price: "8.99"},
            {description: "Leckere Delikatesse", id: 1, imageId: "http://files.schwedenmut.de/fallback.jpg", name: "Kaiserschmarn", price: "7.99"},
            {description: "Schnitzel Wiener Art", id: 2, imageId: "http://files.schwedenmut.de/fallback.jpg", name: "WienerSchnitzel", price: "7.99"}
        ], quantity = 3, loadedGerichteListe = [];
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/0').respond(gerichte[0]);
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/1').respond(gerichte[1]);
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/2').respond(gerichte[2]);
        loadedGerichteListe = gerichteListe.loadGerichteListe(quantity);
        $httpBackend.flush();
        expect(loadedGerichteListe).toEqual(gerichte);
    })
})
