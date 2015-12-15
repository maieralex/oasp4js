angular
    .module('app.recipe-mgmt')
    .directive('navigatable', navigatable)
    .directive('starRating', starRating);

function navigatable() {
    return function (scope, element, attr) {
        element.on('keypress.mynavigation', 'input[type="text"]', handleNavigation);


        function handleNavigation(e) {

            var arrow = {left: 37, up: 38, right: 39, down: 40};

            // select all on focus
            element.find('input').keydown(function (e) {

                // shortcut for key other than arrow keys
                if ($.inArray(e.which, [arrow.left, arrow.up, arrow.right, arrow.down]) < 0) {
                    return;
                }

                var input = e.target;
                var td = $(e.target).closest('td');
                var moveTo = null;

                switch (e.which) {

                    case arrow.left:
                    {
                        if (input.selectionStart == 0) {
                            moveTo = td.prev('td:has(input,textarea)');
                        }
                        break;
                    }
                    case arrow.right:
                    {
                        if (input.selectionEnd == input.value.length) {
                            moveTo = td.next('td:has(input,textarea)');
                        }
                        break;
                    }

                    case arrow.up:
                    case arrow.down:
                    {

                        var tr = td.closest('tr');
                        var pos = td[0].cellIndex;

                        var moveToRow = null;
                        if (e.which == arrow.down) {
                            moveToRow = tr.next('tr');
                        }
                        else if (e.which == arrow.up) {
                            moveToRow = tr.prev('tr');
                        }

                        if (moveToRow.length) {
                            moveTo = $(moveToRow[0].cells[pos]);
                        }

                        break;
                    }

                }

                if (moveTo && moveTo.length) {

                    e.preventDefault();

                    moveTo.find('input,textarea').each(function (i, input) {
                        input.focus();
                        input.select();
                    });

                }

            });


            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                var focusedElement = $(e.target);
                var nextElement = focusedElement.parent().next();
                if (nextElement.find('input').length > 0) {
                    nextElement.find('input').focus();
                } else {
                    nextElement = nextElement.parent().next().find('input').first();
                    nextElement.focus();
                }
            }
        }
    };
}

function starRating() {
    return {
        restrict: 'EA',
        template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="glyphicon" ng-class="{filled: glyphicon-star}" ng-click="toggle($index)">' +
        '    <i class="glyphicon-star-empty"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
        scope: {
            ratingValue: '=ngModel',
            max: '=?', // optional (default is 5)
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function(scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly === false){
                    scope.ratingValue = index + 1;
                    scope.onRatingSelect({
                        rating: index + 1
                    });
                }
            };
            scope.$watch('ratingValue', function(oldValue, newValue) {
                if (newValue) {
                    updateStars();
                }
            });
        }
    };
}
