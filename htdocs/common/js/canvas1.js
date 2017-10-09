'use strict';

(function () {
	'use strict';

	var container = document.getElementById('container');
	var stage = document.getElementById('stage');

	var width = container.clientWidth;
	var height = container.clientHeight;
	var ctx = void 0;
	var dpr = void 0;

	// init();
	// draw();
	// drawBall()
	console.log('a');

	var Init = function Init() {
		console.log('b');
		this.setup = function () {
			if (typeof stage.getContext === 'undefined') {
				return;
			}
			ctx = stage.getContext('2d');
			dpr = window.devicePixelRatio || 1;
			console.log('c');
			stage.width = container.clientWidth * dpr;
			stage.height = container.clientHeight * dpr;
			ctx.scale(dpr, dpr);

			width = container.clientWidth;
			height = container.clientHeight;
			stage.style.width = width + 'px';
			stage.style.height = height + 'px';
		};
		this.draw = function () {
			ctx.strokeRect(100, 50, 100, 60);
			ctx.fillRect(120, 70, 100, 60);
			ctx.clearRect(140, 90, 100, 60);
		};
		// this.image = function(imgSrc, x, y, r) {
		// 	this.x = x;
		// 	this.y = y;
		// 	this.r = r;
		// 	console.log(this.x, this.y, this.r);
		// 	let img = new Image();
		// 	img.src = imgSrc;
		// 	img.x = this.x;
		// 	img.y = this.y;
		// 	img.addEventListener('load', function() {
		// 		ctx.drawImage(img, img.x, img.y, 250, 250);
		// 	}, false);
		// };
	}; //Init


	// let imgSrc = '/common/image/13hasuda_0001.jpg';
	var init = new Init();
	init.setup();
	init.draw();
	// init.image(imgSrc, 300, 0, 250);

	var image = new Image();
	image.src = '/common/image/13hasuda_0001.jpg';
	image.addEventListener('load', function () {
		var x = 500;
		var y = 100;
		var r = 125;
		var iw = r * 2;
		var ih = r * 2;
		ctx.beginPath();
		// ctx.fillStyle = 'red';
		ctx.fillStyle = ctx.createPattern(image, 'repeat');
		ctx.arc(x + r, y + r, r, 0, 2 * Math.PI);
		ctx.clip();
		ctx.drawImage(image, x, y, iw, ih);
		// ctx.fill();
	}, false);

	// function image() {
	// let r = 125;
	// 	ctx.beginPath();
	// 	ctx.arc(r, r, r, 0, Math.PI * 2, false);
	// 	ctx.clip();
	// 	let image = new Image();
	// 	image.src = '/common/image/13hasuda_0001.jpg';
	// 	image.addEventListener('load', function() {
	// 		ctx.drawImage(image, 0, 0, 250, 250);
	// 	}, false);
	// }
	// image();

	function drawBall() {
		var offsetX = 0,
		    offsetY = 0,
		    bounce = -1,
		    numBalls = 6,
		    balls = [];

		offsetX = (container.currentStyle || document.defaultView.getComputedStyle(container, '')).width;
		offsetX = Number(offsetX.replace('px', ''));

		offsetY = (container.currentStyle || document.defaultView.getComputedStyle(container, '')).height;
		offsetY = Number(offsetY.replace('px', ''));

		for (var i = 0; i < numBalls; i++) {
			var ball = new Object();
			ball.red = Math.floor(Math.random() * 256);
			ball.green = Math.floor(Math.random() * 256);
			ball.blue = Math.floor(Math.random() * 256);
			ball.x = i * 200;
			ball.y = i * 200;
			ball.vx = Math.random() * 10 - 5;
			ball.vy = Math.random() * 10 - 5;
			// ball.radius = Math.random() * 20 + 10;
			ball.radius = width / 10;
			ball.mass = ball.radius;
			balls[i] = ball;
		}

		setBallAnimation();

		function setBallAnimation() {
			animation();
			requestAnimationFrame(setBallAnimation);
		}

		function animation() {
			ctx.clearRect(0, 0, width, height);
			init.draw();

			for (var i = 0; i < numBalls; i++) {
				ctx.strokeStyle = "rgb(" + balls[i].red + "," + balls[i].green + "," + balls[i].blue + ")";
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2, true);
				ctx.fillStyle = "rgb(" + balls[i].red + "," + balls[i].green + "," + balls[i].blue + ")";
				ctx.fill();
				ctx.stroke();
				move(balls[i]);
				var ballA = balls[i];

				for (var j = i + 1; j < numBalls; j++) {
					var ballB = balls[j];
					checkCollision(ballA, ballB);
				}
			}
		} //animation()

		//ボールの運動
		function move(ball) {
			ball.x += ball.vx;
			ball.y += ball.vy;
			checkWall(ball);
		}

		//壁の衝突、跳ね返り
		function checkWall(ball) {
			if (ball.x + ball.radius > offsetX) {
				ball.x = offsetX - ball.radius;
				ball.vx *= bounce;
			} else if (ball.x - ball.radius < 0) {
				ball.x = ball.radius;
				ball.vx *= bounce;
			}

			if (ball.y + ball.radius > offsetY) {
				ball.y = offsetY - ball.radius;
				ball.vy *= bounce;
			} else if (ball.y - ball.radius < 0) {
				ball.y = ball.radius;
				ball.vy *= bounce;
			}
		}

		/*
  * ボール同士の衝突
  */
		function checkCollision(ball0, ball1) {

			//衝突判定予測
			var dx = ball1.x - ball0.x;
			var dy = ball1.y - ball0.y;
			var dist = Math.sqrt(dx * dx + dy * dy);

			if (dist < ball0.radius + ball1.radius) {
				var radian = Math.atan2(dy, dx);
				var sin = Math.sin(radian);
				var cos = Math.cos(radian);
				//位置の回転
				var point0 = { x: 0, y: 0 };
				//位置の回転
				var point1 = rotate(dx, dy, sin, cos, true);
				//速度の回転
				var velocity0 = rotate(ball0.vx, ball0.vy, sin, cos, true);
				//速度の回転
				var velocity1 = rotate(ball1.vx, ball1.vy, sin, cos, true);
				//衝突反応
				var vxTotal = velocity0.x - velocity1.x;
				//運動量の保存
				velocity0.x = ((ball0.mass - ball1.mass) * velocity0.x + 2 * ball1.mass * velocity1.x) / (ball0.mass + ball1.mass);
				velocity1.x = vxTotal + velocity0.x;

				//位置の更新
				var absV = Math.abs(velocity0.x) + Math.abs(velocity1.x);
				var overlap = ball0.radius + ball1.radius - Math.abs(point0.x - point1.x);
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
				ball1.x = ball0.x + point1Final.x;
				ball1.y = ball0.y + point1Final.y;
				ball0.x = ball0.x + point0Final.x;
				ball0.y = ball0.y + point0Final.y;

				ball0.vx = velocity0Final.x;
				ball0.vy = velocity0Final.y;
				ball1.vx = velocity1Final.x;
				ball1.vy = velocity1Final.y;
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

	// 各ブラウザ対応
	window.requestAnimationFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	}();

	window.addEventListener('resize', function () {
		setTimeout(drawBall, 300);
		// init();
		// draw();
	});
})();