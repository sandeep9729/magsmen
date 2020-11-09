"use strict";

/**
 * Global Variables
 */
var $window = $(window);
var winWidth = $window.width();
var winHeight = $window.height();

var $headNav = $('#jsHeadNav');
var nav_wrap = $('#mobile-nav-wrap');


/**
 * Detect Device Type
 */
var isMobile;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;
	$('html').addClass('mobile');
} else {
	isMobile = false;
	$('html').addClass('desktop');
}


/**
 * Window Load
 */
$(window).load(function() {
	hideSitePreloader();

	/** Introduction **/
    init_introduction();

    /** HeadNav */
    init_headnav();

    /** HeadNav **/
    $('#jsHeadNav>ul').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing'
    });

    $('#mobile-nav>ul').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
        begin: function() {
            nav_wrap.fadeOut(500);
        }
    });

    /** Tabs **/
    var $tab = $('.nav-tabs a');
    $tab.on('click', function () {
        var $current = $(this);
        var $currentLi = $current.parent();
        var $currentUl = $current.closest('.nav-tabs');
        var $currentTabCont = $currentUl.next('.tab-content');
        var $currentHash = $current.attr('href');

        if ( !$currentLi.hasClass('active') ){
            $currentUl.find('li').removeClass('active');
            $currentLi.addClass('active');
            $currentTabCont.find('.tab-pane').hide();
            $currentTabCont.find(''+$currentHash+'').fadeIn(500);
        }
        return false;
    });

	/** Contact Form */
	$('#form-submit').on('click', function(e){
		var errors;
		var contact_form = $('#support-form');
		var contact_form_items = contact_form.find('.form-control');
		var name = contact_form.find('.form-name');
		var email = contact_form.find('.form-email');
		var message = contact_form.find('.form-message');
		var contact_form_response = contact_form.find('.form-response');

		// Reset errors
		contact_form_response.empty();
		contact_form_items.removeClass('error');
		errors = false;

		if (name.val()  === '') {
			errors = true;
			name.addClass('error');
		}
		if (email.val() === '' || !isValidEmail(email.val())) {
			errors = true;
			email.addClass('error');
		}
		if (message.val() === '') {
			errors = true;
			message.addClass('error');
		}
		
		if( errors ) {
			return false;
		}		
	});


	/* Navigation Close */
	$('#btn-nav-close').on('click', function(){
		nav_wrap.fadeOut(500);
	});

	$('#btn-nav-open').on('click', function(){
		nav_wrap.fadeIn(500);
	});
});


/**
 * Window Resize
 */
var resizeTimeout;
$(window).resize(function () {
    var onResize = function () {
		init_headnav();
        init_introduction();
    }

    // New height and width
    var winNewWidth = $(window).width(),
        winNewHeight = $(window).height();

    // Compare the new height and width with old one
    if (winWidth != winNewWidth || winHeight != winNewHeight) {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(onResize, 10);
    }

    //Update the width and height
    winWidth = winNewWidth;
    winHeight = winNewHeight;
});


/**
 * Window Scroll
 */
var range = 200;
var content = $('#jsContent');
var intro = $('#introduction');

if( intro.length > 0 ){
	$(window).on('scroll', function () {
		var scrollTop = $(this).scrollTop();
		var offset = content.offset().top;
		var height = intro.outerHeight()*2;
		offset = offset + height / 2;
		var calc = 1 - (scrollTop - offset + range) / range;

		intro.css({ 'opacity': calc });

		if ( calc > '1' ) {
			intro.css({ 'opacity': 1 });
		} else if ( calc < '0' ) {
			intro.css({ 'opacity': 0 });
		}
	});
}


/**
 * Functions
 */
function init_introduction(){
	var $space,$introHeight;
    var $about = $('#about');
    var $intro = $('#introduction');
    var $introCont = $('.container','#introduction');

	$intro.css('height', 'auto');
    $introHeight = $intro.outerHeight();
    $space = winHeight - $introHeight;

    if( $space >= 0 ){
        $introCont.css('padding-top', parseInt($space/2)+'px');
        $introHeight = winHeight;
    } else {
        $introCont.css('padding-top', '0px');
    }

    $about.css('height',$introHeight+'px');
	$intro.css('height',$introHeight+'px');
}

function init_headnav(){
    if(Modernizr.csstransforms) { // Test if CSS transitions are supported
        var $spaceNav = $headNav.width()/2 - $headNav.height()/2;
        $headNav.css({'left': $spaceNav+'px', 'top': ($spaceNav - 20)+'px'});
    }
}

function isValidEmail(emailAddress){
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};

function hideSitePreloader() {
	$('#preloader').remove();
	$('body').removeClass('loading');
}