(function() {
	'use strict';

	const container = document.getElementById('container');
	const canvas = document.getElementById('canvas');

	if (typeof canvas.getContext === 'undefined') {
		return;
	}

	// const ctx = canvas.getContext('2d');
	// const dpr = window.devicePixelRatio || 1;

	let width = container.clientWidth;
	let height = container.clientHeight;



	const stage = new createjs.Stage( canvas );

	//マウスイベント On
	stage.enableMouseOver();

	// タッチイベント On
	if (createjs.Touch.isSupported() == true) {
		createjs.Touch.enable(stage)
	}



	let Maru;
	let maru;
	let circle;
	let bitmap;
	const balls = [];

	Maru = function(imgSrc, url, x, y, r) {
		var i = 0;
		this.x = x;
		this.y = y;
		this.r = r;
		// this.vx = Math.floor(Math.random() * 10 - 5);
		// this.vy = Math.floor(Math.random() * 10 - 5);
		this.img =  new Image();
		this.img.src = imgSrc;
		this.url = url;

		this.draw = function() {

			this.img.addEventListener('load', () => {

				// マスク用 shape
				circle = this.circle = new createjs.Shape();
				this.circle.graphics.drawCircle(this.r, this.r, this.r);
				this.circle.x = this.x;
				this.circle.y = this.y;

				// 画像
				bitmap = this.bitmap = new createjs.Bitmap(this.img);
				this.bitmap.scaleX = (this.r * 2) / this.bitmap.image.width;
				this.bitmap.scaleY = (this.r * 2) / this.bitmap.image.height;
				this.bitmap.mask = this.circle;
				this.bitmap.x = this.x;
				this.bitmap.y = this.y;

				//マウスイベント
				this.bitmap.addEventListener('mouseover', (e) => {
					this.bitmap.cursor = 'pointer';
				});
				this.bitmap.addEventListener('mouseout', (e) => {
					this.bitmap.cursor = '';
				});
				this.bitmap.addEventListener('click', (e) => {
					location.href = this.url;
				});
				stage.addChild(circle, bitmap);
			})
		}
		this.move = function() {
			this.x++;
			this.y++;
			console.log(this.x, this.x);
			stage.update();
		}
	}//Init

	function rand(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	const postLength = 5;
	let offsetX;
	let offsetY;

	$.when(
		$.getJSON( '/common/json/image.json' )
	).done(function(data) {

		offsetX = (container.currentStyle || document.defaultView.getComputedStyle(container,'')).width;
		offsetX = Number(offsetX.replace('px', ''));

		offsetY = (container.currentStyle || document.defaultView.getComputedStyle(container,'')).height;
		offsetY = Number(offsetY.replace('px', ''));

		for(var i = 0; i <= postLength; i++) {
			var imgSrc = data[i].src;
			var url = data[i].url;
			maru = new Maru(imgSrc, url, rand(0, 500), rand(0, 500), 100);
			maru.vx = Math.random() * 10 - 5;
			maru.vy = Math.random() * 10 - 5;
			maru.mass = maru.r;
			balls[i] = maru;
		}

		for(var i = 0; i < postLength; i++) {
			balls[i].draw()
			console.log(balls[i]);
		}

		createjs.Ticker.setFPS( 60 );
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
			circle.x += maru.vx;
			bitmap.x += maru.vx;
			circle.y += maru.vx;
			bitmap.x += maru.vx;
			stage.update();
		}

		// setBallAnimation();

		// function setBallAnimation() {
		// 	balls[i].move()
		// 	requestAnimationFrame(setBallAnimation);
		// }

		// function setBallAnimation() {
		// 	animation();
		// 	stage.update();
		// 	requestAnimationFrame(setBallAnimation);
		// }

		function animation() {

			for(var i = 0; i < postLength; i++) {
				balls[i].draw()
				maru.x += maru.vx;
				maru.y += maru.vy;
				balls[i].move();
				// move(balls[i]);
				var ballA = balls[i];

				for(var j = i + 1; j < postLength; j++) {
					var ballB = balls[j];
					checkCollision(ballA, ballB);
				}
			}
			stage.update();
		}//animation()

		function move(maru) {
			maru.x += maru.vx;
			maru.y += maru.vy;
			checkWall(maru);
		}

		function checkWall(maru) {
			if(maru.x + maru.radius > offsetX) {
				maru.x = offsetX - maru.radius;
				maru.vx *= bounce;
			} else if(maru.x - maru.radius < 0) {
				maru.x = maru.radius;
				maru.vx *= bounce;
			}

			if(maru.y + maru.radius > offsetY) {
				maru.y = offsetY- maru.radius;
				maru.vy *= bounce;
			} else if(maru.y - maru.radius < 0) {
				maru.y = maru.radius;
				maru.vy *= bounce;
			}
		}

		function checkCollision(maru0, maru1) {

			//衝突判定予測
			var dx = maru1.x - maru0.x;
			var dy = maru1.y - maru0.y;
			var dist = Math.sqrt(dx * dx + dy * dy);

			if(dist < maru0.radius + maru1.radius) {
				var radian = Math.atan2(dy, dx);
				var sin = Math.sin(radian);
				var cos = Math.cos(radian);
				//位置の回転
				var point0 = {x:0, y:0};
				//位置の回転
				var point1 = rotate(dx, dy, sin, cos, true);
				//速度の回転
				var velocity0 = rotate(maru0.vx, maru0.vy, sin, cos, true);
				//速度の回転
				var velocity1 = rotate(maru1.vx, maru1.vy, sin, cos, true);
				//衝突反応
				var vxTotal = velocity0.x - velocity1.x;
				//運動量の保存
				velocity0.x = ((maru0.mass - maru1.mass) * velocity0.x + 2 * maru1.mass * velocity1.x) / (maru0.mass + maru1.mass);
				velocity1.x = vxTotal + velocity0.x;

				//位置の更新
				var absV = Math.abs(velocity0.x) + Math.abs(velocity1.x);
				var overlap = (maru0.radius + maru1.radius) - Math.abs(point0.x - point1.x);
				point0.x += (velocity0.x / absV) * overlap;
				point1.x += (velocity1.x / absV) * overlap;

				//位置の回転、元へ戻す
				var point0Final = rotate(point0.x, point0.y, sin, cos, false);
				var point1Final = rotate(point1.x, point1.y, sin, cos, false);

				//速度の回転、元の位置へ戻す
				var velocity0Final = rotate(velocity0.x, velocity0.y, sin, cos, false);
				var velocity1Final = rotate(velocity1.x, velocity1.y, sin, cos, false);

				/*
				* 衝突判定の予測分だけ速度を加算する
				*/
				maru1.x = maru0.x + point1Final.x;
				maru1.y = maru0.y + point1Final.y;
				maru0.x = maru0.x + point0Final.x;
				maru0.y = maru0.y + point0Final.y;

				maru0.vx = velocity0Final.x;
				maru0.vy = velocity0Final.y;
				maru1.vx = velocity1Final.x;
				maru1.vy = velocity1Final.y;
			}
		}//checkCollision

		//回転行列
		function rotate(x, y, sin, cos, reverse) {
			var result = {x:0, y:0}
			if(reverse) {
				result.x = x * cos + y * sin;
				result.y = y * cos - x * sin;
			} else {
				result.x = x * cos - y * sin;
				result.y = y * cos + x * sin;
			}
			return result;
		}
	});



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
