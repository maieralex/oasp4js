/**
 * Created by Alexander Wecker on 09.11.15.
 */

angular.module('app.recipe-mgmt').directive('recipeListMaxHeight', function ($window, $document) {
    'use strict';
    return function (scope, element) {
        var w = angular.element($window);

        /*var navbarHeight = $('.navbar-fixed-top').outerHeight(true);
        var spaceholderHeight = angular.element($document[0].querySelector('#spacerTop')).outerHeight(true);
        var toolbarHeight = angular.element($document[0].querySelector('#recipeListToolbar')).outerHeight(true);
        var paginationHeight = 70; // unable to get height
        var oaspFooterHrHeight = angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true);
        var oaspFooterHeight = angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true);
        */
        var correction = 10; // extra

        var changeHeight = function() {
            element.css('height', (w.height() -
                $('.navbar-fixed-top').outerHeight(true) - 
                angular.element($document[0].querySelector('#spacerTop')).outerHeight(true) - 
                angular.element($document[0].querySelector('#recipeListToolbar')).outerHeight(true) - 
                angular.element($document[0].querySelector('#recipeListPag')).outerHeight(true) - 
                angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true) - 
                angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true) - 
                correction) + 'px' );
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
        
        /*var navbarHeight = $('.navbar-fixed-top').outerHeight(true);
        var spaceholderHeight = angular.element($document[0].querySelector('#spacerTop')).outerHeight();
        var oaspFooterHrHeight = angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true);
        var oaspFooterHeight = angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true);
        */
        var correction = 30; // 20 margin-bottom (pagination) + 10 extra

        var changeHeight = function() {
            element.css('height', (w.height() - 
                $('.navbar-fixed-top').outerHeight(true) - 
                angular.element($document[0].querySelector('#spacerTop')).outerHeight(true) - 
                angular.element($document[0].querySelector('#oaspFooterHr')).outerHeight(true) - 
                angular.element($document[0].querySelector('#oaspFooter')).outerHeight(true) - 
                correction) + 'px' );
        };

        w.bind('resize', function () {
            changeHeight();   // when window size gets changed
        });

        changeHeight(); // when page loads
    };
});
//compare to https://docs.angularjs.org/guide/forms
angular
    .module('app.recipe-mgmt')
    .directive(
        'contenteditable',
        function() {
            'use strict';
            return {
                require: 'ngModel',
                link: function($scope, elm, attrs, ctrl) {
                    elm.on('blur', function() {
                        ctrl.$setViewValue(elm.html());
                        $scope.updateRecipe($scope.selectedRecipes[0]);
                        //$scope.recipesList.clear;
                        //$scope.reloadRecipes();
                        //console.log($scope.selectedRecipes[0]);
                    });
                    ctrl.$render = function () {
                        elm.html(ctrl.$viewValue);
                    };
                    ctrl.$setViewValue(elm.html());
                }
            };
        }
    );

/*
angular.module('ui-rangeSlider').config(['$provide', function($provide) {
    $provide.decorator('rangeSliderDirective', function($delegate) {
        var dir = $delegate[0];

        dir.template = ['<div class="ngrs-range-slider">',
            '<div class="ngrs-runner">',
            '<div class="ngrs-handle-x ngrs-handle-min"><i></i></div>',
            '<div class="ngrs-handle-x ngrs-handle-max"><i></i></div>',
            '<div class="ngrs-join"></div>',
            '</div>',
            '<div class="ngrs-value-runner">',
            '<div class="ngrs-value ngrs-value-min" ng-show="showValues"><div>{{filteredModelMin}}</div></div>',
            '<div class="ngrs-value ngrs-value-max" ng-show="showValues"><div>{{filteredModelMax}}</div></div>',
            '</div>',
            '</div>'
        ].join('');

        return $delegate;
    })
}]);
*/
