angular.module('media.player.directive',[])
    .directive('ngPlayer', function ($animate) {
        return {
            scope:{
                config:'&'
            },
            restrict:"EA",
            templateUrl:'app/components/media/player/player.html',
            controller:['$scope','$http','$sce', function($scope,$http,$sce) {
                $scope.config = {
                    sources: [
                        {
                            src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"),
                            type: "video/mp4"
                        },
                        {
                            src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"),
                            type: "video/webm"
                        },
                        {
                            src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"),
                            type: "video/ogg"
                        }
                    ],

                    theme: "bower_components/videogular-themes-default/videogular.css",
                    plugins: {
                        poster: "http://www.videogular.com/assets/images/videogular.png"
                    }
                }


            }],
            link: function (scope, element,attrs) {



//                element.bind('click', function() {
//                    //console.log(scope);
//                    //  $animate.addClass(element,'move-up');
//
//                });
//                element.bind('mouseenter', function () {
//                    // console.log("mousent");
//                });
//                element.bind('mouseleave', function () {
//                    //console.log("mousleave");
//                });
            }
        }
    });
