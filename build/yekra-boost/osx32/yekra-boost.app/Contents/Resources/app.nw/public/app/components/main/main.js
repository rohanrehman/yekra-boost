
'use strict';

angular.module('app.main', []).
    controller('MainController', [ '$location', MainController]);
 //MainController.$inject=['$location'];

function MainController($location) {
    var self = this;
    self.loc = $location;
 // console.log(angular.element('app').scope());
   // console.log(self.loc.url());
    this.selectedIndex=0;
    switch(self.loc.url()) {
        case "/overview":
            this.selectedIndex = 0;

            break;
        case "/randomize":
            this.selectedIndex = 1;
            break;
        case "/recommended":
            this.selectedIndex = 2;
            break;
        case "/genres":
            this.selectedIndex = 3;
            break;

    }


    this.boom = 'baam';
    this.navData = {

            secondLocked : false,
            secondLabel : "Item Two"
        };


};



MainController.prototype.tabClick = function(i) {

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

MainController.prototype.tabNext = function() {
    this.navData = Math.min(this.navData.selectedIndex + 1, 2) ;
};


MainController.prototype.tabPrev = function() {
    this.navData = Math.max(this.navData.selectedIndex - 1, 0);
};

MainController.prototype.navData = function() {
    return this.navData;
};

