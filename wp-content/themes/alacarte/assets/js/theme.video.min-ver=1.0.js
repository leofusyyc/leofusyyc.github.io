jQuery(document).ready(function($) {
    "use strict";
    /* magnific-popup */
    $("a.ocpopupvideo-iframe").magnificPopup({
        type:'iframe',
        iframe: {
            patterns: {
              dailymotion: {
                index: 'dailymotion.com',
                id: function(url) {        
                    var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                    if (m !== null) {
                        if(m[4] !== undefined) {
                          
                            return m[4];
                        }
                        return m[2];
                    }
                    return null;
                },
                src: 'https://www.dailymotion.com/embed/video/%id%'
              }
            }
        },
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    $("a.ocpopupvideo").magnificPopup({
        //disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        // Changes iFrame to support Youtube state changes (so we can close the video when it ends)
        iframe: {
          /*markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe id="player" class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>',*/ // HTML markup of popup, `mfp-close` will be replaced by the close button
        // Converts Youtube links to embeded videos in Magnific popup.
          patterns: {
            youtube: {
                index: 'youtube.com/',
                id: 'v=',
                src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0&enablejsapi=1'
                //index: 'youtube.com', 
                //id: 'v=', 
                //src: 'http://www.youtube.com/embed/%id%?autoplay=1&vq=hd720'
            }
          }
        },
        // Tracks Youtube video state changes (so we can close the video when it ends)
        callbacks: {
          open: function() {
            /*new YT.Player('player', {
              events: {
                'onStateChange': onPlayerStateChange
              }
            });*/
          }
        }
    });
    // Closes Magnific Popup when Video Ends
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
          $.magnificPopup.close();
        }
    }
    /**
     * window load event.
     * 
     * Bind an event handler to the "load" JavaScript event.
     * @author CMSSuperHeroes
     */
    $(window).on('load', function() {
        $('.oc-video-wrapper').oc_video(); 
    });
    /* OC Video HTML5 */
    jQuery.fn.extend({
        oc_video: function(){
            this.each(function(){
                var $this = $(this);
                var video = $this.find('video');
                var content = $this.find('.mejs-overlay');
                
                video.on("ended", function() {
                   content.fadeTo( "slow", 1 );
                   $(this).addClass('video-pause').removeClass('video-play');
                });
                video.on("play", function() {
                   content.fadeTo( "slow", 0 );
                   $(this).addClass('video-play').removeClass('video-pause');
                });
                video.on("pause", function() {
                   content.fadeTo( "slow", 1 );
                   $(this).addClass('video-pause').removeClass('video-play');
                });
                video.on("playing", function() {
                   content.fadeTo( "slow", 0 );
                   $(this).addClass('video-play').removeClass('video-pause');
                });
                $('.play-video',$this).on('click',function(){
                    OCHtml5PlayVideo($this.find(video));
                })
                $('video',$this).on('click',function(){
                    OCHtml5PauseVideo($this.find(video));  
                })
            });
        }
    });
    function OCHtml5PlayVideo(video){
        "use strict";
        if (video.get(0).paused == true) {
            video.get(0).play();
        } else {
            video.get(0).pause();
        }
    }
    function OCHtml5PauseVideo(video){
        "use strict";
        if (video.get(0).paused != true) {
            video.get(0).pause();
        }
    }
});