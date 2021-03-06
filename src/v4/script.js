var my_document = document; // alias so minifier knows its ok to rename this
var className = 'className';

var field = my_document.getElementById('f');
var cells = field.children;
var HEIGHT = 10;
var WIDTH = 21;
var HEIGHT_TIMES_WIDTH = HEIGHT*WIDTH;

var grow = 0;
var snake = [0];
var dx = 1;
var cell, style;

for (n = 0; n < HEIGHT_TIMES_WIDTH; n++) {
	cell = my_document.createElement('div');
	style = cell.style;
	style.width = 100/(WIDTH-1) + '%';
	style.height = 100/HEIGHT + '%';
	style.float = 'left';
	cell[className] = ((n+1) % WIDTH) ? 'e' : 's';
	if (!((n+1) % WIDTH)) {
		style.display = 'none';
	}
	field.appendChild(cell);
}

var move = () => {
	x = snake[0];
	x += dx;
	cell = cells[x] || cells[WIDTH-1];
	if (cell[className] != 's') {
		if (cell[className] == 'a') {
			grow ++;
		}
		cell[className] = 's';
		snake.unshift(x);
	}
	if (grow == 0) {
		if (snake.length > 1) {
			cells[snake.pop()][className] = 'e';
		}
	}
	else {
		grow--;
	}
	
	x = Math.floor(Math.random() * HEIGHT_TIMES_WIDTH * 100);
	cell = cells[x] || {};
	if (cell[className] == 'e') {
		cell[className] = 'a';
	}
}
my_document.addEventListener('keydown', (e) => {
	dx = {37:-1,38:-WIDTH,39:1,40:WIDTH}[e.keyCode] || dx;
});

my_document.addEventListener('pointerdown' , (e) => {
	dx = (
		(dx * dx == 1 ? WIDTH : -1)
		*
		(dx > 0 ? 1 : -1)
		*
		(e.x * 2 > window.innerWidth ? 1 : -1)
	);
});


var intervalId = window.setInterval(move, 100);
