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
        recipe = {
            "id":10000000,
            "modificationCounter":0,
            "revision":null,
            "name":"Test",
            "description":"Test",
            "language":null,
            "price":"15.40",
            "imageId":null,
            "author":null,
            "categories":"Test",
            "portions":5,
            "ingredients":"Test",
            "difficulty":"medium",
            "prepTimeMinutes":15,
            "cookTimeMinutes":15,
            "calories":51000,
            "cookingInstructions":"Test"
        },
        recipes,
        receivedrecipe,
        savedrecipe,
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
        },


    mockgetRecipePicture = function () {
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/0/picture').respond(
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/iPCijj//8PAK09SrZrfO6mAAAAAElFTkSuQmCC'
        );
    },

    mockSaveRecipe = function () {
        $httpBackend.whenPOST(contextPath + 'services/rest/recipemanagement/v1/recipe/', recipe).respond(
            {
                "id":10000000,
                "modificationCounter":0,
                "revision":null,
                "name":"Test",
                "description":"Test",
                "language":null,
                "price":"15.40",
                "imageId":null,
                "author":null,
                "categories":"Test",
                "portions":5,
                "ingredients":"Test",
                "difficulty":"medium",
                "prepTimeMinutes":15,
                "cookTimeMinutes":15,
                "calories":51000,
                "cookingInstructions":"Test"
            }
        );
    },

/*    //TODO
    mocksaveRecipePicture = function () {
        $httpBackend.whenPOST(contextPath + '/recipe/0/picture',,{headers:{'Content-Type': 'multipart/mixed'}}).respond(

        )
    },*/

    mockgetRecipe = function () {
        $httpBackend.whenGET(contextPath + 'services/rest/recipemanagement/v1/recipe/0').respond(
            {
                id: 0,
                modificationCounter: 0,
                description: 'Schnitzel Wiener Art',
                imageId : null,
                name: 'Wienerschnitzel',
                price: 7.99,
                revision: null
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
        mockSaveRecipe();
        mockgetRecipe();
        recipes.getPaginatedRecipes(1, 3).then(function (paginatedRecipes) {
            listOfRecipes = paginatedRecipes.result;
        });
        recipes.getRecipe(0).then(function(result){
            receivedrecipe = result.result;
        });
        recipes.saveRecipe(recipe).then(function(result){
            savedrecipe = result.result;
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

    it('uses getRecipe service to receive a recipe from Server', function () {
        expect(receivedrecipe.id).toBe(0);
        expect(receivedrecipe.name).toBe('Wienerschnitzel');
    });

});
