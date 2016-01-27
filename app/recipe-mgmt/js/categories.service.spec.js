describe('Service: categories', function () {
    'use strict';
    var contextPath = '/oasp-app/',
        language = 'de',
        mockGetAllCategories = function () {
            $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/categories/' + language).respond(
                [
                    {
                        id: 0,
                        languageId: 0,
                        modificationCounter: 0,
                        name: 'Vorspeisen',
                        language: 'de'
                    },
                    {
                        id: 1,
                        languageId: 1,
                        modificationCounter: 0,
                        name: 'Für den kleinen Hunger',
                        language: 'de'
                    },
                    {
                        id: 2,
                        languageId: 2,
                        modificationCounter: 0,
                        name: 'Vom Grill',
                        language: 'de'
                    },
                    {
                        id: 3,
                        languageId: 3,
                        modificationCounter: 0,
                        name: 'Fisch',
                        language: 'de'
                    },
                ]
            )
        },
        categories,
        allCategories,
        $httpBackend;

    beforeEach(module('app.recipe-mgmt'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
        });

        inject(function ($injector) {
            categories = $injector.get('categories');
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    beforeEach(function () {
        mockGetAllCategories();
        categories.getAllCategories('de').then(function (response) {
            allCategories = response;
        });
        $httpBackend.flush();
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('loads all categories from server', function () {
        expect(allCategories.length).toBe(4);
        expect(allCategories[3].id).toEqual(3);
    });
});
