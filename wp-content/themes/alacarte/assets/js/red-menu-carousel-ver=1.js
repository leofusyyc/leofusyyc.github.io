/**
 * @package RedExp
 * @subpackage Rize
 * @since 1.0.0
*/
jQuery(document).ready(function($) {
    "use strict";
    $(document).ready(function() {
        if ($('.menu-post').length) {
            var nav_text=NavOptions.nav_text;
            var small_item=NavOptions.small_item;
            var large_item=NavOptions.large_item;
            var nav_large_item=NavOptions.nav_large_item;
            var data_loop=NavOptions.data_loop;
            var data_nav=NavOptions.data_nav;
            var data_dot=NavOptions.data_dot;
            $('.menu-post').each(function () {
                $(this).owlCarousel({
                    loop: data_loop,
                    margin: 50,
                    responsiveClass: true,
                    dots:data_dot,
                    nav:data_nav,
                    navText:nav_text,
                    responsive:{
                        0:{
                            items:small_item,
                            nav:false,
                            margin:0,
                            dots:true,
                        },
                       768:{
                            items:large_item,
                            nav:false,
                           margin:30,
                           dots:true
                        },
                        1365:{
                            items:large_item,
                            nav:nav_large_item
                        },

                        1500:{
                            items:large_item,
                            nav:data_nav,
                        }
                    }
                })
            })
        }

    })
});

