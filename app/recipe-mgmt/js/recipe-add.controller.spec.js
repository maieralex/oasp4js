describe('Module:recipe-mgmt, Controller: recipe-add', function () {
    'use strict';
    beforeEach(module('app.recipe-mgmt'));

    var $scope;

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
            $scope = $rootScope.$new();

            $rootScope.editRecipe = {
                id: 786,
                name: 'Burger',
                description: 'with Cheese',
                language: 'de',
                price: '39,41',
                recipeIngredients: [],
                cookingInstructions: 'bake bread, be glad',
                portions: 2,
                cookTimeMinutes: 8,
                prepTimeMinutes: 5,
                difficulty: 'easy',
                calories: 1483,
                category: {"id":3,"name":"Fisch","language":"de","languageId":3},
                image: null,
                rating: 0
            };


            var $window = {
                document: jasmine.createSpyObj('document', ['getElementById'])
            };

            var mockHtmlElement = document.createElement('div');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockHtmlElement);

            $controller('RecipeAddCntl', {
                $scope: $scope, recipes: recipes, categories:categories
            });

        }
    ));

    describe('testing $scope variables and functions', function () {
        it('should check the init recipe object and its properties', function () {
            expect($scope.recipe.id).toEqual(786);
            expect($scope.recipe.name).toEqual('Burger');
            expect($scope.recipe.description).toEqual('with Cheese');
            expect($scope.recipe.language).toEqual('de');
            expect($scope.recipe.price).toEqual('39,41');
            expect($scope.recipe.cookingInstructions).toEqual('bake bread, be glad');
            expect($scope.recipe.portions).toEqual(2);
            expect($scope.recipe.cookTimeMinutes).toEqual(8);
            expect($scope.recipe.prepTimeMinutes).toEqual(5);
            expect($scope.recipe.calories).toEqual(1483);
            expect($scope.recipe.difficulty).toEqual('easy');
            expect($scope.recipe.category).toEqual({"id":3,"name":"Fisch","language":"de","languageId":3});
            expect($scope.recipe.image).toBeNull();
        });


        it('should check the existence and execution of adding a recipe functionality', function () {
            expect($scope.saveRecipe).toBeDefined();
            spyOn($scope, 'saveRecipe');
            expect($scope.saveRecipe).not.toHaveBeenCalled();
            $scope.saveRecipe(null);
            expect($scope.saveRecipe).toHaveBeenCalled();
        });

        it('should check updateCosts function', function () {
            expect($scope.updateCosts).toBeDefined();
            spyOn($scope,'updateCosts');
            expect($scope.updateCosts).not.toHaveBeenCalled();
            $scope.updateCosts();
            expect($scope.updateCosts).toHaveBeenCalled();

        });

        it('should check emptyIngredientExists function', function () {
            expect($scope.emptyIngredientExists).toBeDefined();
            spyOn($scope,'emptyIngredientExists');
            expect($scope.emptyIngredientExists).not.toHaveBeenCalled();
            $scope.emptyIngredientExists();
            expect($scope.emptyIngredientExists).toHaveBeenCalled();

        });

        it('should check addIngredient function', function () {
            expect($scope.addIngredient).toBeDefined();
            spyOn($scope,'addIngredient');
            expect($scope.addIngredient).not.toHaveBeenCalled();
            $scope.addIngredient();
            expect($scope.addIngredient).toHaveBeenCalled();

        });

        it('should check ingredientAddControls function', function () {
            expect($scope.ingredientAddControls).toBeDefined();
            spyOn($scope,'ingredientAddControls');
            expect($scope.ingredientAddControls).not.toHaveBeenCalled();
            $scope.ingredientAddControls({keyCode:13});
            expect($scope.ingredientAddControls).toHaveBeenCalled();

        });

        it('should check ingredientControls function', function () {
            expect($scope.ingredientControls).toBeDefined();
            spyOn($scope,'ingredientControls');
            expect($scope.ingredientControls).not.toHaveBeenCalled();
            $scope.ingredientControls({keyCode:38,shiftKey:true},{position:2,length:15});
            expect($scope.ingredientControls).toHaveBeenCalled();

        });

        it('should check ', function () {

        });

        it('should check ', function () {

        });

        it('should check ', function () {

        });
    });
});
