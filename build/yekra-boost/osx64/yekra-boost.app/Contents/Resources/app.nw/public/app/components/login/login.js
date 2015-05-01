
'use strict';

angular.module('app.login', ['ngMaterial']).
    service('LoginController', ['AuthenticationService', LoginController]);
   // LoginController.$inject=['$firebaseAuth'];

function LoginController($mdDialog,AuthenticationService) {
    var self = this;

    console.log(AuthenticationService.boom());


    this.navData = {

        secondLocked : false,
        secondLabel : "Item Two"
    };


};




LoginController.prototype.tabClick = function(i) {

    switch(i) {
        case 0:
            this.loc.path( "/overview" );
            break;
        case 1:
            this.loc.path( "/randomize" );
            break;
        case 2:
            this.loc.path( "/recommended" );
            break;
        case 3:
            this.loc.path( "/genres" );
            break;

    }
    // $scope.$emit('loginSuccess',result);
};

LoginController.prototype.tabNext = function() {
    this.navData = Math.min(this.navData.selectedIndex + 1, 2) ;
};


LoginController.prototype.navData = function() {
    return this.navData;
};

