angular.module('app.recipe-mgmt').factory('recipeManagementRestService', function ($http, $q, $window, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/recipemanagement/v1';

    return {
        getRecipe: function (id) {
            return $http.get(servicePath + '/recipe/' + id);
        },
        saveRecipe: function (recipe) {
            return $http.post(servicePath + '/recipe/', recipe);
        },
        saveRecipePicture: function(id, image) {
            var boundary = 'uuid:' + Date.now();
            var header = {
                'content-type': 'multipart/mixed; charset=UTF-8; boundary=' + boundary
            };
            var deferred = $q.defer();
            var reader = new $window.FileReader();
            reader.onloadend = function(event) {
                var data = '--' + boundary + '\r\n' +
                            'Content-Type: application/json;charset=UTF-8\r\n' + 
                            'Content-Transfer-Encoding: binary\r\n' + 
                            'Content-ID: <binaryObjectEto>\r\n\r\n' + 
                            JSON.stringify({'type': image.type, 'size': image.size, 'name': image.name, 'lastModified': image.lastModified}) + '\r\n\r\n' +
                         '--' + boundary + '\r\n' + 
                            'Content-Type: application/octet-stream\r\n' +
                            'Content-Transfer-Encoding: binary\r\n' + 
                            'Content-ID: <blob>\r\n\r\n' + 
                            event.target.result + 
                            '\r\n\r\n--' + boundary + '--';
                            console.log(data);
                deferred.resolve($http.post(servicePath + '/recipe/' + id + '/picture', data, {headers: header}));
            };
            reader.readAsText(image);
            return deferred.promise;
        },
        getPaginatedRecipes: function (pagenumber, pagesize) {
            var recipeSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
            return $http.post(servicePath + '/recipe/search', recipeSearchCriteria);
        },
        getRecipePicture: function(id) {
            return $http.get(servicePath + '/recipe/' + id + '/picture');
        },
        getRecipePictureBytes: function(id) {
            return $http.get(servicePath + '/recipe/' + id + '/pictureBytes', {
                transformResponse: [function (data) {
                    return data;
                }],
                responseType: 'blob'
            });
        }
    };
});
