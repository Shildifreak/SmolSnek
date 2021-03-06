var my_document = document; // alias so minifier knows its ok to rename this
var my_Math = Math;
var className = 'className';

var field = my_document.getElementById('f');
var head = my_document.getElementById('h');
var tail = my_document.getElementById('t');
var cells = field.children;
var HEIGHT = 10;
var WIDTH = 21;
var HEIGHT_TIMES_WIDTH = HEIGHT*WIDTH;

var grow = 0;
var snake = [0];
var apples = [];
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

var set_pos = (end, p) => {
	style = end.style;
	prefix = 'calc(min(10vh, 5vw) * ';
	style.left = prefix + p%(WIDTH) + ')';
	style.top = prefix + Math.floor(p/(WIDTH)) + ')';
}

var spawn_apple = () => {
	ac = Array.prototype.filter.bind(cells)(c => c[className] == 'a').length;
	x = my_Math.floor(my_Math.random() * HEIGHT_TIMES_WIDTH * (ac+1));
	cell = cells[x] || {};
	if (cell[className] == 'e') {
		cell[className] = 'a';
		cell.style.background = "red";
		if (my_Math.random() < 0.9) { // some apples don't despawn
			window.setTimeout(remove_apple_1, 2500, cell);
		}
	}
	window.setTimeout(spawn_apple, 1000 + my_Math.random() * 10000);
}

var remove_apple_1 = (cell) => {
	if (cell[className] == 'a') {
		cell.style.background = "";
		window.setTimeout(remove_apple_2, 500, cell);
	}
}

var remove_apple_2 = (cell) => {
	if (cell[className] == 'a') {
		cell[className] = 'e';
	}
}

var move = () => {
	x = snake[0];
	prevcell = cells[x] || cells[WIDTH-1];
	x += dx;
	cell = cells[x] || cells[WIDTH-1];
	if (cell[className] != 's') {
		cell.style.background = "";
		if (cell[className] == 'a') {
			grow ++;
		}
		prevcell[className] = 's';
		snake.unshift(x);
		
		set_pos(head, x);
	}
	if (grow == 0) {
		if (snake.length > 1) {
			cells[snake.pop()][className] = 'e';
			set_pos(tail, snake[snake.length-1]);
		}
	}
	else {
		grow--;
	}
	
	// highscore line has to be at the end of move because cookies don't work for local pages on chrome
	my_document.cookie = my_Math.max((cells[0].innerText = my_document.cookie || 0), snake.length);
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
window.setTimeout(spawn_apple, 2000);
