//common.js

$(function(){

var
$win = $(window),
winH = $win.height(),
isPC = window.matchMedia('(min-width:768px)').matches,
breakpoint = 768;




//---------------------------------------------------
// Smooth Scroll
//---------------------------------------------------

$('a[href^="#"]').on('click', function(){
	var href = $(this).attr('href');
	var target = $(href == '#' || href == '' ? 'html' : href);
	var headerH = $('.header').height();
	var position = (href == '#top') ? 0 : target.offset().top - headerH;
	$('html, body').stop(false,false).animate({scrollTop:position}, 700);
	return false;
});



//---------------------------------------------------
// data-sp-src
//---------------------------------------------------

$('img[data-sp-src]').each(function(idx,elm) {
	var pcSrc = $(elm).attr('src');
	var spSrc = $(elm).data('sp-src');

	enquire.register('screen and (max-width:768px)',{
		match: function() {
			$(elm).attr('src',spSrc);
		},
		unmatch: function() {
			$(elm).attr('src',pcSrc).filter('.is-rollover').rollover()
		}
	})
});



//---------------------------------------------------
// Scroll Actions
//---------------------------------------------------

});
