// constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const gameSound = new Audio("music/music.mp3");
let lastPaintTime = 0;
let speed = 5;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 5, y: 3 };
let score = 0;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

function gameEngine() {
    // Part1 : Updating the Snake Variable.

    // If snake Collides
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("The game is Over");
        snakeArr = [
            { x: 13, y: 15 }
        ]
        score = 0;
    }

    // If snake has eaten food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        foodSound.play();
        var a = 2;
        var b = 16;
        food = { x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    function isCollide(sarr) {
        // if bump into itself
        for(let i = 1; i<sarr.length;i++){
            if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
                return true;
            }
        }

        // if bump into wall
        if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0){
            return true;
        }
        return false;
    }

    // Part2 : Display the snake and food.
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}



// Main Logic starts from here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
document.addEventListener('keydown', function (e) {
    inputDir = { x: 0, y: 1 }; // start the game
    gameSound.play();
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})