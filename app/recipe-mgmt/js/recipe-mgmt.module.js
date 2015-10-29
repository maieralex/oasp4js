/**
 * Created by TH-Koeln on 20.10.2015.
 */
angular.module('app.recipe-mgmt', ['app.main'])
    .config(function ($routeProvider, oaspTranslationProvider) {
        'use strict';
		oaspTranslationProvider.enableTranslationForModule('recipe-mgmt');
        $routeProvider.when('/recipe-mgmt/recipe-add', {
            templateUrl: 'recipe-mgmt/html/recipe-add.html',
            controller: 'RecipeAddCntl',
            resolve: {
                currentPositions: ['positions', function (positions) {
                    return positions.get();
                }]
            }
        });
    });

