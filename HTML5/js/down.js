var ball = {
		x: 750,
		y: 100,
		r: 20,
		g: 2,
		vx: -4,
		vy: 0,
		color: "red"
	},
	flag = true;
window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	setInterval(
		function() {
			if (flag) {
				render(context);
				update();
			}
		}, 30
	);
}

function update() {
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.vy += ball.g;
	if (ball.y >= 500 - ball.r) {
		ball.y = 500 - ball.r;
		ball.vy = -ball.vy * 0.6;
		console.log(ball.vy);
	if (Math.abs(ball.vy) < 5.3) {
		ball.vy = 0;
	}
	}
	if (ball.x < -ball.r - 2) {
		flag = false;
	}
}

function render(cxt) {
	cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
	cxt.beginPath();
	cxt.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
	cxt.closePath();
	cxt.fillStyle = ball.color;
	cxt.fill();
}