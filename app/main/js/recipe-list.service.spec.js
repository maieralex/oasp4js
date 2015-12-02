/**
 *
 */
describe('Module: \'app.main\', Service: \'recipeList\'', function() {
    'use strict';
    var recipeList, $httpBackend, contextPath = '/contextPath/';

    beforeEach(module('app.main', function ($provide) {
        $provide.value('currentContextPath', oasp.mock.currentContextPathReturning(contextPath));
    }));

    beforeEach(inject(function (_recipeList_) {
        recipeList = _recipeList_;

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    }));


});
