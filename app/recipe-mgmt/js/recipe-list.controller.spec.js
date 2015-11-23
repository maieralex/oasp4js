describe('Modul:recipe-mgmt, Controller: recipe-list',function() {
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
                document:jasmine.createSpyObj('document',['getElementById'])
            };

            var mockHtmlElement = window.document.createElement('div');
            $window.document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(mockHtmlElement);

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
                categories: null,
                image: null
            };

            $scope.selectedRecipes = [];
            $scope.sidebarIsVisible = false;
        }
    ));

    describe('testing $scope variables and functions', function () {
        it('should check the init recipe object and its properites', function () {
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
            expect($scope.recipe.categories).toBeNull();
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
                categories: 'default categories',
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
            expect($scope.recipe.categories).toBe('default categories');
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
                categories: 'default categories',
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
                categories: 'default categories',
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

    /*it('should check the existence and execution of adding a recipe functionality', function () {
        expect($scope.saveRecipe).not.toBe(null);
        expect($scope.saveRecipe).toBeDefined();

        spyOn($scope, 'saveRecipe');
        expect($scope.saveRecipe).not.toHaveBeenCalled();
        $scope.saveRecipe(null);
        expect($scope.saveRecipe).toHaveBeenCalled();
    });*/
});
