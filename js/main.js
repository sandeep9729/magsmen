/* ===================================================================
 * Sublime - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".header-logo img").attr("src", "images/logo.png");
    }


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {

        $(".loader").delay(1000).fadeOut("slow");
        $("#overlayer").delay(1000).fadeOut("slow");
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

            ssChangeSubIntroText();
        
        });
    };

    var ssChangeSubIntroText = function() {
        $WIN.on('load', function() {
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i = 0; i < elements.length; i++) {
                console.log(elements[i]);
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
            document.body.appendChild(css);
        });
    }


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var ssOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


   /* photoswipe
    * ----------------------------------------------------- */
    var ssPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each( function(i) {

            var $folio = $(this),
                $thumbLink =  $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            var item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();

    })();

})(jQuery);

$(function () {
    $('#myButton').floatingWhatsApp({
        phone: '919044910449',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});

$(function () {
    $('#myButton_subash').floatingWhatsApp({
        phone: '918500698699',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_subbarao').floatingWhatsApp({
        phone: '919848132498',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_venkat').floatingWhatsApp({
        phone: '917780477693',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_vijaykrishna').floatingWhatsApp({
        phone: '919347166699',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_rajesh').floatingWhatsApp({
        phone: '919248022760',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_praneeth').floatingWhatsApp({
        phone: '919916663228',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_vinod').floatingWhatsApp({
        phone: '919885050850',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_karteek').floatingWhatsApp({
        phone: '919542822255',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_nagarjunakapil').floatingWhatsApp({
        phone: '919849160911',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_nagoorbasha').floatingWhatsApp({
        phone: '919642461623',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(function () {
    $('#myButton_ramakrishna').floatingWhatsApp({
        phone: '919246463834',
        popupMessage: 'Hello, how can I help you?',
        message: "",
        showPopup: true,
        showOnIE: false,
        headerTitle: 'Welcome!',
        headerColor: '#075e54',
        backgroundColor: '#075e54',
        buttonImage: '<img src="whatsapp/whatsappimg.png" />'
    });
});
$(document).ready(function(){
    $('.customer-logos').slick({
        width: 100,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 2
            }
        }]
    });
});