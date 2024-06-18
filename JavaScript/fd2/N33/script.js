document.getElementById('clock-start').addEventListener('click', () => {
    const diameterInput = document.getElementById('d-input');
    const diameter = parseInt(diameterInput.value);

    if (diameter < 200 || diameter > 800 || isNaN(diameter)) {
        alert('Введите правильный диаметр от 200 до 800.');
        return;
    }

    createClock(diameter);
    startClock();
});

// Это баловство
const bgColors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
let currentColorIndex = 0;

//Создаем часы
function createClock(diameter) {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.innerHTML = '';

    const clock = document.createElement('div');
    clock.id = 'clock';
    clock.style.width = `${diameter}px`;
    clock.style.height = `${diameter}px`;

    //Это часть боловства
    clock.addEventListener('click', () => {
        currentColorIndex = (currentColorIndex + 1) % bgColors.length;
        clock.style.backgroundColor = bgColors[currentColorIndex];
    });

    //Часовая стрелка
    const hourHand = document.createElement('div');
    hourHand.classList.add('hand', 'hour-hand');
    hourHand.style.height = `${diameter * 0.25}px`;// высота относительно диаметра

    //Минутная стрелка
    const minuteHand = document.createElement('div');
    minuteHand.classList.add('hand', 'minute-hand');
    minuteHand.style.height = `${diameter * 0.35}px`;// высота относительно диаметра

    //Секундная стрелка
    const secondHand = document.createElement('div');
    secondHand.classList.add('hand', 'second-hand');
    secondHand.style.height = `${diameter * 0.45}px`;// высота относительно диаметра

    const timeDisplay = document.createElement('div');
    timeDisplay.id = 'time-display';
    timeDisplay.style.fontSize = `${diameter * 0.1}px`; // зависимость размера шрифта от диаметра
    timeDisplay.style.position = 'absolute';
    timeDisplay.style.bottom = '25%'; // позиционируем относительно низа
    timeDisplay.style.left = '50%';
    timeDisplay.style.transform = 'translateX(-50%)';
    timeDisplay.style.textAlign = 'center';

    clock.appendChild(hourHand);
    clock.appendChild(minuteHand);
    clock.appendChild(secondHand);
    clock.appendChild(timeDisplay);

    //Создаем циферблат
    for (let i = 1; i <= 12; i++) {
        const hourMark = document.createElement('div');
        hourMark.classList.add('hour-mark');
        hourMark.innerText = i;// значение содержимого приравниваем к итератору цикла

        const angle = (i * 30) - 90; // на каждый час по 30deg и поворот на -90deg
        const markShift = diameter * 0.1; // константа зависимости от диаметра
        const radius = diameter / 2 - markShift;
        const x = radius * Math.cos(angle * Math.PI / 180);
        const y = radius * Math.sin(angle * Math.PI / 180);

        //Позиционируем и масштабируем цифры на циферблате
        hourMark.style.left = `calc(50% + ${x}px)`;
        hourMark.style.top = `calc(50% + ${y}px)`;
        hourMark.style.width = `${markShift}px`;
        hourMark.style.height = `${markShift}px`;
        hourMark.style.lineHeight = `${markShift}px`;

        //Устанавливаем зависимость размера шрифта от диаметра
        const fontSize = diameter * 0.05;
        hourMark.style.fontSize = `${fontSize}px`;

        clock.appendChild(hourMark);
    }

    clockContainer.appendChild(clock);
}

//Запускаем часы
function startClock() {
    function updateClock() {
        //Получаем время
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDegrees = ((seconds / 60) * 360); // угол поворота секундной стрелки
        const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6); // угол поворота минутной стрелки
        const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30); // угол поворота часовой стрелки

        document.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
        document.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;

        // обновляем отображение времени
        const timeDisplay = document.getElementById('time-display');
        timeDisplay.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    //Обновляем часы раз в секунду
    updateClock();
    setInterval(updateClock, 1000);
}
