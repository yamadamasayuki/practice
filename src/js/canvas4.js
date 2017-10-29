(function() {
	'use strict';

	const container = document.getElementById('container');
	const canvas = document.getElementById('canvas');

	if (typeof canvas.getContext === 'undefined') {
		return;
	}

	let width = container.clientWidth;
	let height = container.clientHeight;

	const stage = new createjs.Stage( canvas );

	//マウスイベント On
	stage.enableMouseOver();

	// タッチイベント On
	if (createjs.Touch.isSupported() == true) {
		createjs.Touch.enable(stage)
	}

	var bitmap;

	function init() {

		var x;
		var y;
		var r;
		var iw = 250;
		var ih = iw;

		bitmap = new createjs.Bitmap('/common/image/13hasuda_0001.jpg');
		bitmap.scaleX = iw / 500;
		bitmap.scaleY = bitmap.scaleX;
		stage.addChild(bitmap).setBounds(0, 0, bitmap.scaleX, bitmap.scaleY);
	}






	let id;

	function  handleResize(e) {
		clearTimeout(id);
		id = setTimeout(function(){
			width = container.clientWidth;
			height = container.clientHeight;
			stage.canvas.width = width;
			stage.canvas.height = height;
			updateEvent();
		}, 100);
	}
	handleResize();

	window.addEventListener('resize', handleResize);



	function updateEvent() {
		stage.update();
	}

	window.requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function() {
			createjs.Ticker.setFPS( 60 );
			createjs.Ticker.addEventListener( 'tick', updateEvent );
		};
	}());



})();
