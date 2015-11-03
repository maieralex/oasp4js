describe('Modul:recipe-mgmt, Controller: add recipe',function() {
    'use strict';
    beforeEach(module('app.recipe-mgmt'));

    var addRecipeController,
        /*
        mockRecipes = {
            saveRecipes: function(){
                return 'OK';
            }
        },*/
        scope;

    beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            //recipes =  mockRecipes;
            addRecipeController = $controller('RecipeAddCntl',{
                $scope: scope
            });
        }
    ));

    it('should check the init recipe name', function() {
        expect(scope.recipeName).not.toBeNull();
        expect(scope.recipeName).toBe('');
    });

    it('should check the init recipe description', function() {
        expect(scope.recipeDescription).not.toBeNull();
        expect(scope.recipeDescription).toBe('');
    });
    it('should check the init recipe price', function() {
        expect(scope.recipePrice).not.toBeNull();
        expect(scope.recipePrice).toBe('');
    });
    it('should check the init recipe image is be null', function() {
        expect(scope.recipeImage).toBeNull();
    });

    it('should check the set recipe name', function() {
        scope.recipeName = 'MyRecipe';
        expect(scope.recipeName).not.toBeNull();
        expect(scope.recipeName).toBe('MyRecipe');
    });
    it('should check the set recipe description', function() {
        scope.recipeDescription = 'MyRecipe description';
        expect(scope.recipeDescription).not.toBeNull();
        expect(scope.recipeDescription).toBe('MyRecipe description');
    });
    it('should check the set recipe price', function() {
        scope.recipePrice = '6.5';
        expect(scope.recipePrice).not.toBeNull();
        expect(scope.recipePrice).toBe('6.5');
    });


    /*
     it('should check the set recipe image', function() {
     expect(scope.recipeImage).not.toBeNull();
     expect(scope.recipeImage).toBe('');
     });
     */

    it('should check the existence and execution of adding a recipe functionality', function() {
        expect(scope.saveRecipe).not.toBe(null);
        expect(scope.saveRecipe).toBeDefined();

        spyOn(scope,'saveRecipe');
        scope.saveRecipe(null);
        expect(scope.saveRecipe).toHaveBeenCalled();
    });

});
