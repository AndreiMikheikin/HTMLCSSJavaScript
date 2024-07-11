const canvas = document.getElementById('game-container');
const context = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

const containerWidth = canvas.width;
const containerHeight = canvas.height;
const cartWidth = 10;
const cartHeight = 80;
const cartSpeed = 5;
const ballRadius = 10;

let ballX, ballY, ballSpeedX, ballSpeedY;
let leftCartY = (containerHeight - cartHeight) / 2;
let rightCartY = (containerHeight - cartHeight) / 2;
let leftScore = 0;
let rightScore = 0;
let ballMoving = false;
let leftCartSpeed = 0;
let rightCartSpeed = 0;

function resetBall() {
    ballX = containerWidth / 2;
    ballY = containerHeight / 2;
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
    const direction = Math.random() > 0.5 ? 1 : -1;
    ballSpeedX = direction * (3 + Math.random() * 2);
    ballSpeedY = 3 * Math.sin(angle);
    ballMoving = true;
}

function updateScore() {
    scoreDisplay.textContent = `${leftScore}:${rightScore}`;
}

function startGame() {
    resetBall();
}

function gameLoop() {
    context.clearRect(0, 0, containerWidth, containerHeight);

    // Рисуем тележки
    context.fillStyle = 'green';
    context.fillRect(0, leftCartY, cartWidth, cartHeight);

    context.fillStyle = 'blue';
    context.fillRect(containerWidth - cartWidth, rightCartY, cartWidth, cartHeight);

    // Рисуем мяч
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();

    if (ballMoving) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Касание мяча нижней и верхней границы
        if (ballY - ballRadius <= 0 || ballY + ballRadius >= containerHeight) {
            ballSpeedY *= -1;
        }

        // Касание мяча тележек
        if (ballX - ballRadius <= cartWidth && ballY + ballRadius >= leftCartY && ballY - ballRadius <= leftCartY + cartHeight) {
            ballX = cartWidth + ballRadius;
            ballSpeedX *= -1;
            ballSpeedY += leftCartSpeed / 2;
            ballSpeedY = Math.min(Math.max(ballSpeedY, -5), 5);
        } else if (ballX + ballRadius >= containerWidth - cartWidth && ballY + ballRadius >= rightCartY && ballY - ballRadius <= rightCartY + cartHeight) {
            ballX = containerWidth - cartWidth - ballRadius;
            ballSpeedX *= -1;
            ballSpeedY += rightCartSpeed / 2;
            ballSpeedY = Math.min(Math.max(ballSpeedY, -5), 5);
        }

        // Касание левого или правого края
        if (ballX - ballRadius <= 0) {
            rightScore++;
            updateScore();
            ballMoving = false;
            ballX = ballRadius;  // Останавливаем мяч на краю
        } else if (ballX + ballRadius >= containerWidth) {
            leftScore++;
            updateScore();
            ballMoving = false;
            ballX = containerWidth - ballRadius;  // Останавливаем мяч на краю
        }
    }

    // Устанавливаем зависимость положения тележки от скорости
    leftCartY = Math.max(0, Math.min(containerHeight - cartHeight, leftCartY + leftCartSpeed));
    rightCartY = Math.max(0, Math.min(containerHeight - cartHeight, rightCartY + rightCartSpeed));

    requestAnimationFrame(gameLoop);
}

const keysPressed = {};
window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;

    // Обновляем скорость по нажатию клавиш
    if (e.key === 'Shift') {
        leftCartSpeed = -cartSpeed;
    } else if (e.key === 'Control') {
        leftCartSpeed = cartSpeed;
    }

    if (e.key === 'ArrowUp') {
        rightCartSpeed = -cartSpeed;
    } else if (e.key === 'ArrowDown') {
        rightCartSpeed = cartSpeed;
    }
});

window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;

    // Сбрасываем скорость
    if (e.key === 'Shift' || e.key === 'Control') {
        leftCartSpeed = 0;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        rightCartSpeed = 0;
    }
});

startBtn.addEventListener('click', startGame);

requestAnimationFrame(gameLoop);
