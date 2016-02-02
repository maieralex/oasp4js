/**
 * Created by mschwede on 28.10.15.
 */

angular.module('app.main').directive('menu', function($window){
    'use strict';
    return function (scope, element) {
        element.height($($window).height() - $('.navbar-fixed-top').outerHeight() - '100');
    };
});

/**
 * directive to change the menu items to fit the screen.
 * not refering to mobile devices!
 */
angular.module('app.main').directive('menuitem', function($window){
    'use strict';
    return function (scope, element) {
        element.height(($($window).height() - $('.navbar-fixed-top').outerHeight() - '100')/ scope.quantity);
    };
});
