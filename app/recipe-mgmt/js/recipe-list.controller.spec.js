describe('Module:recipe-mgmt, Controller: recipe-list',function() {
    'use strict';
    beforeEach(module('app.recipe-mgmt'));

    var recipeListController,
        offersMock = {},
        recipesMock = {},
        $modal,
        $window,
        $scope;

    beforeEach(inject(function($rootScope, $controller){
            $scope = $rootScope.$new();

            $window = {
                //location: jasmine.createSpyObj('location', ['href', 'reload']),
                document: jasmine.createSpyObj('document',['getElementById'])
            };

            var mockHtmlElement = document.createElement('div');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockHtmlElement);

            recipeListController = $controller('RecipeListCntl',{
                $scope: $scope, offers: offersMock, recipes: recipesMock, $window: $window, $modal: $modal
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

            $scope.selectedRecipes = [];
            $scope.sidebarIsVisible = false;
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

        it('should check the selected-recipes-array and functions', function () {
            $scope.recipe0 = {
                id: 2,
                name: 'MyRecipe 0',
                description: 'My fancy description 0',
                language: 'en',
                price: 12.5,
                ingredients: 'Some ingredients0',
                cookingInstructions: 'just cook it 0',
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

            $scope.recipe1 = {
                id: 4,
                name: 'MyRecipe 1',
                description: 'My fancy description 1',
                language: 'en',
                price: 14.5,
                ingredients: 'Some ingredients 1',
                cookingInstructions: 'just cook it 1',
                portions: 4,
                cookTimeMinutes: 30,
                prepTimeMinutes: 20,
                difficulty: 'easy',
                calories: 2500,
                category: {
                    id: 0,
                    languageId: 0,
                    modificationCounter: 0,
                    name: 'Vorspeisen',
                    language: 'de'
                },
                image: '/imagePath'
            };

            expect($scope.sidebarIsVisible).toBe(false);
            expect($scope.selectedRecipes).not.toBeNull();
            expect($scope.selectedRecipes.length).toBe(0);

            // single selection
            $scope.selectRecipe($scope.recipe0, false);
            expect($scope.sidebarIsVisible).toBe(true);
            expect($scope.selectedRecipes.length).toBe(1);
            expect($scope.selectedRecipes[0].id).toBe(2);
            $scope.selectRecipe($scope.recipe1, false);
            expect($scope.selectedRecipes.length).toBe(1);
            expect($scope.selectedRecipes[0].id).toBe(4);

            // multi selection
            $scope.selectedRecipes = [];
            $scope.selectRecipe($scope.recipe0, true);
            expect($scope.selectedRecipes.length).toBe(1);
            $scope.selectRecipe($scope.recipe1, true);
            expect($scope.selectedRecipes.length).toBe(2);
            expect($scope.selectedRecipes[0].id).toBe(2);
            expect($scope.selectedRecipes[1].id).toBe(4);
            $scope.selectRecipe($scope.recipe0, true);
            expect($scope.selectedRecipes.length).toBe(1);
            expect($scope.selectedRecipes[0].id).toBe(4);
        });
    });

    it('Should get the default number per page',function(){
       expect($scope.numPerPage).toBe(5);
    });
    it('Should set the number per page',function(){
        $scope.numPerPage = 3;
       expect($scope.numPerPage).toBe(3);
    });

    it('Should get the default current page value',function(){
        expect($scope.currentPage).toBe(1);
    });
    it('Should set the current page value',function(){
        $scope.currentPage = 4;
        expect($scope.currentPage).toBe(4);
    });

    it('Should get the default totalItems value', function(){
        expect($scope.totalItems).toBe(5);
    });
    it('Should set the totalItems value', function(){
        $scope.totalItems = 42;
        expect($scope.totalItems).toBe(42);
    });

    it('Should check the default recipe list size and entry',function(){
        expect($scope.recipesList.length).toBe(0);
    });
    it('Should add a recipe to the recipe list',function(){
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
        $scope.recipesList.push($scope.recipe);
        expect($scope.recipesList.length).toBe(1);
        expect($scope.recipesList[0]).toBe($scope.recipe);
    });

});
