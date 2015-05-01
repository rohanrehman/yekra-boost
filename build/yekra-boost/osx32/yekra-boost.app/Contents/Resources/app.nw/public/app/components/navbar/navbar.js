'use strict';

angular.module('app.navbar', [])
       .controller('NavbarController',['NavbarService',NavbarController]);
// NavbarController.$inject = ['$http'];
function NavbarController(NavbarService) {
   // console.log(navbarServices);
    var self = this;
        self.products = [];
    NavbarService.getProducts().then(function(products){
       self.products = products;
       // console.log(products);
    });

};
