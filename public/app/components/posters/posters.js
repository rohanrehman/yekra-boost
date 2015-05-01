(function() {
   'use strict';

    angular
        .module('app.posters',['ngAnimate'])
        .controller('PostersController', PostersController);

   // PostersController.$inject = ['$famous','$firebaseObject'];

    function PostersController($famous,$window,$animate,$timeout,$mdMedia) {
        console.log('PostersController');

        //angular.element($window).bind('resize', function () {
        //    //console.log($window.innerWidth);
        //});

        var posters = this;
        posters.myGridLayoutOptions = {
            dimensions: [2, 3]
        };

        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];
        var Transform = $famous['famous/core/Transform'];
        var Engine = $famous['famous/core/Engine'];
        var EventHandler = $famous['famous/core/EventHandler'];


        posters.tiles = buildGridModel({
            title: "Title - ",
            background: "red",
            id: null,
            isAnimating:false
        });


        function buildGridModel(tileTmpl) {
            console.log('BUILDING');
            var it, results = [];
            for (var j = 0; j < 20; j++) {
                it = angular.extend({}, tileTmpl);
                it.id = j;
               // it.icon = it.icon + (j + 1);
                it.title = it.title + (j + 1);
                it.span = {row: "1", col: "1"};
                it.background = "white";
                it.span.row = it.span.col = 1;


                results.push(it);

            }
            return results;
        }

        posters.myTransitionable = new Transitionable([0, 0, 0]);

        posters.animate = function() {
            posters.myTransitionable.set([260, 0, 0], {duration: 800, curve: Easing.outElastic}, function () {
                posters.myTransitionable.delay(2000, function () {
                        posters.myTransitionable.set([0, 0, 0], {delay: 2000, duration: 500, curve: Easing.inOutExpo})
                    }
                )

            })

        }

        posters.grid = {
            translate: new Transitionable([0,0,0]),
            opacity: new Transitionable(1),
            rotate:new Transitionable(0)

        };

        posters.animateBox = function(item) {
             var w_width = $window.innerWidth;
           // console.log(angular.element(item).hasClass('animate-blur'));
            //posters.box.translate.set([260, 0, 0], {duration: 500, curve: Easing.inOutExpo});

            posters.grid.translate.set([0, 0, -100], {duration: 800, curve: Easing.outExpo},function(){
                posters.grid.translate.set([0, 0 , 0], {duration: 800, curve: Easing.inExpo});

            });

            posters.grid.rotate.set(-20 * Math.PI/180, {duration: 800, curve: Easing.inOutExpo},function(){
                posters.grid.rotate.set(0 * Math.PI/180, {duration: 800, curve: Easing.inOutExpo});
            });

            // posters.box.opacity.set((posters.data.range)/255, {duration: 500, curve: Easing.OutSine});
        };



        this.flipCard = function(card,item){
         // console.log(angular.element(item));
          //  $animate.addClass(angular.element(item), 'animate-flip');
             if(angular.element(card).hasClass('animate-flip')) {
               // console.log('alreadyclicked');
                $animate.removeClass(card, 'animate-flip');

             }else {
                $animate.addClass(card, 'animate-flip');
           // $timeout(function(){$animate.removeClass(card, 'animate-flip')},700);
            }
            //$timeout(function(){item.isAnimating = false},700);

        }
        this.clearflipCard = function(card,item){
             console.log(angular.element(item));
            //  $animate.addClass(angular.element(item), 'animate-flip');
            // if(angular.element(card).hasClass('animate-flip')) {
            // console.log('alreadyclicked');
           // $animate.removeClass(card, 'animate-flip');
            // $timeout(function(){$animate.addClass(card, 'animate-flip')},10);
            //}else {
           // $animate.addClass(card, 'animate-flip');
            //  }
            //$timeout(function(){item.isAnimating = false},700);

        }
    }


    PostersController.prototype.mouseHndlr = function ($event,item) {
         var card = angular.element($event.target).parent();
        //console.log(card);
        switch($event.type) {
            case "mouseover":


                if(!item.isAnimating){
                   item.isAnimating = true;
                  this.flipCard(card,item);

               };

                //this.flipCard(card,item);

                break;
            case "mouseout":


             //  this.clearflipCard(card,item)

                break;
            case "click":

               this.animateBox(card);

                break;
            case "mouseup":
               // console.log(item);
                break;
            default:

        }

    }
    PostersController.prototype.onItemClick = function () {
        console.log('onItemClick');

    }

})();