const gameContainer = document.getElementById('game-container');
const cartLeft = document.getElementById('cart-left');
const cartRight = document.getElementById('cart-right');
const ball = document.getElementById('ball');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

const containerWidth = 600;
const containerHeight = 400;
const cartHeight = 80;
const cartSpeed = 5;
const ballSize = 20;

let ballX, ballY, ballSpeedX, ballSpeedY;
let leftCartY = (containerHeight - cartHeight) / 2;
let rightCartY = (containerHeight - cartHeight) / 2;
let leftScore = 0;
let rightScore = 0;
let ballMoving = false;
let leftCartSpeed = 0;
let rightCartSpeed = 0;

function resetBall() {
    ballX = (containerWidth - ballSize) / 2;
    ballY = (containerHeight - ballSize) / 2;
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
    const direction = Math.random() > 0.5 ? 1 : -1;
    ballSpeedX = direction * (3 + Math.random() * 2);
    ballSpeedY = 3 * Math.sin(angle);
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    ballMoving = true;
}

function updateScore() {
    scoreDisplay.textContent = `${leftScore}:${rightScore}`;
}

function startGame() {
    resetBall();
}

function gameLoop() {
    if (ballMoving) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Касание мяча нижней и верхней границы
        if (ballY <= 0 || ballY + ballSize >= containerHeight) {
            ballSpeedY *= -1;
        }

        // Касание мяча тележек
        if (ballX <= 10 && ballY + ballSize >= leftCartY && ballY <= leftCartY + cartHeight) {
            ballSpeedX *= -1;
            ballSpeedY += leftCartSpeed / 4; // корректируем угол отскока согласно движения тележки
        } else if (ballX + ballSize >= containerWidth - 10 && ballY + ballSize >= rightCartY && ballY <= rightCartY + cartHeight) {
            ballSpeedX *= -1;
            ballSpeedY += rightCartSpeed / 4; // корректируем угол отскока согласно движения тележки
        }

        // Касание левого или правого края
        if (ballX <= 0) {
            rightScore++;
            updateScore();
            ballMoving = false;
            ballX = 0;  // останавливаем мяч на краю
        } else if (ballX + ballSize >= containerWidth) {
            leftScore++;
            updateScore();
            ballMoving = false;
            ballX = containerWidth - ballSize;  // останавливаем мяч на краю
        }

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }

    // Движение тележки
    leftCartSpeed = 0;
    rightCartSpeed = 0;

    if (keysPressed['Shift']) {
        leftCartY = Math.max(0, leftCartY - cartSpeed);
        leftCartSpeed = -cartSpeed;
    } else if (keysPressed['Control']) {
        leftCartY = Math.min(containerHeight - cartHeight, leftCartY + cartSpeed);
        leftCartSpeed = cartSpeed;
    }
    cartLeft.style.top = leftCartY + 'px';

    if (keysPressed['ArrowUp']) {
        rightCartY = Math.max(0, rightCartY - cartSpeed);
        rightCartSpeed = -cartSpeed;
    } else if (keysPressed['ArrowDown']) {
        rightCartY = Math.min(containerHeight - cartHeight, rightCartY + cartSpeed);
        rightCartSpeed = cartSpeed;
    }
    cartRight.style.top = rightCartY + 'px';
}

const keysPressed = {};
window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

startBtn.addEventListener('click', startGame);

setInterval(gameLoop, 16); // 10000 / 16 = 62,5 обновлений в секнду
