function header_dummy($) {
	var shH = jQuery('#site-header').outerHeight();
	jQuery('#header-dummy').css('height', shH);
}

function offsets($) {
	if (jQuery(window).width() < 640) { slideH = 400;}
	else if (jQuery(window).width() < 1024) { slideH = 700;}
	else { slideH = 850;}

	jQuery('#featured-slider ul.slides li iframe').css('height', slideH);

	jQuery('#featured-slider ul.slides li').each(function() {

		var	headH = jQuery(this).find('h1').height(),
				headF = (slideH - headH) / 2,
				headI = headF + 50; 
				headF = (headF - 58) + 'px';
				headI = (headI - 58) + 'px';
		jQuery(this).find('h1').css('top',headI);
		jQuery(this).find('h1').attr('initT',headI);
		jQuery(this).find('h1').attr('finalT',headF);
		jQuery(this).css('height', slideH);

	});

	jQuery('.cta').each(function() {
		var ctaW = jQuery(this).width();
		jQuery(this).css('height', ctaW);
		var ctaVW = jQuery(this).find('video').width(),
				ctaVW = '-' + (ctaVW / 2) + 'px';
		jQuery(this).find('video').css('margin-left', ctaVW);

		if (jQuery(window).width() < 1024) {
			jQuery(this).find('video').css('height', ctaW);
		}
	});

}

function subnav($) {
	jQuery('#site-header ul li:has(ul.sub-menu)').hover(
    function() { jQuery(this).find('.sub-menu').stop().slideDown(500);},
    function() { jQuery(this).find('.sub-menu').stop().slideUp(500);}
  );

  jQuery('#nav-trigger').click( function() {
    jQuery('#site-header').toggleClass('mnav-open');
    jQuery(this).toggleClass('triggered');
    jQuery('#mobile-nav > nav').slideToggle(500);  
  });

  jQuery('#mobile-nav nav ul li:has(ul.sub-menu)').addClass('mnav-trigger');
  jQuery('#mobile-nav nav ul li.mnav-trigger > a').click(function(){
    jQuery(this).parent().toggleClass('open');
    jQuery(this).parent().children('ul.sub-menu').slideToggle();
  });
  jQuery('li.mnav-trigger > a, li.no-link > a, a.no-link').click(function(e){ e.preventDefault(); });
}

function feature_slider($) {
	var finalT = jQuery('#featured-slider ul.slides li h1').attr('finalT'),
			initT = jQuery('#featured-slider ul.slides li h1').attr('initT'),
			slider = jQuery('#featured-slider');
	slider.flexslider({
	  animation: "slide",
	  controlNav: false,
	  directionNav: true,
	  direction: "vertical",
	  slideshow: true,
	  animationloop: false,
	  keyboard: false,
	  multipleKeyboard: false,
	  slideshowSpeed: 12000,
	  animationSpeed: 2500,
	  start: function(slider){
	  	var currentSlide = slider.currentSlide + 2;
	  	jQuery('#featured-slider ul.slides li:nth-child('+currentSlide+') h1')
				.transition({ opacity: 1, top: finalT, delay: 2000, duration:3000});
			jQuery('#featured-slider .flex-direction-nav')
				.transition({ opacity: 1, top: '50%', delay: 2000, duration:3000});
	  },
	  before: function(slider){
	  	var currentSlide = slider.currentSlide + 2;
	  	jQuery('#featured-slider ul.slides li:nth-child('+currentSlide+') h1').attr('style','');
	  	jQuery('#featured-slider .flex-direction-nav').attr('style','');
		},
	  after: function(slider){
	  	var currentSlide = slider.currentSlide + 2;
			jQuery('#featured-slider ul.slides li:nth-child('+currentSlide+') h1')
				.transition({ opacity: 1, top: finalT, delay: 2000, duration:3000});
			jQuery('#featured-slider .flex-direction-nav')
				.transition({ opacity: 1, top: '50%', delay: 2000, duration:3000});
	  },
	});

}

function photo_grid($) {
	var grid = jQuery('.photo-grid').masonry({
	  itemSelector: '.grid-item',
	  columnWidth: '.grid-sizer',
	  gutter: '.gutter-sizer',
	  percentPosition: true,
	});
	grid.on( 'layoutComplete', vert_center('.grid-item .shade span') );
	grid.on( 'layoutComplete', jQuery('.photo-grid').transition({ opacity: 1}));

	jQuery('[data-fancybox="photo-grid"]').fancybox({
		animationEffect: "zoom",
		transitionEffect: "slide",
		protect: true,
	});

}


function vert_center($elem) {
	jQuery($elem).each(function() {
		var elemH = jQuery(this).outerHeight(),
				parH = jQuery(this).parent().outerHeight(),
				elemO = ((parH - elemH) / 2) + 'px';
		jQuery(this).css('top', elemO);
	});
}

function horz_center($elem) {
	jQuery($elem).each(function() {
		var elemW = jQuery(this).outerWidth(),
				parW = jQuery(this).parent().outerWidth(),
				elemO = '-' + ((parW - elemW) / 2) + 'px';
		jQuery(this).css('margin-left', elemO);
	});
}

function reveal($elem) {
  if ($elem == '#opener h1') {
		jQuery($elem).transition({ opacity:1, right: 0, duration:1500});
  }
  else {
  	jQuery.each(jQuery($elem),
		  function(i, el){
		    setTimeout(function(){
		      jQuery(el).transition({ opacity:1, top: 0, duration:300});
		    }, 300 + ( i * 300 ));	
		  }
	  );
  }
}

jQuery(function ($) {
  $(window).bind('resize orientationchange', function() {
  	header_dummy();
//   	offsets();
  	vert_center('.cta .shade span');
  });
});

jQuery(function ($) {
  $(window).load(function() {
    photo_grid();
  });
});

jQuery(document).ready(function($) {
	header_dummy();
	offsets();
	subnav();
	feature_slider();
	vert_center('.cta .shade span');
	reveal('nav#main-nav > ul > li');
});

jQuery(function ($) {
  $(document).scroll( function(){

  	var scT = jQuery(document).scrollTop(),
				openT = jQuery('#opener').offset().top,
				openT = openT - 300,
				fsImg = jQuery('#featured-slider ul.slides li img').height(),
				headH = jQuery('header#site-header').height(),
				openerT = fsImg - 500;

	  if (scT > 1){
// 	  	jQuery('html.no-touchevents #site-header').addClass('scroll');
// 	  	jQuery('html.no-touchevents #story-nav').addClass('scroll');
	  	header_dummy();
	  }
	  if (scT < 1){
// 	  	jQuery('html.no-touchevents #site-header').removeClass('scroll');
// 	  	jQuery('html.no-touchevents #story-nav').removeClass('scroll');
	  	header_dummy();
	  }
		if (scT > openerT){ reveal('#opener h1');}
	  if (scT > openT){ reveal('#home-ctas .cta');}

  });
})