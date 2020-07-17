//Game Setup
let canvas = {
    width: 1500,
    height: 700
}

let size = 35;

let randInt = (i) => (
    Math.floor(Math.random() * i)
);

let grid = {
    width: Math.floor(canvas.width / size),
    height: Math.floor(canvas.height / size)
}

function setup(){
    createCanvas(canvas.width, canvas.height);
    background(0);
    noStroke();
    frameRate(15);
}

//Initial Game State
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
    ellipse(x * size, y * size, size, size)
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
});

let getDirection = () => {
    let head = snake[snake.length - 1];

    //Direction changes based on event handling
    if (direction === 'left') {
        let newHead = {x: head.x - 1, y: head.y};
        snake.push(newHead);
    }
    
    if (direction === 'right') {
        let newHead = {x: head.x + 1, y: head.y};
        snake.push(newHead);
    }
    
    if (direction === 'up') {
        let newHead = {x: head.x, y: head.y - 1};
        snake.push(newHead);
    }
    
    if (direction === 'down') {
        let newHead = {x: head.x, y: head.y + 1};
        snake.push(newHead);
    }
}

let checkCollision = () => {
    //Check if snake is out of bounds
    if((head.x >= grid.width || head.y > grid.height) || (head.y < 0 || head.x < 0)){
        if(true){
            alert(`You went out of bounds! Your score was ${snake.length - 3}`);
            snakeReset();
            noLoop();
        }
    }

    //Check if snake is hitting itself
    for(let i = 0; i < snake.length - 1; i++){
        let point = snake[i];

        if(head.x === point.x && head.y === point.y){
            if(true){
                alert(`You ate yourself! Your score was ${snake.length - 3} !`);
                snakeReset();
                noLoop();
            }
        }
    }

}


function draw(){
    background(0);

    getDirection();
    
    head = snake[snake.length - 1];

    //Check if snake eats the apple
    head.x === apple.x && head.y === apple.y ? randApple() : snake.shift();

    checkCollision();

    drawSnake();
    drawApple(apple.x, apple.y);

}
