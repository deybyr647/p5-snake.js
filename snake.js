//Sound preload
let chewingSound;
let crashSound;

function preload(){
    chewingSound = loadSound('assets/sounds/chewing.wav');
    crashSound = loadSound('assets/sounds/crash.wav');
}

//Canvas/Grid Setup
let canvas = {
    width: 1500,
    height: 900
}

let size = 35;

let randInt = (i) => (
    Math.floor(Math.random() * i)
);

let grid = {
    width: Math.floor(canvas.width / size),
    height: Math.floor(canvas.height / size)
}

let scoreElem, messageDiv, isPlaying;

let color = {
    r: randInt(256),
    g: randInt(256),
    b: randInt(256),
    a: 256
};

function setup(){
    isPlaying = false;

    scoreElem = createDiv('Score: 0');
    scoreElem.position(20, 20);
    scoreElem.style('color', 'white');

    messageDiv = createDiv('P5-Snake.js');
    messageDiv.position(canvas.width / 2, 20);
    messageDiv.style('color', 'white');

    createCanvas(canvas.width, canvas.height);
    background(0);
    noStroke();
    frameRate(15);
    noLoop();
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

let score = snake.length - 3;

//Change Game State
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
let playButton = () =>{
    if(isPlaying === false){
        fill(0, 255, 0);
        rect(685, 50, 200, 100);

        textSize(35);
        fill(255);
        text('Play', 755 , 110);

    }
}

let drawApple = (x, y) => {
    fill(255, 0, 0)
    ellipse(x * size, y * size, size, size)
}

let drawSnakeHead = (x, y) => {
    fill(color.r, color.g, color.b, color.a);
    rect(x * size, y * size, size, size);
}

let drawSnakeBody = (x, y) => {
    fill(color.r - 20, color.b - 20, color.g - 20, color.a);
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
    e.code == 'ArrowLeft' ? direction = 'left' : direction = direction;
    e.code == 'ArrowRight' ? direction = 'right' : direction = direction;
    e.code == 'ArrowUp' ? direction = 'up' : direction = direction;
    e.code == 'ArrowDown' ? direction = 'down' : direction = direction;
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
    if((head.x > grid.width || head.y > grid.height) || (head.y < 0 || head.x < 0)){
        crashSound.play();
        messageDiv.html(`You went out of bounds! Your score was ${score}!`);
        snakeReset();
        isPlaying = !isPlaying;
        score = snake.length - 3;
        scoreElem.html('Score: ' + score)
        noLoop();
        playButton();
        
    }

    //Check if snake is hitting itself
    for(let i = 0; i < snake.length - 1; i++){
        let point = snake[i];

        if(head.x === point.x && head.y === point.y){
            crashSound.play();
            messageDiv.html(`You ate yourself! Your score was ${score}!`);
            snakeReset();
            isPlaying = !isPlaying;
            score = snake.length - 3;
            scoreElem.html('Score: ' + score)
            noLoop();
            playButton();
            
        }
    }

}

function draw(){
    background(0);
    playButton();

    getDirection();
    
    head = snake[snake.length - 1];

    //Check if snake eats the apple
    if(head.x === apple.x && head.y === apple.y){
        chewingSound.play();
        randApple();
        score++;
        scoreElem.html(`Score: ${score}`);
    } else{
        snake.shift();
    }

    checkCollision();

    drawSnake();
    drawApple(apple.x, apple.y);

}

function mouseClicked(){
    if((mouseX >= 685 && mouseX <= 885) && (mouseY >= 50 && mouseY <= 150)){
        isPlaying = !isPlaying;
        messageDiv.html(`P5-Snake.js`);
        loop();
    }
}