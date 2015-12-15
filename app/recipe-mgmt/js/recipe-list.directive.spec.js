/**
 * Created by mschwede on 14.12.15.
 */
describe('Module:recipe-mgmt, Directive: contenteditable', function () {
    //ToDo check if modificationCounter increases.
    //ToDo check if data really changes.
    var elm, scope, createController;

    beforeEach(module('app.recipe-mgmt'));
    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element('<text contenteditable="true">test</text>');
        scope = $rootScope;
        $compile(elm)(scope);
        createController = function() {
            return $controller('ngModel', {
                '$scope': scope
            });
        };
        createController();
        scope.$digest();
    }));

    it('should check if there is something', inject(function($compile, $rootScope) {
        expect(elm.html().toEqual('test'));
    }));
});
