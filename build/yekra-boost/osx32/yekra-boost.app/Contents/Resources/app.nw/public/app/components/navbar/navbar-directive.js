angular.module('navbar.directive',[])
    .directive('ngNavbar',function ($animate) {
        return {
            scope:{
                dropdownitems:'&',
                dropdown:'&',
                isloggedin:'&',
                searchFocused:'&',
                toggleSlideMenu:'&',
                toggleSubMenu:'&',
                submenuopen:'&',
                mobilemenuopen:'&',
                navbarCollapsed:'&'

            },
            restrict:"EA",
            templateUrl:'app/components/navbar/navbar.html',
            controller:['$scope','$rootScope','$http','NavbarService','$timeout',function($scope,$rootScope,$http,NavbarService,$timeout) {

                //local directive vars
                $scope.navbarCollapsed = true;
                $scope.selected = undefined;
                $scope.isloggedin=false;
                $scope.searchFocused=false;
                $scope.mobilemenuopen=false;
                $scope.submenuopen=false;
                $scope.dropdown = true;

                //directive service call
                NavbarService.getDropDownItems().then(function(mediakeywords){
                    //$scope.dropdownitems = mediakeywords;
                       //console.log($scope.dropdownitems.length);
                });

                //directive methods
                $scope.getSeries = function(val) {
                    return $http.get('http://ec2-184-169-186-155.us-west-1.compute.amazonaws.com/api/media/getSeriesTitlesBySearch', {
                        params: {
                            search: val
                                }
                            })
                        .then(function(response){
                        return response.data.map(function(item){
                            return item.title;
                        });
                    });
                };

                $scope.toggleSlideMenu = function(){
                    $scope.$emit("toggleSlideMenu"); ///subscribed : slidemenu-directive , emitted:
                    $scope.mobilemenuopen = !$scope.mobilemenuopen

                }
                
                $scope.openSubMenu = function(){

                    if($scope.submenuopen===false) {
                        $scope.submenuopen = true;
                    }

                }


                $scope.closeSubMenu = function(e){

                    el = angular.element(e);
                    Timer = $timeout(function() {
                        if(e.clientY >= 50 && e.clientY < 280){
                            $timeout.cancel(Timer);

                        }else if (e.clientY >= 280){
                            //console.log("more than 270");
                            $scope.submenuopen = false;
                            //console.log("timer canceled");
                        }
                        else{
                            $scope.submenuopen = false;
                        }
                        console.log(e.clientY);

                    }, 0);

                }


                //event listeners
                $rootScope.$on('login',function(e){
                      // $scope.isloggedin = e.targetScope.Session.isLoggedIn;
                });

                $rootScope.$on('logout',function(e){
                   // $scope.isloggedin = e.targetScope.Session.isLoggedIn;
                });


            }],
            link: function (scope, element,attrs,ngSlidemenuCtrl) {
                //console.log(element);
                element.bind('click', function() {
                    //console.log(scope);
                    //  $animate.addClass(element,'move-up');
                });
                element.bind('mouseenter', function () {
                    // console.log("mousent");
                });
                element.bind('mouseleave', function () {
                    console.log("mousleave");
                   // console.log(element.navbar.submenu);
                });
            }
        }
    })
;
