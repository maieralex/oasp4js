/**
 * Created by Alexander Wecker on 09.11.15.
 */

angular.module('app.recipe-mgmt').directive('recipeListMaxHeight', function ($window, $document) {
    'use strict';
    return function (scope, element) {
        var w = angular.element($window);

        var navbarHeight = $('.navbar-fixed-top').outerHeight(true);
        var spaceholderHeight = angular.element($document[0].querySelector('#spacerTop')).outerHeight(true);
        var toolbarHeight = angular.element($document[0].querySelector('#recipeListToolbar')).outerHeight(true);
        var paginationHeight = 70; // unable to get height
        var oaspFooterHrHeight = angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true);
        var oaspFooterHeight = angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true);
        var correction = 10; // extra

        var changeHeight = function() {
            element.css('height', (w.height()
                - $('.navbar-fixed-top').outerHeight(true)
                - angular.element($document[0].querySelector('#spacerTop')).outerHeight(true)
                - angular.element($document[0].querySelector('#recipeListToolbar')).outerHeight(true)
                - angular.element($document[0].querySelector('#recipeListPag')).outerHeight(true)
                - angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true)
                - angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true)
                - correction) + 'px' );
        };

        w.bind('resize', function () {
            changeHeight();   // when window size gets changed
        });

        changeHeight(); // when page loads
    };
});

angular.module('app.recipe-mgmt').directive('sidebarMaxHeight', function ($window, $document) {
    'use strict';
    return function (scope, element) {
        var w = angular.element($window);
        
        var navbarHeight = $('.navbar-fixed-top').outerHeight(true);
        var spaceholderHeight = angular.element($document[0].querySelector('#spacerTop')).outerHeight();
        var oaspFooterHrHeight = angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true);
        var oaspFooterHeight = angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true);
        var correction = 30; // 20 margin-bottom (pagination) + 10 extra

        var changeHeight = function() {
            element.css('height', (w.height()
                - $('.navbar-fixed-top').outerHeight(true)
                - angular.element($document[0].querySelector('#spacerTop')).outerHeight(true)
                - angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true)
                - angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true)
                - correction) + 'px' );
        };

        w.bind('resize', function () {
            changeHeight();   // when window size gets changed
        });

        changeHeight(); // when page loads
    };
});
