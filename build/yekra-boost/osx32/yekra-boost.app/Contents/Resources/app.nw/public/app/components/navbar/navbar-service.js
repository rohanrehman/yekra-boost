angular.module("navbar.service", [])
.value("api_navbar_url", "https://www.stage.yekra.com/v3/products")
.service("NavbarService", ["$q", "$http","api_navbar_url",
    function($q, $http, api_navbar_url) {
        return {
            getProducts: function () {
                //console.log('BOOM');
                var deferred = $q.defer();
                    $http.get(api_navbar_url).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (result) {
                    deferred.reject(result);
                        });
                return deferred.promise;
            }

        }
 }]);