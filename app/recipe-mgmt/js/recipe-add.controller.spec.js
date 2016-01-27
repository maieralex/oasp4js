describe('Module:recipe-mgmt, Controller: recipe-add', function () {
    'use strict';
    beforeEach(module('app.recipe-mgmt'));

    module(function ($provide) {

        //mocking recipes service
        $provide.value('recipes', {
            getRecipe: function (recipeId) {
            },
            saveRecipe: function (recipe) {
                return {
                    then: function (callback) {

                    }
                };
            },
            updateRecipe: function (recipe) {
            },
            getPaginatedRecipes: function (pagenumber, pagesize, search) {
            },
            getPaginatedRecipesWithURL: function (pagenumber, pagesize, search) {
            },
            getIngredients: function () {
                return {
                    then: function (callback) {
                        return callback([{"id":1,"modificationCounter":0,"revision":null,"name":"Pfeffer"},
                            {"id":2,"modificationCounter":0,"revision":null,"name":"Salz"}]);
                    }
                };
            },
            getCosts: function (ingredients) {
                return {
                    then: function (callback) {

                    }
                };
            }
        });

        //mocking category service
        $provide.value('categories', {
            getAllCategories: function (language) {
                return {
                    then: function(callback) {
                        return callback([{"id":7,"modificationCounter":0,"revision":null,"name":"Appetizer","language":"en","languageId":0},
                            {"id":8,"modificationCounter":0,"revision":null,"name":"Snacks","language":"en","languageId":1},
                            {"id":9,"modificationCounter":0,"revision":null,"name":"Grilled","language":"en","languageId":2},
                            {"id":10,"modificationCounter":0,"revision":null,"name":"Fish","language":"en","languageId":3},
                            {"id":11,"modificationCounter":0,"revision":null,"name":"Pasta","language":"en","languageId":4},
                            {"id":12,"modificationCounter":0,"revision":null,"name":"Pizza","language":"en","languageId":5},
                            {"id":13,"modificationCounter":0,"revision":null,"name":"Dessert","language":"en","languageId":6}]);
                    }
                }
            }
        })

    });


    beforeEach(inject(function ($rootScope, $controller, recipes, categories) {
            var $scope = $rootScope.$new();

            $rootScope.editRecipe = {
                id: null,
                name: null,
                description: null,
                language: null,
                price: null,
                recipeIngredients: [],
                cookingInstructions: null,
                portions: null,
                cookTimeMinutes: null,
                prepTimeMinutes: null,
                difficulty: null,
                calories: null,
                category: {name:"Testkategorie"},
                image: null,
                rating: null
            };


            var $window = {
                document: jasmine.createSpyObj('document', ['getElementById'])
            };

            var mockHtmlElement = document.createElement('div');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockHtmlElement);

            $controller('RecipeAddCntl', {
                $scope: $scope, recipes: recipes, categories:categories
            });
            console.log($scope);
        }
    ));

    describe('testing $scope variables and functions', function () {
        it('should check the init recipe object and its properties', function () {
            expect($scope.recipe.id).toBeNull();
            expect($scope.recipe.name).toBeNull();
            expect($scope.recipe.description).toBeNull();
            expect($scope.recipe.language).toBeNull();
            expect($scope.recipe.price).toBeNull();
            expect($scope.recipe.ingredients).toBeNull();
            expect($scope.recipe.cookingInstructions).toBeNull();
            expect($scope.recipe.portions).toBeNull();
            expect($scope.recipe.cookTimeMinutes).toBeNull();
            expect($scope.recipe.difficulty).toBeNull();
            expect($scope.recipe.calories).toBeNull();
            expect($scope.recipe.category).toBeNull();
            expect($scope.recipe.image).toBeNull();
        });

        it('should check the setting of recipe properties', function () {
            $scope.recipe = {
                id: 2,
                name: 'MyRecipe',
                description: 'My fancy description',
                language: 'en',
                price: 12.5,
                ingredients: 'Some ingredients',
                cookingInstructions: 'just cook it',
                portions: 3,
                cookTimeMinutes: 20,
                prepTimeMinutes: 10,
                difficulty: 'easy',
                calories: 250,
                category: {
                    id: 0,
                    languageId: 0,
                    modificationCounter: 0,
                    name: 'Vorspeisen',
                    language: 'de'
                },
                image: '/imagePath'
            };

            expect($scope.recipe.id).toBe(2);
            expect($scope.recipe.name).toBe('MyRecipe');
            expect($scope.recipe.description).toBe('My fancy description');
            expect($scope.recipe.language).toBe('en');
            expect($scope.recipe.price).toBe(12.5);
            expect($scope.recipe.ingredients).toBe('Some ingredients');
            expect($scope.recipe.cookingInstructions).toBe('just cook it');
            expect($scope.recipe.portions).toBe(3);
            expect($scope.recipe.cookTimeMinutes).toBe(20);
            expect($scope.recipe.prepTimeMinutes).toBe(10);
            expect($scope.recipe.difficulty).toBe('easy');
            expect($scope.recipe.calories).toBe(250);
            expect($scope.recipe.category.id).toBe(0);
            expect($scope.recipe.image).toBe('/imagePath');
        });

        it('should check the existence and execution of adding a recipe functionality', function () {
            expect($scope.saveRecipe).not.toBe(null);
            expect($scope.saveRecipe).toBeDefined();

            spyOn($scope, 'saveRecipe');
            expect($scope.saveRecipe).not.toHaveBeenCalled();
            $scope.saveRecipe(null);
            expect($scope.saveRecipe).toHaveBeenCalled();
        });
    });
});
