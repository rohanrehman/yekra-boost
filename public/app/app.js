angular.module("app", [

    'app.navbar',
    'navbar.service',
    'app.slidenav',
    'app.main',
    'app.posters',
    'app.recommended',
    'app.hero',
    // 'app.login',
    'authentication.service',
    'ngNewRouter',
    'famous.angular',
    'ngAria',
    'ngMaterial',
    'ngMessages',
    'firebase',
    "ngSanitize"
])

    .config(function ($componentLoaderProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            var dashName = dashCase(name);
            // customized to use app prefix
            return './app/components/' + dashName + '/' + dashName + '.html';
        });
    })

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('grey', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('blue', {
                'default': '400' // use shade 200 for default, and keep all other shades the same
            });
    })


    .config(function ($mdIconProvider) {
        $mdIconProvider.iconSet("avatar", './images/avatar-icons.svg', 128);
    })
    .config(['$locationProvider', function ($locationProvider) {
        // $locationProvider.html5Mode({enabled: true,requireBase:true});

    }])


    .controller("appCtrl", function ($router, $scope, $rootScope, $firebaseObject, $mdSidenav, $mdDialog, $mdMedia) {

        this.fb_ref = new Firebase("https://luminous-fire-2967.firebaseio.com/data");
        this.syncObject = $firebaseObject(this.fb_ref)
        this.syncObject.$bindTo($rootScope, "data");

        //NWjs code
        /*     var gui = this.gui = require("nw.gui");
         var menu = new gui.Menu();

         menu.append(new gui.MenuItem({ label: 'Item A' }));
         menu.append(new gui.MenuItem({ label: 'Item B' }));
         menu.append(new gui.MenuItem({ type: 'separator' }));
         menu.append(new gui.MenuItem({ label: 'Item C' }));

         menu.append(new gui.MenuItem({
         label: 'Quit',
         click: function() {
         gui.App.quit();
         }
         }));

         // Popup as context menu
         document.body.addEventListener('contextmenu', function(ev) {
         ev.preventDefault();
         // Popup at place you click
         menu.popup(ev.x, ev.y);
         return false;
         }, false);

         var win = gui.Window.get();

         var menubar = new gui.Menu({ type: 'menubar' });
         var sub1 = new gui.Menu();

         sub1.append(new gui.MenuItem({
         label: 'Test1',
         click: function() {
         console.log('test1');
         }
         }));

         menubar.append(new gui.MenuItem({ label: 'Sub1', submenu: sub1}));

         win.menu = menubar;

         menu.items[0].click = function() {
         console.log("CLICK");
         };

         */


      //cool responsive media querries here
        $scope.$watch(function () {
                return $mdMedia('gt-md');
            },
            function (matched) {
                if (matched) {
                    console.log("screen is greater than medium");
                }

            }
        );




        $router.config([
            {
                path: '/', components: {
                //side:'slidenav'
                top: 'navbar',
                hero: 'hero',
                content: 'posters'
            }, as: '/'
            }
            ,
            {
                path: '/overview', components: {
                // side: 'slidenav',
                top: 'navbar',
                hero: 'hero',
                content: 'posters'
            }, as: 'overview'
            },
            {
                path: '/randomize', components: {
                // side: 'slidenav',
                top: 'navbar',
                hero: 'hero',
                content: 'posters'
            }, as: 'posters'

            },
            {
                path: '/recommended', components: {
                // side: 'slidenav',
                top: 'navbar',
                hero: 'hero',
                content: 'recommended'
            }, as: 'recommended'
            },
            {
                path: '/genres', components: {
                // side: 'slidenav',
                top: 'navbar',
                hero: 'hero',
                content: 'posters'
            }, as: 'genres'
            },

        ]);


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };


        $rootScope.$on('loginSuccess', function (user) { //subscribed: , emitted:
            $rootScope.User = user;
        });


        $scope.$on('$viewContentLoaded', function () { //subscribed:   , emitted: add controller name that is emiting the event.
            //$rootScope.Session.isLoggedIn = true;
            // $rootScope.$broadcast("login",$rootScope.Session);
            // $rootScope.$broadcast("logout",$rootScope.Session);
        });

        $scope.showAlert= function($event){

            alert = $mdDialog.alert({
                title: 'Log In',
                content: 'User name and password input forms ',
                ok: 'Close'
            });
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });

        }


        $scope.toggleRight = function () {
            $mdSidenav('right').toggle()
                .then(function () {
                    // $log.debug("toggle RIGHT is done");
                });
        };

    })


    .controller('autocompleteCtrl', function ($q, NavbarService, $http) {
        var self = this;
        self.products = loadAll();

        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.simulateQuery = false;
        self.isDisabled = false;
        self.selectedItemChange = selectedItemChange;

        function loadAll() {

            var allProducts = NavbarService.getProducts().then(function (response) {
                return response
            });
            return allProducts;

        }




        function querySearch(query) {
            return $http.get('https://www.stage.yekra.com/v3/products/search', {

                params: {
                    title: query
                }
            })
                .then(function (response) {

                    //console.log(response.data);
                    //return response.data;
                    return response.data.map(function (item) {
                        item.display = item.title
                        return item;


                    });
                });
        }


        function selectedItemChange(item) {
            console.log('Item changed to ' + item);
        }


    });
