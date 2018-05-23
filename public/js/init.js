$(document).on('ready', function () {
	  // initialization of carousel
	  $.HSCore.components.HSCarousel.init('[class*="js-carousel"]');

	  $('#carouselCus1').slick('setOption', 'responsive', [{
	    breakpoint: 1200,
	    settings: {
	      slidesToShow: 4
	    }
	  }, {
	    breakpoint: 992,
	    settings: {
	      slidesToShow: 3
	    }
	  }, {
	    breakpoint: 768,
	    settings: {
	      slidesToShow: 2
	    }
	  }], true);
	});

	$('.slick').slick();

	// initialization of header
	$.HSCore.components.HSHeader.init($('#js-header'));
	$.HSCore.helpers.HSHamburgers.init('.hamburger');

	// initialization of HSMegaMenu component
	$('.js-mega-menu').HSMegaMenu({
	  event: 'hover',
	  pageContainer: $('.container'),
	  breakpoint: 991
	});

	// initialization of HSDropdown component
	$.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {
	  afterOpen: function () {
	    $(this).find('input[type="search"]').focus();
	  }
	});

	// initialization of go to
	$.HSCore.components.HSGoTo.init('.js-go-to');

	// initialization of countdowns
	var countdowns = $.HSCore.components.HSCountdown.init('.js-countdown', {
	  yearsElSelector: '.js-cd-years',
	  monthElSelector: '.js-cd-month',
	  daysElSelector: '.js-cd-days',
	  hoursElSelector: '.js-cd-hours',
	  minutesElSelector: '.js-cd-minutes',
	  secondsElSelector: '.js-cd-seconds'
	});

	$(window).on('load', function() {
	  // initialization of HSScrollBar component
	  $.HSCore.components.HSScrollBar.init($('.js-scrollbar'));
	});

	// Revolution Slider
	var tpj = jQuery;

	var revapi1086;
	tpj(document).ready(function () {
	  if (tpj("#rev_slider_1086_1").revolution == undefined) {
	    revslider_showDoubleJqueryError("#rev_slider_1086_1");
	  } else {
	    revapi1086 = tpj("#rev_slider_1086_1").show().revolution({
	      sliderType: "standard",
	      jsFileLocation: "revolution/js/",
	      sliderLayout: "auto",
	      dottedOverlay: "none",
	      delay: 9000,
	      navigation: {
	        keyboardNavigation: "off",
	        keyboard_direction: "horizontal",
	        mouseScrollNavigation: "off",
	        mouseScrollReverse: "default",
	        onHoverStop: "on",
	        touch: {
	          touchenabled: "on",
	          swipe_threshold: 75,
	          swipe_min_touches: 50,
	          swipe_direction: "horizontal",
	          drag_block_vertical: false
	        }
	        ,
	        arrows: {
	          style: "gyges",
	          enable: true,
	          hide_onmobile: false,
	          hide_onleave: false,
	          tmp: '',
	          left: {
	            h_align: "right",
	            v_align: "bottom",
	            h_offset: 40,
	            v_offset: 0
	          },
	          right: {
	            h_align: "right",
	            v_align: "bottom",
	            h_offset: 0,
	            v_offset: 0
	          }
	        }
	      },
	      responsiveLevels: [1240, 1024, 778, 480],
	      visibilityLevels: [1240, 1024, 778, 480],
	      gridwidth: [1200, 1024, 778, 480],
	      gridheight: [600, 600, 600, 600],
	      lazyType: "single",
	      parallax: {
	        type: "scroll",
	        origo: "slidercenter",
	        speed: 400,
	        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
	        type: "scroll",
	      },
	      shadow: 0,
	      spinner: "off",
	      stopLoop: "off",
	      stopAfterLoops: -1,
	      stopAtSlide: -1,
	      shuffle: "off",
	      autoHeight: "off",
	      disableProgressBar: "on",
	      hideThumbsOnMobile: "off",
	      hideSliderAtLimit: 0,
	      hideCaptionAtLimit: 0,
	      hideAllCaptionAtLilmit: 0,
	      debugMode: false,
	      fallbacks: {
	        simplifyAll: "off",
	        nextSlideOnWindowFocus: "off",
	        disableFocusListener: false,
	      }
	    });
	  }
	});