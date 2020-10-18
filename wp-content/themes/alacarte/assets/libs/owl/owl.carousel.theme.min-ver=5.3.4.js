/**
 * Custom OWL in theme
 */
(function ($) {
    "use strict";
    $(window).on('load',function () {
        alacarte_owl_render();
    });
    // Ajax Complete
    jQuery(document).ajaxComplete(function(event, xhr, settings){
        alacarte_owl_render();
    });
    /* add first/last/center class */
    function alacarte_owl_flc(e) {
        "use strict";
        var idx = $(e.target).find('.owl-item');
        idx.removeClass('first last center'),
            idx.eq(e.item.index).addClass('first'),
            idx.eq(e.item.index + e.page.size - 1).addClass('last');

        /* add counter x/y for next/prev */
        var carousel = e.relatedTarget;
        $('.owl-next .nav-count').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        $('.owl-prev .nav-count').text(carousel.relative(carousel.current()) + '/' + carousel.items().length);

        // Remove loading
        $('.loader').remove();
    }
    function alacarte_owl_render(){
        'use strict';
        $('.red-owl').each(function () {
            var $this    = $(this),
                slide_id = $this.attr('id'),
                slider_settings = alacarte_owl[slide_id];
            slider_settings['navContainer']  = $this.parent().find('.red-owl-nav');
            slider_settings['dotsContainer'] = $this.parent().find('.red-owl-dots');
            // add first / last / center css class
            $this.on("initialized.owl.carousel", function(e) {
                alacarte_owl_flc(e);
                if(slider_settings['dotsData'] === true){
                    slider_settings['dotsContainer'].addClass('thumbnail');
                }
            }),

                $this.owlCarousel(slider_settings),

                $this.on("changed.owl.carousel", function(e) {
                    alacarte_owl_flc(e);
                }),
                // add changing class  to remove overflow hidden style
                $this.on("translate.owl.carousel", function(e) {
                    //$('.owl-stage-outer').addClass('translating');

                }),
                $this.on("translated.owl.carousel", function(e) {
                    //$('.owl-stage-outer').removeClass('translating');
                })
        });

        $('section.products ul.products').each(function () {
            var $this = $(this);
            $this.on("initialized.owl.carousel", function(e) {
                $this.addClass('owl-carousel');
            }),
                $this.owlCarousel({
                    margin : 30,
                    items  : 1,
                    nav    : false,
                    dots   : true,
                    navContainerClass : 'red-owl-nav vertical outside',
                    navClass : ['red-owl-nav-button red-owl-prev','red-owl-nav-button red-owl-next'],
                    navText  : ['<i class="fal fa-chevron-left"></i><span class="text">PREV</span>','<span class="text">NEXT</span><i class="fal fa-chevron-right"></i>'],
                    dotsClass : 'red-owl-dots',
                    responsive : {
                        // breakpoint from 0 up
                        0 : {
                            items  : 1
                        },
                        // breakpoint from 480 up
                        768 : {
                            items  : 2
                        },
                        // breakpoint from 768 up
                        992 : {
                            items  : 3
                        },
                        // breakpoint from 1200 up
                        1200 : {
                            items  : 3,
                            dots  : false
                        }
                    }
                });
        });
    }
})(jQuery)