var field = document.getElementById('field');
const HEIGHT = 10;
const WIDTH = 21;
for (n = 0; n < HEIGHT*WIDTH; n++) {
	e = document.createElement('div');
	e.style.width = 100/(WIDTH-1) + '%';
	e.style.height = 100/HEIGHT+ '%';
	e.style.float = 'left';
	e.className = ((n+1) % WIDTH) ? 'empty' : 'snake';
	if (!((n+1) % WIDTH)) {
		e.style.display = 'none';
	}
	field.appendChild(e);
}
var grow = 0;
var snake = [0];
var dx = 1;
function move() {
	x = snake[snake.length-1];
	x += dx;
	cell = field.children[x] || field.children[WIDTH-1];
	if (cell.className != 'snake') {
		if (cell.className == 'apple') {
			grow ++;
		}
		cell.className = 'snake';
		snake.push(x);
	}
	if (grow == 0) {
		if (snake.length > 1) {
			let x = snake.shift();
			field.children[x].className = 'empty';
		}
	}
	else {
		grow--;
	}
	
	x = Math.floor(Math.random() * WIDTH * HEIGHT * 10 * snake.length);
	if (x < WIDTH * HEIGHT) {
		cell = field.children[x];
		if (cell.className == 'empty') {
			cell.className = 'apple';
		}
	}
}
document.addEventListener('keydown', function (event) {
	dx = {37:-1,38:-WIDTH,39:1,40:WIDTH}[event.keyCode] || dx;
});
var intervalId = window.setInterval(move, 100);
