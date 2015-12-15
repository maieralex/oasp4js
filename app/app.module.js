angular.module('app',
    ['ui-rangeSlider', 'ui.select', 'ngRoute', 'app.main', 'app.table-mgmt', 'app.offer-mgmt', 'app.sales-mgmt', 'app.recipe-mgmt'])
    .config(function ($locationProvider, uiSelectConfig) {
        'use strict';
        $locationProvider.html5Mode(false);
        uiSelectConfig.theme = 'bootstrap';
    })
    .run(function (globalSpinner) {
        'use strict';
        globalSpinner.showOnRouteChangeStartAndHideWhenComplete();
    });
