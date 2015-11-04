/*globals oasp*/
describe('Service: recipes', function () {
    'use strict';
    var recipeSearchCriteria = {
            pagination: {
                size: 3,
                page: 1,
                total: true
            }
        },
        recipes,
        $httpBackend,
        listOfRecipes,
        contextPath = '/oasp-app/',
        mockPaginatedRecipeResponse = function () {
            $httpBackend.whenPOST(contextPath + 'services/rest/recipemanagement/v1/recipe/search', recipeSearchCriteria).respond(
                {
                    pagination: {
                        size: 3,
                        page: 1,
                        total: 5
                    },
                    result: [
                        {
                            id: 0,
                            modificationCounter: 0,
                            description: 'Schnitzel Wiener Art',
                            imageId : null,
                            name: 'Wienerschnitzel',
                            price: 7.99,
                            revision: null
                        },
                        {
                            id: 1,
                            modificationCounter: 0,
                            description: 'Super Suppe',
                            imageId : null,
                            name: 'Suppe',
                            price: 2.99,
                            revision: null
                        },
                        {
                            id: 2,
                            modificationCounter: 0,
                            description: 'Pommes RotWeiss',
                            imageId : null,
                            name: 'Pommes',
                            price: 0.95,
                            revision: null
                        }
                    ]
                }
            );
        };

    beforeEach(module('app.recipe-mgmt'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
        });

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            recipes = $injector.get('recipes');
        });
    });
    beforeEach(function () {
        // given // when
        mockPaginatedRecipeResponse();
        recipes.getPaginatedRecipes(1, 3).then(function (paginatedRecipes) {
            listOfRecipes = paginatedRecipes.result;
        });
        $httpBackend.flush();

    });
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('loads recipes from server', function () {
        // then
        expect(listOfRecipes.length).toBe(3);
        expect(listOfRecipes[0].id).toEqual(0);

    });

});
