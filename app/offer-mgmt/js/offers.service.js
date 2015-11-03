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
                /*
                if(response.data.pictureId !== null) {
                    return offerManagementRestService.getProductPicture(id).then(function(pResponse) {
                        return pResponse.data;
                    }).then(function(pictureData) {
                        var rawData = pictureData.split(/^--uuid:[a-z0-9-]+$/m);
                        var FIRSTPART = 1, SECONDPART = 2;
                        var pictureBlob = rawData[SECONDPART].split(/<blob>\r\n\r\n/)[1];
                        var reader = new window.FileReader();
                        reader.readAsBinaryString(pictureBlob); 
                        reader.onloadend = function() {
                            base64data = reader.result;                
                            console.log(base64data);
                        };
                        var picture = {
                            'metadata': rawData[FIRSTPART].trim(),
                            'file': null
                        };
                        response.data.picture = picture;
                        return response.data;
                    });
                }
                else*/
                    return response.data;
            });
        }
    };
});
