 'use strict';
    angular.module('authentication.service', ['firebase'])
        .service('AuthenticationService',[AuthenticationService])
 function AuthenticationService ($firebaseAuth) {

            var self = this;
     self.fb_ref = new Firebase("https://luminous-fire-2967.firebaseio.com/data");
     self.fb_auth = $firebaseAuth(fb_ref);

     this.galleries = [];
     console.log('AuthentServ');
            //
            //this.loadGalleries = function() {
            //
            //    $http.get('/api/v1/galleries')
            //        .then(
            //        function(response) {
            //            // keep references working
            //            angular.copy(response.data, self.galleries);
            //            self.errorCondition = false;
            //        },
            //        function(error) {
            //            console.log('fetch failed!');
            //            // wipe galleries without removing reference
            //            self.galleries.length = 0;
            //            self.errorCondition = true;
            //        });
            //};
        };
 AuthenticationService.prototype.boom = function(){
     return "BAam";
 }

//
//
// AuthenticationService.prototype.createUser = function() {
//    $scope.message = null;
//    $scope.error = null;
//
//    Auth.$createUser({
//        email: $scope.email,
//        password: $scope.password
//    }).then(function(userData) {
//        $scope.message = "User created with uid: " + userData.uid;
//    }).catch(function(error) {
//        $scope.error = error;
//    });
//};
//
// AuthenticationService.prototype.removeUser = function() {
//     $scope.message = null;
//     $scope.error = null;
//
//     Auth.$removeUser({
//         email: $scope.email,
//         password: $scope.password
//     }).then(function () {
//         $scope.message = "User removed";
//     }).catch(function (error) {
//         $scope.error = error;
//     });
// };
