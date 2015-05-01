

'use strict';

angular.module('app.slidenav', []).
    controller('SlidenavController', [ SlidenavController]);

function SlidenavController($mdSidenav) {
   // this.$mdSidenav = $mdSidenav
}

SlidenavController.prototype.close = function() {
    //this.phones = this.Phone.query();
   // this.$mdSidenav('right').close()
    console.log('CLOSE');
};

/*
.controller("rightCtrl", function ($scope,$mdSidenav) {
    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function () {
                //   $log.debug("close RIGHT is done");
            });
    }
})*/
