angular.module('app.offer-mgmt').factory('offers', function (offerManagementRestService) {
    'use strict';
    return {
        loadAllOffers: function () {
            var searchCriteria = {
                pagination: {
                    page: 1,
                    total: true
                }
            };
            return offerManagementRestService.getPaginatedOffers(searchCriteria).then(function (response) {
                return response.data.result;
            });
        },
        loadAllProducts: function () {
            var searchCriteria = {
                pagination: {
                    page: 1,
                    total: true
                }
            };
            return offerManagementRestService.getPaginatedProducts(searchCriteria).then(function (response) {
                return response.data.result;
            });
        },
        getProduct: function(id) {
            return offerManagementRestService.getProduct(id).then(function(response) {
                    return response.data;
            });
        }
    };
});
