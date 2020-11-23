var my_document = document; // alias so minifier knows its ok to rename this
var my_Math = Math;
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
	
	x = my_Math.floor(my_Math.random() * HEIGHT_TIMES_WIDTH * 10);
	cell = cells[x] || {};
	if (cell[className] == 'e') {
		cell[className] = 'a';
	}

	// highscore line has to be at the end of move because cookies don't work for local pages on chrome
	my_document.cookie = my_Math.max((cells[0].innerText = my_document.cookie), snake.length) || [0];
	//my_document.cookie = "c=" + my_Math.max((cells[0].innerText = ((/\d+/).exec(my_document.cookie)||[0])[0]), snake.length); // this would be the correct way to use cookies, but line above works too, so whatever
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
