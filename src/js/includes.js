// $(function(){
//
// var
// $win = $(window),
// winH = $win.height(),
// isPC = window.matchMedia('(min-width:769px)').matches;
// breakpoint = 768;
//
// var headerPath = (isPC) ? '/common/includes/header.html' : '/common/includes/sp/header.html'
//
// $.when(
//
// 	$.ajax({//header
// 		url: headerPath,
// 		dataType: 'html'
// 	}).done(function(data){
// 		$('#header').replaceWith(data),
// 		$('#header').after('<div class="l-overlay c-mask-overlay"></div>')
// 	}),
//
// 	$.ajax({//footer
// 		url: '/common/includes/footer.html',
// 		dataType: 'html'
// 	}).done(function(data){
// 		$('#footer').replaceWith(data)
// 	})
//
// ).then(function(){
//
//
//
// 	// Pagetop change Color (Scroll Magic)
// 	//---------------------------------------------------
//
// 	var h3 = $('#footer').height();
//
// 	var controller3 = new ScrollMagic.Controller({
// 		globalSceneOptions: {
// 			duration: h3
// 		}
// 	})
//
// 	var scene3 = new ScrollMagic.Scene({
// 		triggerElement: '#footer'
// 	})
// 	.setClassToggle('#l-anchor', 'is-white')
// 	.addTo(controller3)
//
// 	var whiteTrg1 = $('.white-trg1');
// 	var whiteTrg2 = $('.white-trg2');
// 	var whiteTrg3 = $('.white-trg3');
// 	var whiteTrg4 = $('.white-trg4');
// 	var whiteTrg5 = $('.white-trg5');
//
// 	if(whiteTrg1.length > 0) {
// 		var h_wht1 = whiteTrg1.height();
// 		var controller_wht1 = new ScrollMagic.Controller({
// 			globalSceneOptions: {
// 				duration: h_wht1
// 			}
// 		})
// 		var scene_wht1 = new ScrollMagic.Scene({
// 			triggerElement: '.white-trg1'
// 		})
// 		.setClassToggle('#l-anchor', 'is-white')
// 		.addTo(controller_wht1)
// 	}
//
// 	if(whiteTrg2.length > 0) {
// 		var h_wht2 = whiteTrg2.height();
// 		var controller_wht2 = new ScrollMagic.Controller({
// 			globalSceneOptions: {
// 				duration: h_wht2
// 			}
// 		})
// 		var scene_wht2 = new ScrollMagic.Scene({
// 			triggerElement: '.white-trg2'
// 		})
// 		.setClassToggle('#l-anchor', 'is-white')
// 		.addTo(controller_wht2)
// 	}
//
// 	if(whiteTrg3.length > 0) {
// 		var h_wht3 = whiteTrg3.height();
// 		var controller_wht3 = new ScrollMagic.Controller({
// 			globalSceneOptions: {
// 				duration: h_wht3
// 			}
// 		})
// 		var scene_wht3 = new ScrollMagic.Scene({
// 			triggerElement: '.white-trg3'
// 		})
// 		.setClassToggle('#l-anchor', 'is-white')
// 		.addTo(controller_wht3)
// 	}
//
// 	if(whiteTrg4.length > 0) {
// 		var h_wht4 = whiteTrg4.height();
// 		var controller_wht4 = new ScrollMagic.Controller({
// 			globalSceneOptions: {
// 				duration: h_wht4
// 			}
// 		})
// 		var scene_wht4 = new ScrollMagic.Scene({
// 			triggerElement: '.white-trg4'
// 		})
// 		.setClassToggle('#l-anchor', 'is-white')
// 		.addTo(controller_wht4)
// 	}
//
// 	if(whiteTrg5.length > 0) {
// 		var h_wht5 = whiteTrg5.height();
// 		var controller_wht5 = new ScrollMagic.Controller({
// 			globalSceneOptions: {
// 				duration: h_wht5
// 			}
// 		})
// 		var scene_wht5 = new ScrollMagic.Scene({
// 			triggerElement: '.white-trg5'
// 		})
// 		.setClassToggle('#l-anchor', 'is-white')
// 		.addTo(controller_wht5)
// 	}
//
//
//
// 	// Scroll Actions
// 	//---------------------------------------------------
//
// 	$win.on('load scroll', function(){
//
// 		var scrollTop = $win.scrollTop();
//
// 		// Go to Top
// 		var showPos = 120;
//
// 		if(scrollTop >=  showPos) {
// 			$('.l-anchor').addClass('is-pagetop').removeClass('is-scroll');
// 		} else {
// 			$('.l-anchor').addClass('is-scroll').removeClass('is-pagetop');
// 		}
// 	});
//
//
//
// 	// Resize Actions
// 	//---------------------------------------------------
//
// 	enquire.register('screen and (max-width:768px)',{
// 		match: function() {
// 			$.when(
// 				$.ajax({//header
// 					url: '/common/includes/sp/header.html',
// 					dataType: 'html'
// 				}).done(function(data){
// 					$('#header').replaceWith(data)
// 				})
// 			).then(function(){
// 				spMenu();
// 			})
// 		},
// 		unmatch: function() {
// 			$.when(
// 				$.ajax({//header
// 					url: '/common/includes/header.html',
// 					dataType: 'html'
// 				}).done(function(data){
// 					$('#header').replaceWith(data)
// 				})
// 			).then(function(){
// 				megaMenu();
// 			})
// 		}
// 	})
//
// 	if(isPC) {
// 		megaMenu();
// 	}
//
//
//
//
// 	// Mega menu
// 	//---------------------------------------------------
//
// 	var
// 	gnav_elm,
// 	menu_elm,
// 	menu_product,
// 	menu_tech,
// 	menu_works,
// 	menu_about,
// 	menu_recruit,
// 	menu_overlay;
//
// 	function megaMenu() {
//
// 		gnav_elm = $('.l-gnav__item'),
// 		menu_elm = $('.l-menu__box'),
// 		menu_product = $('.l-menu__box--product'),
// 		menu_tech = $('.l-menu__box--tech'),
// 		menu_works = $('.l-menu__box--works'),
// 		menu_about = $('.l-menu__box--about'),
// 		menu_recruit = $('.l-menu__box--recruit'),
// 		menu_overlay = $('.l-overlay');
//
// 		gnav_elm.hover(
// 			function() {
// 				var elm = $(this);
// 				elm.addClass('is-active').siblings().removeClass('is-active');
// 				menu_overlay.stop(false,false).fadeIn(800);
// 				if(elm.hasClass('l-gnav__item--product')) {
// 					menu_product.addClass('is-active').stop(false,false).slideDown(500, 'easeInOutExpo');
// 					menu_product.siblings().removeClass('is-active').slideUp(0);
// 				} else if(elm.hasClass('l-gnav__item--technology')) {
// 					menu_tech.addClass('is-active').stop(false,false).slideDown(500, 'easeInOutExpo');
// 					menu_tech.siblings().removeClass('is-active').slideUp(0);
// 				} else if(elm.hasClass('l-gnav__item--about')) {
// 					menu_about.addClass('is-active').stop(false,false).slideDown(500, 'easeInOutExpo');
// 					menu_about.siblings().removeClass('is-active').slideUp(0);
// 				} else if(elm.hasClass('l-gnav__item--recruit')) {
// 					menu_recruit.addClass('is-active').stop(false,false).slideDown(500, 'easeInOutExpo');
// 					menu_recruit.siblings().removeClass('is-active').slideUp(0);
// 				} else {
// 					closeMenu()
// 				}
// 			}
// 		)
//
// 		menu_overlay.hover(
// 			function() {
// 				closeMenu()
// 			}
// 		)
//
// 		$('.l-header').on('click', function(){
// 			closeMenu()
// 		})
// 	}
//
//
// 	function closeMenu() {
// 		menu_overlay.stop(false,false).fadeOut(800);
// 		gnav_elm.removeClass('is-active');
// 		menu_elm.removeClass('is-active').slideUp(0);
// 	}
//
// 	$('#close-trg').hover(
// 		function(){
// 			closeMenu()
// 		}
// 	)
//
// 	function spMenu() {
//
// 		var
// 		toggle = $('#toggle'),
// 		menu_overlay = $('.l-overlay'),
// 		sp_nav = $('.l-gnav-sp'),
// 		trigger = $('.l-gnav-sp__trigger'),
// 		firstElm  = $('.l-gnav-sp__first'),
// 		scondElm  = $('.l-gnav-sp__second'),
// 		thirdElm = $('.l-gnav-sp__third'),
// 		mask = $('.l-gnav-sp__mask');
//
// 		var tl_toggle = new TimelineMax({
// 			paused: true
// 		})
// 		.add(TweenMax.fromTo(sp_nav, .4, {'transform-origin': 'left center', transform:'scale(0,1)', ease: Expo.easeOut}, {'transform-origin': 'left center', transform:'scale(1,1)', ease: Expo.easeOut}), .1)
// 		.add(TweenMax.fromTo(mask, .4, {'transform-origin': 'right center', transform:'scale(1,1)', ease: Expo.easeOut}, {'transform-origin': 'right center', transform:'scale(0,1)', ease: Expo.easeOut}), .4)
// 		.add(TweenMax.fromTo('.l-toggle__top, .l-toggle__middle, .l-toggle__bottom', .3, {'transform-origin': 'right center', transform:'scale(1,1)', ease: Expo.easeOut}, {'transform-origin': 'right center', transform:'scale(0,1)', ease: Expo.easeOut}), 0)
// 		.add(TweenMax.to('.l-toggle__top', .4, {margin: '-9px auto auto 14px', 'transform-origin': 'right center', transform:'scale(1,1) rotate(-45deg)', ease: Expo.easeOut}), .4)
// 		.add(TweenMax.to('.l-toggle__bottom', .4, {margin: '9px auto auto 14px', 'transform-origin': 'right center', transform:'scale(1,1) rotate(45deg)', ease: Expo.easeOut}), .4)
//
//
//
// 		toggle.on('click', function(){
//
// 			if($(this).hasClass('is-open')) {
// 				$(this).addClass('is-close').removeClass('is-open');
// 				menu_overlay.stop(false,false).fadeOut(800);
// 				// sp_nav.stop(false,false).fadeOut(800);
// 				tl_toggle.reverse();
// 			} else {
// 				$(this).addClass('is-open').removeClass('is-close');
// 				menu_overlay.stop(false,false).fadeIn(800);
// 				// sp_nav.stop(false,false).fadeIn(800);
// 				tl_toggle.play();
// 			}
// 		});
//
//
//
// 		trigger.on('click', function(){
// 			var trgElm = $(this);
// 			var closest = trgElm.closest('[class^=l-gnav-sp__]');
// 			if(closest.hasClass('is-open')) {
// 				closest.removeClass('is-open');
// 				trgElm.siblings('div').stop(false,false).slideUp(700, 'easeInOutExpo');
// 			} else {
// 				closest.addClass('is-open');
// 				trgElm.siblings('div').stop(false,false).slideDown(700, 'easeInOutExpo');
// 			}
// 		});
//
// 	}
//
//
//
// });//then
//
//
//
//
//
//
// });
