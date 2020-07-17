/*Setup*/
let canvas = {
    width: document.body.clientWidth,
    height: 930
}

let size = 40;

let randInt = (i) => (
    Math.floor(Math.random() * i)
)

let grid = {
    width: Math.floor(canvas.width / size),
    height: Math.floor(canvas.height / size)
}

function setup(){
    createCanvas(canvas.width, canvas.height);
    background(0);
    noStroke();
}

let snake = [
    {x: 3, y: 1},
    {x: 3, y: 2},
    {x: 3, y: 3}
];

let direction = 'right';

let apple = {
    x: randInt(grid.width),
    y: randInt(grid.height)
}

//Reset Game State
let snakeReset = () => {
    snake = [
        {x: 3, y: 1},
        {x: 3, y: 2},
        {x: 3, y: 3}
    ];

    direction = 'right';
}


let randApple = () =>{
    apple = {
        x: randInt(grid.width),
        y: randInt(grid.height)
    }
}


//Drawing functions
let drawApple = (x, y) => {
    fill(255, 0, 0)
    ellipse(x, y, size, size)
}

let drawSnakeHead = (x, y) => {
    fill(0, 255, 0);
    rect(x * size, y * size, size, size);
}

let drawSnakeBody = (x, y) => {
    fill(0, 220, 0);
    rect(x * size, y * size, size, size);
}

let drawSnake = () => {
    for(let i = 0; i < snake.length - 1; i++){
        let point = snake[i];
        drawSnakeBody(point.x, point.y);
    }

    let head = snake[snake.length - 1];
    drawSnakeHead(head.x, head.y);
}

//Event Handling
window.addEventListener('keydown', e => {
    e.code == 'KeyA' || e.code == 'ArrowLeft' ? direction = 'left' : direction = direction;
    e.code == 'KeyD' || e.code == 'ArrowRight' ? direction = 'right' : direction = direction;
    e.code == 'KeyW' || e.code == 'ArrowUp' ? direction = 'up' : direction = direction;
    e.code == 'KeyS' || e.code == 'ArrowDown' ? direction = 'down' : direction = direction;

    console.log(direction);
})










function draw(){
    drawApple(apple.x * size, apple.y * size);
    drawSnake();
}

function mouseClicked(){

}