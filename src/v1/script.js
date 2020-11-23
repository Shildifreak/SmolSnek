var field = [];
var field_object = document.getElementById('field_border');
const HEIGHT = 10;
const WIDTH = 20;
for (let y = 0; y < HEIGHT; y++) {
	let line = [];
	field.push(line);
	for (let x = 0; x < WIDTH; x++) {
		var e = document.createElement('div');
		e.className = 'cell empty';
		e.style.left = x/WIDTH*100 + '%';
		e.style.top = y/HEIGHT*100 + '%';
		e.style.width = 100/WIDTH  + '%';
		e.style.height = 100/HEIGHT+ '%';
		field_object.appendChild(e);
		line.push(e);
	}
}
var grow = 0;
var snake = [[0,0]];
var [dx, dy] = [1,0];
function move() {
	var [x, y] = snake[snake.length-1];
	x = (x + dx + WIDTH) % WIDTH;
	y = (y + dy + HEIGHT) % HEIGHT;
	var cell = field[y][x];
	if (cell.classList.contains('apple')) {
		grow ++;
	}
	if (cell.classList.contains('snake')) {
		window.clearInterval(intervalId);
		intervalId = null;
		return;
	}
	cell.className = 'cell snake';
	snake.push([x,y]);
	if (grow == 0) {
		let [x, y] = snake.shift();
		field[y][x].className = 'cell empty';
	}
	else {
		grow--;
	}
	
	if (Math.random() < 0.01) {
		let x = Math.floor(Math.random()*WIDTH);
		let y = Math.floor(Math.random()*HEIGHT);
		let cell = field[y][x];
		if (cell.className == 'cell empty') {
			cell.className = 'cell apple';
		}
	}
}
document.addEventListener('keydown', function (event) {
	console.log(event.keyCode);
	[dx, dy] = {37:[-1,0],38:[0,-1],39:[1,0],40:[0,1]}[event.keyCode];
});
var intervalId = window.setInterval(move, 100);
