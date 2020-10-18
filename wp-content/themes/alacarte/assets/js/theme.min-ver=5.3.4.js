(function( $ ) {
    'use strict';
    var resizeTimer;

    var adminbar = $('#wpadminbar'),
        adminbar_height = 0,
        window_width = window.innerWidth;
    var  header_top = $('#red-header-top'),
        header_top_height = 0;
    adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;
    header_top_height = header_top.length   > 0 ?  header_top.outerHeight() : 0;
    // Fire on document ready.
    $( document ).ready( function() {
        alacarte_StickyHeader();
        alacarte_toggle_menu();
        alacarte_touched_side();
        alacarte_open_mobile_menu();
        alacarte_popup();
        alacarte_toggle();
        alacarte_side_nav();
        alacarte_video_size();
        alacarte_vcRow();
        alacarte_inlineCss();
        alacarte_ajax_pagination();
        alacarte_woo_filters();
        alacarte_wc_single_product_gallery();
        alacarte_wooscp_change_text();
        alacarte_header_ontop();
        alacarte_header_ontop_next();
        // WooCommerce
        alacarte_quantity_plus_minus();
        alacarte_quantity_plus_minus_action();
        alacarte_remove_cart_actions();

        alacarte_svg_color();
    });
    // On Load
    $(window).load(function() {
        alacarte_page_loading();
        alacarte_vcRow();
        alacarte_woo_price_filter_add_data_title();
        alacarte_wooscp_change_text();
        alacarte_masonry_filter();
        alacarte_vc_animation_callback();
        alacarte_popup();
        //header2_width();
    });
    // On scroll
    $( window ).scroll( function() {
    });
    // On Resize
    $( window ).resize( function() {
        clearTimeout( resizeTimer );
        alacarte_touched_side();
        alacarte_vcRow();
        alacarte_header_ontop();
        alacarte_header_ontop_next();
        alacarte_popup();
        // header2_width();
    });

    // Ajax Complete
    $(document).ajaxComplete(function(event, xhr, settings){
        // WooCommerce Default Orderby
        $( '.woocommerce-ordering' ).on( 'change', 'select.orderby', function() {
            $( this ).closest( 'form' ).submit();
        });
        alacarte_video_size();
        alacarte_popup();
        alacarte_init_price_filter();

        $('.hoverdir-wrap').EF5HoverDir();
        $('.red-btn-slide').EF5HoverDir();

        alacarte_masonry_filter();
        alacarte_vc_animation_callback();

        //alacarte_ajax_quantity_plus_minus();
        alacarte_remove_cart_actions();
        //alacarte_table_move_column('.woocommerce-cart-form__contents','.cart_item, thead tr',0,5, 'thead tr .product-thumbnail','thead tr .product-name', 2);
    });
    jQuery( document ).on( 'updated_wc_div', function() {
        alacarte_quantity_plus_minus();
        alacarte_remove_cart_actions();
        //alacarte_table_move_column('.woocommerce-cart-form__contents','.cart_item, thead tr',0,5, 'thead tr .product-thumbnail','thead tr .product-name', 2);
    } );

    /**
     * Add page loading
     */
    function alacarte_page_loading(){
        'use strict';
        $("#red-loading").fadeOut("slow");
    }
    function alacarte_header_ontop(){
        var header_ontop = $('.header-ontop'),
            header_ontop_next = $('#red-page-title-wrapper');
        header_ontop.css('top', adminbar_height + header_top_height);
    }
    function alacarte_header_ontop_next(){
        var header_ontop = $('.header-ontop'),
            header_ontop_next = header_ontop.next('#red-pagetitle-wrapper'),
            header_ontop_next_padding_top = parseInt(header_ontop_next.css('padding-top'));
        header_ontop_next.css('padding-top', adminbar_height + header_ontop_next_padding_top); /* Add padding for next section */
    }
    function header2_width(){
        var header_menu_wrap_width = $('.header-layout-2 .red-navigation-wrap').width();
        var header_atts = $('.header-layout-2 .red-navigation-wrap .nav-extra').width();
        var header_menu =  header_menu_wrap_width - header_atts-20;
        if($(window).width() > 1200 ) {
            $('.header-layout-2 .red-navigation-wrap #red-navigation').css('width', header_menu + 'px');
        }
    }
    /**
     * Sticky Header
     */
    function alacarte_StickyHeader(){
        'use strict';
        var c, currentScrollTop = 0,
            navbar = $('.sticky-on'),
            menu = navbar.find('#red-header-menu');
        $(window).scroll(function () {
            var a = $(window).scrollTop();
            var b = navbar.height();
            currentScrollTop = a;
            if (c < currentScrollTop && a > b + b) {
                navbar.removeClass('header-sticky').addClass('scrollDown');
                if(navbar.hasClass('header-ontop-sticky')){
                    navbar.addClass('header-ontop');
                    menu.addClass('menu-ontop').removeClass('menu-sticky');
                }
                if(navbar.hasClass('header-default-sticky')){
                    navbar.addClass('header-default');
                    menu.addClass('menu-default').removeClass('menu-sticky');
                }
            } else if (c > currentScrollTop && !(a <= b)) {
                navbar.addClass('header-sticky').removeClass('scrollDown');
                if(navbar.hasClass('header-ontop-sticky')) {
                    navbar.removeClass('header-ontop');
                    menu.removeClass('menu-ontop').addClass('menu-sticky');
                }
                if(navbar.hasClass('header-default-sticky')) {
                    navbar.removeClass('header-default');
                    menu.removeClass('menu-default').addClass('menu-sticky');
                }
            } else if(c > currentScrollTop){
                navbar.removeClass('header-sticky');
                if(navbar.hasClass('header-ontop-sticky')) {
                    navbar.addClass('header-ontop');
                    menu.addClass('menu-ontop').removeClass('menu-sticky');
                }
                if(navbar.hasClass('header-default-sticky')) {
                    navbar.addClass('header-default');
                    menu.addClass('menu-default').removeClass('menu-sticky');
                }
            }
            c = currentScrollTop;
        });
    }
    /**
     * Toggle Menu
     */
    function alacarte_toggle_menu(){
        'use strict';
        $('.red-toggle').on('click', function(e){
            e.preventDefault();
            $(this).find('.red-toggle-inner').toggleClass('active');
            $(this).next().slideToggle();
        });
    }
    /**
     * Menu Back
     * Sub menu touched on side left/right
     */
    function alacarte_touched_side(){
        'use strict';
        var $menu = $('.red-header-menu');
        if($(window).width() > 1200 ){
            $('#red-navigation').attr('style','');
            $menu.find('li').each(function(){
                var $submenu = $(this).find('> .ef5-dropdown');
                if($submenu.length > 0){
                    if($submenu.offset().left + $submenu.outerWidth() > $(window).innerWidth()){
                        $submenu.addClass('touched');
                    } else if($submenu.offset().left < 0){
                        $submenu.addClass('touched');
                    }
                    /* remove css style display from mobile to desktop menu */
                    $submenu.css('display','');
                }
            });
        }
    }

    /**
     * Open Mobile Menu
     */
    function alacarte_open_mobile_menu(){
        'use strict';
        $("#red-main-menu-mobile").on('click',function(){
            $(this).toggleClass('opened').find('.btn-nav-mobile').toggleClass('opened');
            $('#red-navigation').slideToggle();
        })
    }
    /**
     * Popup
     */
    function alacarte_popup(){
        'use strict';
        if(typeof $.magnificPopup != 'undefined'){
            /* ===================
             Popup Images Gallery
             ===================== */
            $('.red-gallery').each(function() {
                $(this).magnificPopup({
                    delegate: 'a.light-box',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    titleSrc: 'title',
                    removalDelay: 300,
                    mainClass: 'animated slideInRight mfp-gallery',
                    closeBtnInside: false,
                    zoom: {
                        //enabled: true,
                        duration: 300,
                        easing: 'ease-in-out',
                        opener: function(openerElement) {
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                    },
                    callbacks: {
                        beforeOpen: function() {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
                        }
                    }
                });
            });
            /* ===================
             Header Icon Popup
             ===================== */
            $('.red-header-popup').magnificPopup({
                type:'inline',
                closeBtnInside: false,
                removalDelay: 300,
                mainClass: 'mfp-with-zoom',
                focus: '.search-field',
                zoom: {
                    enabled: true,
                    duration: 500,
                    easing: 'ease-in-out',
                    opener: function(openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });
            /* ===================
             Popup Inline HTML
             with content verticle middle
             ===================== */
            $('.mfp-inline').magnificPopup({
                type:'inline',
                closeBtnInside: false,
                removalDelay: 300,
                mainClass: 'mfp-with-zoom',
                zoom: {
                    enabled: true,
                    duration: 500,
                    easing: 'ease-in-out',
                    opener: function(openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });
            /*==================
             Popup Iframe
             show youtube, vimeo, google maps and more
            ====================*/
            $('.popup-iframe').magnificPopup({
                //disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                closeOnBgClick: true,
                callbacks: {
                    open: function() {
                        jQuery('body').addClass('noscroll');
                    },
                    close: function() {
                        jQuery('body').removeClass('noscroll');
                    }
                }
            });
        }
    }
    /**
     * Toggle
     */
    function alacarte_toggle(){
        /* ===================
         Search Toggle
         ===================== */
        $('.red-search-toggle').on('click',function(e){
            e.preventDefault();
            $('.red-cartform').removeClass('active');
            $('.red-searchform').toggleClass('active').find('.red-search-field').focus();
        });
        $('.red-search-submit').on('click',function(e){
            if( $(this).parent().find('.red-search-field').val() == '' ) {
                e.preventDefault();
                $(this).parents('.red-searchform').removeClass('active');
            }
        });

        /* ===================
         Cart Toggle
         ===================== */
        $('.red-cart-toggle').on('click',function(e){
            e.preventDefault();
            $('.red-searchform').removeClass('active');
            $('.red-cartform').toggleClass('active').slideToggle();
        });
    }
    /**
     * Side Nav
     */
    function alacarte_side_nav(){
        /* Sidebar Nav */
        $("#red-main-sidenav .open-menu").on('click',function(){
            $(this).toggleClass('opened');
            $('#red-page').toggleClass('sidenav-open');
            $('#red-sidenav').toggleClass('open');
        })
        $('#red-close-sidenav').on('click',function(){
            $('#red-page').removeClass('sidenav-open');
            $('#red-sidenav').removeClass('open');
            $('#red-main-sidenav .btn-nav-mobile').removeClass('opened');
        })
    }
    /**
     * Media Embed dimensions
     *
     * Youtube, Vimeo, Iframe, Video, Audio.
     * @author Chinh Duong Manh
     */
    function alacarte_video_size() {
        'use strict';
        setTimeout(function(){
            $('.red-featured iframe , .red-featured  video, .red-featured .wp-video-shortcode').each(function(){
                var v_width = $(this).parent().width();
                var v_height = Math.floor(v_width / (16/9));
                $(this).attr('width',v_width).css('width',v_width);
                $(this).attr('height',v_height).css('height',v_height);
            });
        }, 100);
    }
    $(".red-accordion .card .show").parent().addClass('active');
    $(".red-accordion .card").on("click", function() {
        $(".red-accordion .card").removeClass("active");
        $(this).addClass("active");
    });
    // VC Row
    function alacarte_vcRow() {
        'use strict';
        var $site_boxed      = $('.site-boxed [data-vc-full-width="true"]'),
            $site_bordered   = $('.body-bordered [data-vc-full-width="true"]'),
            bordered_left    = parseInt($('body').css('padding-left')),
            bordered_right   = parseInt($('body').css('padding-right')),
            $header_layout_3 = $('body.header-3:not(site-boxed) [data-vc-full-width="true"]'),
            $header_layout_3_boxed = $('body.header-3.site-boxed [data-vc-full-width="true"]'),
            rtl = $('html[dir="rtl"]');
        setTimeout(function() {
            // boxed
            $.each($site_boxed, function(key, item) {
                var $el = $(this),
                    offset = parseInt($el.css('left').replace('-',''));
                if($el.data("vcStretchContent")){
                    $el.css({
                        'padding-left': offset + bordered_right + 'px',
                        'padding-right': offset + bordered_left + 'px'
                    });
                }

            }),
                $(document).trigger("vc-full-width-row", $site_boxed);
            // bordered
            $.each($site_bordered, function(key, item) {
                var $el = $(this);
                if($el.data("vcStretchContent")){
                    $el.css({
                        'padding-left': bordered_left + 'px',
                        'padding-right': bordered_right + 'px',
                    });
                }
                else{
                    $('.site-bordered .red-page.red-page-overlay-initial .vc_row[data-vc-full-width="true"]:before').css({
                        'left': bordered_left + 'px',
                        'max-width': window_width - bordered_left - bordered_right + 'px'
                    });
                }

            }),
                $(document).trigger("vc-full-width-row", $site_bordered);
            // Header Layout 3
            $.each($header_layout_3, function(key, item) {
                var $el = $(this),
                    offset = parseInt($el.css('left').replace('-',''));
                if($el.data("vcStretchContent")){
                    if(rtl.length){
                        $el.css({
                            'padding-right': bordered_right + 'px',
                        });
                    } else {
                        $el.css({
                            'padding-left': bordered_left + 'px',
                        });
                    }
                } else {
                    if(rtl.length){
                        $el.css({
                            'padding-left': offset - bordered_right + 'px',
                        });
                    }
                }
            }),
                $(document).trigger("vc-full-width-row", $header_layout_3);

            // Header Layout 3 & Boxed || Bordered
            $.each($header_layout_3_boxed, function(key, item) {
                var $el = $(this),
                    offset = parseInt($el.css('left').replace('-',''));
                if($el.data("vcStretchContent")){
                    if(rtl.length){
                        $el.css({
                            'padding-left': offset - bordered_right + 'px',
                            'padding-right': offset - bordered_left + 'px',
                        });
                    } else {
                        $el.css({
                            'padding-left': offset - bordered_right + 'px',
                            'padding-right': offset - bordered_left + 'px',
                        });
                    }
                } else {
                    if(rtl.length){
                        $el.css({
                            'padding-left': offset - bordered_right + 'px',
                        });
                    }
                }
            }),
                $(document).trigger("vc-full-width-row", $header_layout_3_boxed);
        }, 0 );
    }
    // Inline CSS to head
    function alacarte_inlineCss(){
        'use strict';
        var _inline_css = '<style class="red-inline-css">';
        $(document).find('div.red-inline-css').each(function () {
            var _this = $(this);
            _inline_css += _this.attr("data-css");
            _this.remove();
        });
        _inline_css += '</style>';
        $('head').append(_inline_css);
    }
    // Fake Ajax Pagination
    function alacarte_ajax_pagination(){
        'use strict';
        $('.red-posts').each(function(){
            "use strict";
            var $this = $(this),
                $id = $(this).attr('id'),
                $loading_class = 'red-loading';
            $this.find('.red-loop-pagination a').live('click',function(){
                //$this.fadeTo('slow',0.3).addClass($loading_class);
                $this.addClass($loading_class);
                var $link = $(this).attr('href');
                jQuery.get($link,function(data){
                    $this.html($(data).find('#'+$id).html());
                    //$this.fadeTo('slow',1).removeClass($loading_class);
                    $this.removeClass($loading_class);
                    $this.find('.wpb_animate_when_almost_visible').addClass('wpb_start_animation animated');
                });
                $('html,body').animate({scrollTop: $this.offset().top - 100}, 750);
                return false;
            });
        });
    }
    // WooCommerce Filters
    function alacarte_woo_filters(){
        "use strict";
        $('.red-main').each(function(){
            var $this = $(this),
                $id = $(this).attr('id'),
                $loading_class = 'red-loading',
                $filtered_nav = $('.widget_layered_nav_filters ul');

            $this.find('.wc-layered-nav-term > a, .chosen > a, .wc-layered-nav-rating > a, .red-filter').live('click touch',function(){
                'use strict';
                //$this.fadeTo('slow',0.3).addClass($loading_class);
                $this.addClass($loading_class);
                var $link = $(this).attr('href');
                window.history.pushState({url: "" + $link + ""}, "", $link);
                jQuery.get($link,function(data){
                    $this.html($(data).find('#'+$id).html());
                    //$this.removeClass($loading_class);
                    $this.fadeTo('slow',1).removeClass($loading_class);
                });
                return false;
            });
        })
    };

    // Re-Run filer by Price
    function alacarte_init_price_filter() {
        $( 'input#min_price, input#max_price' ).hide();
        $( '.price_slider, .price_label' ).show();

        var min_price = $( '.price_slider_amount #min_price' ).data( 'min' ),
            max_price = $( '.price_slider_amount #max_price' ).data( 'max' ),
            current_min_price = $( '.price_slider_amount #min_price' ).val(),
            current_max_price = $( '.price_slider_amount #max_price' ).val();
        if(typeof $.slider != 'undefined'){
            $( '.price_slider:not(.ui-slider)' ).slider({
                range: true,
                animate: true,
                min: min_price,
                max: max_price,
                values: [ current_min_price, current_max_price ],
                create: function() {

                    $( '.price_slider_amount #min_price' ).val( current_min_price );
                    $( '.price_slider_amount #max_price' ).val( current_max_price );

                    $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
                },
                slide: function( event, ui ) {

                    $( 'input#min_price' ).val( ui.values[0] );
                    $( 'input#max_price' ).val( ui.values[1] );

                    $( document.body ).trigger( 'price_slider_slide', [ ui.values[0], ui.values[1] ] );
                },
                change: function( event, ui ) {

                    $( document.body ).trigger( 'price_slider_change', [ ui.values[0], ui.values[1] ] );
                }
            });
        }
    }
    /*
     * Woocomere filter modify
     * Add data title
    */
    function alacarte_woo_price_filter_add_data_title(){
        $('.price_slider_wrapper ').each(function () {
            var _this = $(this);
            if(_this.find('.ui-slider-handle').length < 2)
                return;
            var from = _this.find('.price_label .from'),
                to = _this.find('.price_label .to'),
                handle_left = $(_this.find('.ui-slider-handle')[0]),
                handle_right = $(_this.find('.ui-slider-handle')[1]);
            //_this.find('.price_label').hide();
            handle_left.attr('data-title',from.html());
            handle_right.attr('data-title',to.html());
            from.on('DOMSubtreeModified',function () {
                handle_left.attr('data-title',$(this).html());
            });
            to.on('DOMSubtreeModified',function () {
                handle_right.attr('data-title',$(this).html());
            });
        });
    }
    rebuild_price_filter();
    function rebuild_price_filter() {
        var price_filter = $('.widget_price_filter form');
        //price_filter.find('button[type="submit"]').css('visibility', 'hidden');
        price_filter.find('.price_slider').on('slidestop', function () {
            //do_filter();
        });
    }
    /**
     * Single Product
     */

    //quantity number field custom
    function alacarte_quantity_plus_minus(){
        $( ".quantity input" ).wrap( "<div class='red-quantity'></div>" );
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
    }
    function alacarte_quantity_plus_minus_action(){
        $(document).on('click','.quantity .quantity-button',function () {
            var $this = $(this),
                spinner = $this.closest('.quantity'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('quantity-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    // WooCommerce Single Product Gallery
    function alacarte_wc_single_product_gallery(){
        'use strict';
        if(typeof $.flexslider != 'undefined'){

            $('.wc-gallery-sync').each(function() {
                var itemW      = parseInt($(this).attr('data-thumb-w')),
                    itemH      = parseInt($(this).attr('data-thumb-h')),
                    itemMargin = parseInt($(this).attr('data-thumb-margin')),
                    itemSpace  = itemMargin;
                if($(this).hasClass('thumbnail_v')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : false,
                        directionNav   : true,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        direction      : 'vertical',
                        slideshow      : false,
                        animationLoop  : false,
                        itemWidth      : itemW, // add thumb image height
                        itemMargin     : itemSpace, // need it to fix transform item
                        move           : 3,
                        start: function(slider){
                            var asNavFor     = slider.vars.asNavFor,
                                height       = $(asNavFor).height(),
                                height_thumb = $(asNavFor).find('.flex-viewport').height();

                            slider.css({'max-height' : height_thumb, 'overflow': 'hidden'});
                            slider.find('> .flex-viewport > *').css({'height': height, 'width': ''});
                        }

                    });
                }
                if($(this).hasClass('thumbnail_h')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : false,
                        directionNav   : true,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        slideshow      : false,
                        animationLoop  : false, // Breaks photoswipe pagination if true.
                        itemWidth      : itemW,
                        itemMargin     : itemSpace,
                        start: function(slider){

                        }
                    });
                };
            });

        }
    }
    /**
     * Cart Page
     */
    function alacarte_table_move_column(table, selected ,from, to, remove, colspan, colspan_value) {
        var rows = jQuery(selected, table);
        var cols;
        rows.each(function() {
            cols = jQuery(this).children('th, td');
            cols.eq(from).detach().insertAfter(cols.eq(to));
        });
        var rows_remove = jQuery(remove, table);
        rows_remove.each(function(){
            jQuery(this).remove(remove);
        });
        var colspan = jQuery(colspan, table);
        colspan.each(function(){
            jQuery(this).attr('colspan',colspan_value);
        });
    }
    function alacarte_remove_cart_actions(){
        //jQuery('.actions > .coupon').remove();
        //jQuery('.actions > [name="update_cart"]').remove();
    }

    // Woo Smart Compare
    function alacarte_wooscp_change_text(){
        'use strict';
        $('.wooscp-btn , .woosw-btn').each(function(){
            "use strict";
            var $this = $(this),
                $id = $(this).attr('data-id'),
                selected_title = $(this).parent().attr('data-selected')
            ;
            if($this.hasClass('wooscp-btn-added') || $this.hasClass('woosw-added')){
                $this.parent().attr('data-hint',selected_title);
            }

        });
        $( 'body' ).on( 'click touch', '.wooscp-btn, .woosw-btn', function( e ) {
            "use strict";
            var product_id = $( this ).attr( 'data-id' ),
                selected_title = $(this).parent().attr('data-selected');
            if ( $( this ).hasClass( 'wooscp-btn-added' ) || $( this ).hasClass( 'woosw-added' )) {
                $(this).parent().attr('data-hint',selected_title);
            } else {
                $(this).parent().attr('data-hint',selected_title);
            }

            e.preventDefault();
        } );
    }
    /* Masonry */
    function alacarte_masonry_filter(){
        if(typeof $.fn.masonry != 'undefined'){
            if (jQuery(".red-posts-masonry").length) {
                var blog_dom = jQuery(".red-posts-masonry").get(0);

                var $grid = imagesLoaded( blog_dom, function() {
                    jQuery(".red-posts-masonry").isotope({
                        layoutMode: 'masonry',
                        percentPosition: true,
                        itemSelector: '.red-masonry-item',
                        masonry: {
                            columnWidth: '.red-masonry-sizer',
                            gutter: '.red-masonry-gutter'
                        }
                    });
                    jQuery(window).trigger('resize');

                });
            }
            var $filter = jQuery(".red-masonry-filters .filter-item");
            $filter.on("click", function (e){
                e.preventDefault();
                jQuery(this).addClass("active").siblings().removeClass("active");

                var filterValue = jQuery(this).attr('data-filter');
                jQuery($grid.elements).isotope({ filter: filterValue });

            });
        }
    }
    // drag size and position on load and resize
    $('.filter-wrap .filter-item').click(function(e){
        var positionTop = $(this).position().top,
            positionLeft = $(this).position().left,
            itemWidth = $(this).width();
        $(".line_action").css({"width":itemWidth+"px", "top":positionTop+"px", "left":positionLeft+"px"});
    });
    var resizeLine = function(){
        $(".line_action").each(function(){
            var positionTop = $(this).closest(".filter-wrap").find(".filter-item.active").position().top,
                positionLeft = $(this).closest(".filter-wrap").find(".filter-item.active").position().left,
                itemWidth = $(this).closest(".filter-wrap").find(".filter-item.active").width();
            $(this).css({"width":itemWidth+"px", "top":positionTop+"px", "left":positionLeft+"px"});
        }).addClass("active");
    }
    $(window).bind('load', resizeLine);
    $(window).bind('orientationchange', resizeLine);
    $(window).bind('resize', resizeLine);



    /* VC Animation */
    function alacarte_vc_animation_callback(){
        if(typeof $.fn.waypoint != 'undefined'){
            jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").waypoint(function() {
                jQuery(this).addClass("wpb_start_animation animated")
            }, {
                offset: "85%"
            })
        }
    }

    function alacarte_svg_color(){
        jQuery('img.red-svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, else we gonna set it if we can.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    };
})( jQuery );

/* Hover Effect */
(function ($) {
    'use strict';
    function EF5HoverDirection(ev, obj) {
        'use strict';
        var w = $(obj).width(),
            h = $(obj).height(),
            x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
            d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
        return d;
    }
    function EF5HoverDirClass( ev, obj, state,current_class ) {
        'use strict';
        var direction = EF5HoverDirection( ev, obj ),
            class_suffix = null;

        switch ( direction ) {
            case 0 : class_suffix = '-top';    break;
            case 1 : class_suffix = '-right';  break;
            case 2 : class_suffix = '-bottom'; break;
            case 3 : class_suffix = '-left';   break;
        }
        $(obj).attr('class',current_class+ ' '+ state + class_suffix );
    }
    $.fn.EF5HoverDir = function () {
        'use strict';
        this.each(function () {
            var gl_class = '';
            $(this).addClass('hover-dir');
            $(this).hover(function(ev){
                gl_class = gl_class === '' ? $(this).attr('class') : gl_class;
                EF5HoverDirClass( ev, this, 'in',gl_class );
            },function(ev){
                gl_class = gl_class === '' ? $(this).attr('class') : gl_class;
                EF5HoverDirClass( ev, this, 'out',gl_class );
            })
        })
    }
    $('.hoverdir-wrap').EF5HoverDir();
    $('.red-btn-slide').EF5HoverDir();
})(jQuery);


jQuery(document).ready(function() {
    alacarte_btt_start();
    jQuery(window).scroll(function(e) {
        alacarte_btt_start();
    });
    jQuery('#red-btt-circle').click(function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 'slow');
    });
});

function alacarte_btt_start() {
    var scrollTop = jQuery(window).scrollTop();
    var docHeight = jQuery(document).height();
    var winHeight = jQuery(window).height();
    var scrollPercent = (scrollTop) / (docHeight - winHeight);
    var scrollPercentRounded = Math.round(scrollPercent * 100);

    if (scrollPercentRounded > scrollPercent) {
        if (jQuery('#red-btt-btn').hasClass('show')) {} else {
            jQuery('#red-btt-btn').addClass('show');
        }
    } else {
        jQuery('#red-btt-btn').removeClass('show');
    }
    alacarte_btt_btn(scrollPercentRounded);
};

function alacarte_btt_btn(i) {
    prec = i * 3.6;
    jQuery('#red-btt-prec').html(i + '%');
    var borderColor = alacarte_ajax_opts.primary_color;
    borderActiveColor = alacarte_ajax_opts.accent_color;
    if (prec <= 180) {
        jQuery('#red-btt-border').css('background-image', 'linear-gradient(' + (prec + 90) + 'deg, transparent 50%, ' + borderColor + ' 50%),linear-gradient(90deg, ' + borderColor + ' 50%, transparent 50%)');
    } else {
        jQuery('#red-btt-border').css('background-image', 'linear-gradient(' + (prec - 90) + 'deg, transparent 50%, ' + borderActiveColor + ' 50%),linear-gradient(90deg, ' + borderColor + ' 50%, transparent 50%)');
    }
};
