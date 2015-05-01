'use strict';

angular.module('app.hero', ['slick']).
    controller('HeroController', [HeroController]).
    run(function () {
        //call services
        //console.log('HeroController Run');
    });

;
function HeroController() {
    //console.log('HeroController INIT');
    this.breakpoints = [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];
    this.conf = {
        key:       "bc5b802ea7098c4ccd373d7595b4efe0",
        source:    {
            mpd: 	   "http://bitcdn-global1.bitmovin.com/content/posters/4k_demo/interstellar/interstellar.mpd",
           // mpd: "http://bitcdn-global1.bitmovin.com/content/sintel/sintel.mpd",
            mobilempd: "http://bitcdn-global1.bitmovin.com/content/sintel/sintel-mobile.mpd",
            hls:       "http://bitcdn-global1.bitmovin.com/content/sintel/hls/playlist.m3u8",
            progressive : ['http://path/to/mp4', 'http://path/to/webm'],
            poster:    "images/interstellar-poster.png"

        },
        playback: {
            autoplay:  false,
            muted:   false
        },

        skin: {
            overlayPlayControl: "data:image/png;base64,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",

            overlayPlayControlHover: "data:image/png;base64,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"
        },
        style: {
            width: '100%',
            height: '450px',
        },
        events: {
            onError: function(data) {
                console.error("bitdash error: " + data.code + ": " + data.message);
            },

            onPlay  : function(data) {
                console.log('video playing');
            },
            onReady: function(obj)  {
                console.log(this.getVersion() + ' onReady: ', obj);

            }
        }
    };

    this.playerSetup(this.conf);
}

HeroController.prototype.playerSetup = function(conf) {
   // var player = bitdash("player").setup(conf);
};




