describe('Module:recipe-mgmt, Controller: recipe-add', function () {
    'use strict';
    beforeEach(module('app.recipe-mgmt'));

    var addRecipeController,
        allOffersMock = {},
        recipesMock = {},
        $window,
        $scope;


    beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();

            $window = {
                document: jasmine.createSpyObj('document', ['getElementById'])
            };

            var mockHtmlElement = document.createElement('div');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockHtmlElement);

            addRecipeController = $controller('RecipeAddCntl', {
                $scope: $scope, offers: allOffersMock, recipes: recipesMock, $window: $window
            });

            $scope.recipe = {
                id: null,
                name: null,
                description: null,
                language: null,
                price: null,
                ingredients: null,
                cookingInstructions: null,
                portions: null,
                cookTimeMinutes: null,
                prepTimeMinutes: null,
                difficulty: null,
                calories: null,
                category: null,
                image: null
            };
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
