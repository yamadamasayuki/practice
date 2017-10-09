'use strict';

(function () {
	'use strict';

	var container = document.getElementById('container');
	var canvas = document.getElementById('canvas');

	if (typeof canvas.getContext === 'undefined') {
		return;
	}

	// const ctx = canvas.getContext('2d');
	// const dpr = window.devicePixelRatio || 1;

	var width = container.clientWidth;
	var height = container.clientHeight;

	var stage = new createjs.Stage(canvas);

	//マウスイベント On
	stage.enableMouseOver();

	// タッチイベント On
	if (createjs.Touch.isSupported() == true) {
		createjs.Touch.enable(stage);
	}

	drawBall();

	function drawBall() {
		var offsetX = 0,
		    offsetY = 0,
		    x = 0,
		    y = 0,
		    r = 125,
		    iw = r * 2,
		    ih = iw,
		    bounce = -1,
		    postLength = 6,
		    circle,
		    bitmap,
		    circles = [],
		    bitmaps = [];

		offsetX = (container.currentStyle || document.defaultView.getComputedStyle(container, '')).width;
		offsetX = Number(offsetX.replace('px', ''));

		offsetY = (container.currentStyle || document.defaultView.getComputedStyle(container, '')).height;
		offsetY = Number(offsetY.replace('px', ''));

		for (var i = 0; i < postLength; i++) {

			circle = new createjs.Shape();
			circle.graphics.drawCircle(r, r, r);

			bitmap = new createjs.Bitmap('/common/image/13hasuda_0001.jpg');
			bitmap.scaleX = iw / 500;
			bitmap.scaleY = bitmap.scaleX;
			bitmap.mask = circle;

			circle.x = i * 100;
			circle.y = i * 100;
			circle.vx = Math.random() * 10 - 5;
			circle.vy = Math.random() * 10 - 5;
			circle.r = r;
			circle.mass = circle.r;

			bitmap.x = circle.x;
			bitmap.y = circle.y;
			bitmap.vx = circle.vx;
			bitmap.vy = circle.vy;
			bitmap.r = circle.r;
			bitmap.mass = circle.mass;

			circles[i] = circle;
			bitmaps[i] = bitmap;
		}

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick(event) {
			animation();
		}

		// setBallAnimation();
		//
		// function setBallAnimation() {
		// 	animation();
		// 	requestAnimationFrame(setBallAnimation);
		// }

		function animation() {
			// stage.clear();
			// ctx.clearRect(0, 0, width, height);

			for (var i = 0; i < postLength; i++) {
				stage.addChild(bitmaps[i]).setBounds(bitmaps[i].x, bitmaps[i].y, iw, ih);
				move(circles[i], bitmaps[i]);
				// move(bitmaps[i]);
				var circleA = circles[i];
				var bitmapA = bitmaps[i];

				for (var j = i + 1; j < postLength; j++) {
					var bitmapB = bitmaps[j];
					checkCollision(bitmapA, bitmapB);
				}
			}
		} //animation()

		console.log(circles);
		console.log(bitmaps);

		//ボールの運動
		function move(circle, bitmap) {
			circle.x += circle.vx;
			circle.y += circle.vy;
			bitmap.x += circle.vx;
			bitmap.y += circle.vy;
			console.log(circle.x, circle.y);
			console.log(bitmap.x, bitmap.y);
			checkWall(circle, bitmap);
		}

		// function cmove(circle) {
		// 	console.log(circle);
		// 	circle.x += circle.vx;
		// 	circle.y += circle.vy;
		// 	checkWall(circle, bitmap);
		// }

		// function bmove(bitmap) {
		// 	console.log(bitmap);
		// 	bitmap.x += bitmap.vx;
		// 	bitmap.y += bitmap.vy;
		// 	checkWall(circle, bitmap);
		// }

		//壁の衝突、跳ね返り
		function checkWall(circle, bitmap) {
			if (bitmap.x + bitmap.radius > offsetX) {
				circle.x = offsetX - circle.radius;
				circle.vx *= bounce;
				bitmap.x = offsetX - bitmap.radius;
				bitmap.vx *= bounce;
			} else if (bitmap.x - bitmap.radius < 0) {
				circle.x = circle.radius;
				circle.vx *= bounce;
				bitmap.x = bitmap.radius;
				bitmap.vx *= bounce;
			}

			if (bitmap.y + bitmap.radius > offsetY) {
				circle.y = offsetY - circle.radius;
				circle.vy *= bounce;
				bitmap.y = offsetY - bitmap.radius;
				bitmap.vy *= bounce;
			} else if (bitmap.y - bitmap.radius < 0) {
				circle.y = circle.radius;
				circle.vy *= bounce;
				bitmap.y = bitmap.radius;
				bitmap.vy *= bounce;
			}
		}

		/*
  * ボール同士の衝突
  */
		function checkCollision(bitmap0, bitmap1) {

			//衝突判定予測
			var dx = bitmap1.x - bitmap0.x;
			var dy = bitmap1.y - bitmap0.y;
			var dist = Math.sqrt(dx * dx + dy * dy);

			if (dist < bitmap0.radius + bitmap1.radius) {
				var radian = Math.atan2(dy, dx);
				var sin = Math.sin(radian);
				var cos = Math.cos(radian);
				//位置の回転
				var point0 = { x: 0, y: 0 };
				//位置の回転
				var point1 = rotate(dx, dy, sin, cos, true);
				//速度の回転
				var velocity0 = rotate(bitmap0.vx, bitmap0.vy, sin, cos, true);
				//速度の回転
				var velocity1 = rotate(bitmap1.vx, bitmap1.vy, sin, cos, true);
				//衝突反応
				var vxTotal = velocity0.x - velocity1.x;
				//運動量の保存
				velocity0.x = ((bitmap0.mass - bitmap1.mass) * velocity0.x + 2 * bitmap1.mass * velocity1.x) / (bitmap0.mass + bitmap1.mass);
				velocity1.x = vxTotal + velocity0.x;

				//位置の更新
				var absV = Math.abs(velocity0.x) + Math.abs(velocity1.x);
				var overlap = bitmap0.radius + bitmap1.radius - Math.abs(point0.x - point1.x);
				point0.x += velocity0.x / absV * overlap;
				point1.x += velocity1.x / absV * overlap;

				//位置の回転、元へ戻す
				var point0Final = rotate(point0.x, point0.y, sin, cos, false);
				var point1Final = rotate(point1.x, point1.y, sin, cos, false);

				//速度の回転、元の位置へ戻す
				var velocity0Final = rotate(velocity0.x, velocity0.y, sin, cos, false);
				var velocity1Final = rotate(velocity1.x, velocity1.y, sin, cos, false);

				/*
    * 衝突判定の予測分だけ速度を加算する
    */
				bitmap1.x = bitmap0.x + point1Final.x;
				bitmap1.y = bitmap0.y + point1Final.y;
				bitmap0.x = bitmap0.x + point0Final.x;
				bitmap0.y = bitmap0.y + point0Final.y;

				bitmap0.vx = velocity0Final.x;
				bitmap0.vy = velocity0Final.y;
				bitmap1.vx = velocity1Final.x;
				bitmap1.vy = velocity1Final.y;
			}
		} //checkCollision


		//回転行列
		function rotate(x, y, sin, cos, reverse) {
			var result = { x: 0, y: 0 };
			if (reverse) {
				result.x = x * cos + y * sin;
				result.y = y * cos - x * sin;
			} else {
				result.x = x * cos - y * sin;
				result.y = y * cos + x * sin;
			}
			return result;
		}
	} //drawBall


	var id = void 0;

	function handleResize(e) {
		clearTimeout(id);
		id = setTimeout(function () {
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

	window.requestAnimationFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function () {
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener('tick', updateEvent);
		};
	}();
})();