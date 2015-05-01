
'use strict';

angular.module('app.recommended', ['ngAnimate']).
    controller('RecommendedController', [ '$location', RecommendedController]);
//RecommendedController.$inject=['$location'];

function RecommendedController($location) {
    var self = this;
    self.loc = $location;
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
    this.navData = {

        secondLocked : false,
        secondLabel : "Item Two"
    };


};



RecommendedController.prototype.tabClick = function(i) {

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
        case 2:
            this.loc.path( "/genres" );
            break;

    }
    // $scope.$emit('loginSuccess',result);
};

RecommendedController.prototype.tabNext = function() {
    this.navData = Math.min(this.navData.selectedIndex + 1, 2) ;
};


RecommendedController.prototype.tabPrev = function() {
    this.navData = Math.max(this.navData.selectedIndex - 1, 0);
};

RecommendedController.prototype.navData = function() {
    return this.navData;
};

