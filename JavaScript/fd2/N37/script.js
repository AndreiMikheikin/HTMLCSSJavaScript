document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clock-start').addEventListener('click', () => {
        const diameterInput = document.getElementById('d-input');
        const diameter = parseInt(diameterInput.value);

        if (diameter < 200 || diameter > 800 || isNaN(diameter)) {
            alert('Введите правильный диаметр от 200 до 800.');
            return;
        }

        clearInterval(window.clockInterval); // сбрасываем интервал
        console.clear();
        createClock(diameter);
        startClock(diameter);
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

        const svgNS = "http://www.w3.org/2000/svg";
        const clock = document.createElementNS(svgNS, 'svg');
        clock.setAttribute('id', 'clock');
        clock.setAttribute('width', diameter);
        clock.setAttribute('height', diameter);
        clock.setAttribute('viewBox', `0 0 ${diameter} ${diameter}`);

        const clockBackground = document.createElementNS(svgNS, 'circle');
        clockBackground.setAttribute('cx', diameter / 2);
        clockBackground.setAttribute('cy', diameter / 2);
        clockBackground.setAttribute('r', diameter / 2 - diameter * 0.015);
        clockBackground.setAttribute('stroke', '#333');
        clockBackground.setAttribute('stroke-width', diameter * 0.015);
        clockBackground.setAttribute('fill', 'white');
        clock.appendChild(clockBackground);

        //Это часть боловства
        clockBackground.addEventListener('click', () => {
            currentColorIndex = (currentColorIndex + 1) % bgColors.length;
            clockBackground.setAttribute('fill', bgColors[currentColorIndex]);
        });

        //Часовая стрелка
        const hourHand = document.createElementNS(svgNS, 'line');
        hourHand.setAttribute('class', 'hand hour-hand');
        hourHand.setAttribute('x1', diameter / 2);
        hourHand.setAttribute('y1', diameter / 2 - diameter * 0.25 + diameter * 0.05);
        hourHand.setAttribute('x2', diameter / 2);
        hourHand.setAttribute('y2', diameter / 2 + diameter * 0.05);
        hourHand.setAttribute('stroke', 'black');
        hourHand.setAttribute('stroke-width', diameter * 0.015);
        hourHand.setAttribute('stroke-linecap', 'butt');
        hourHand.setAttribute('cx', diameter / 2);
        hourHand.setAttribute('cy', diameter / 2);
        hourHand.setAttribute('transform-origin', 'cx cy');

        //Минутная стрелка
        const minuteHand = document.createElementNS(svgNS, 'line');
        minuteHand.setAttribute('class', 'hand minute-hand');
        minuteHand.setAttribute('x1', diameter / 2);
        minuteHand.setAttribute('y1', diameter / 2 - diameter * 0.35 + diameter * 0.05);
        minuteHand.setAttribute('x2', diameter / 2);
        minuteHand.setAttribute('y2', diameter / 2 + diameter * 0.05);
        minuteHand.setAttribute('stroke', 'black');
        minuteHand.setAttribute('stroke-width', diameter * 0.01);
        minuteHand.setAttribute('stroke-linecap', 'butt');
        minuteHand.setAttribute('cx', diameter / 2);
        minuteHand.setAttribute('cy', diameter / 2);
        minuteHand.setAttribute('transform-origin', 'cx cy');

        //Секундная стрелка
        const secondHand = document.createElementNS(svgNS, 'line');
        secondHand.setAttribute('class', 'hand second-hand');
        secondHand.setAttribute('x1', diameter / 2);
        secondHand.setAttribute('y1', diameter / 2 - diameter * 0.45 + diameter * 0.05);
        secondHand.setAttribute('x2', diameter / 2);
        secondHand.setAttribute('y2', diameter / 2 + diameter * 0.05);
        secondHand.setAttribute('stroke', 'red');
        secondHand.setAttribute('stroke-width', diameter * 0.005);
        secondHand.setAttribute('stroke-linecap', 'butt');
        secondHand.setAttribute('cx', diameter / 2);
        secondHand.setAttribute('cy', diameter / 2);
        secondHand.setAttribute('transform-origin', 'cx cy');

        //Отображение времени
        const timeDisplay = document.createElementNS(svgNS, 'text');
        timeDisplay.setAttribute('id', 'time-display');
        timeDisplay.setAttribute('x', diameter / 2);
        timeDisplay.setAttribute('y', diameter * 0.75);
        timeDisplay.setAttribute('text-anchor', 'middle');
        timeDisplay.setAttribute('font-size', diameter * 0.1);
        clock.appendChild(timeDisplay);

        //Создаем циферблат
        for (let i = 1; i <= 12; i++) {
            const hourMark = document.createElementNS(svgNS, 'text');
            hourMark.setAttribute('class', 'hour-mark');
            hourMark.textContent = i; // значение содержимого приравниваем к итератору цикла

            const angle = (i * 30) - 90; // на каждый час по 30deg и поворот на -90deg
            const markShift = diameter * 0.1; // константа зависимости от диаметра
            const radius = diameter / 2 - markShift;
            const x = diameter / 2 + radius * Math.cos(angle * Math.PI / 180);
            const y = diameter / 2 + radius * Math.sin(angle * Math.PI / 180);

            //Позиционируем и масштабируем цифры и их фон на циферблате
            const markBackground = document.createElementNS(svgNS, 'circle');
            markBackground.setAttribute('cx', x);
            markBackground.setAttribute('cy', y);
            markBackground.setAttribute('r', markShift / 2);
            markBackground.setAttribute('fill', '#333');
            markBackground.setAttribute('fill-opacity', 0.3);

            hourMark.setAttribute('x', x);
            hourMark.setAttribute('y', y);

            //Устанавливаем зависимость размера шрифта от диаметра
            hourMark.setAttribute('font-size', diameter * 0.05);
            hourMark.setAttribute('text-anchor', 'middle');
            hourMark.setAttribute('dominant-baseline', 'central');

            clock.appendChild(markBackground);
            clock.appendChild(hourMark);
        }

        clock.appendChild(hourHand);
        clock.appendChild(minuteHand);
        clock.appendChild(secondHand);
        clockContainer.appendChild(clock);
    }

    //Запускаем часы
    function startClock(diameter) {
        function updateClock() {
            //Получаем время
            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            const secondDegrees = ((seconds / 60) * 360);
            const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
            const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30);

            const secondHand = document.querySelector('.second-hand');
            const minuteHand = document.querySelector('.minute-hand');
            const hourHand = document.querySelector('.hour-hand');

            secondHand.setAttribute('transform', `rotate(${secondDegrees} ${diameter / 2} ${diameter / 2})`);
            minuteHand.setAttribute('transform', `rotate(${minuteDegrees} ${diameter / 2} ${diameter / 2})`);
            hourHand.setAttribute('transform', `rotate(${hourDegrees} ${diameter / 2} ${diameter / 2})`);

            // обновляем отображение времени
            const timeDisplay = document.getElementById('time-display');
            timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            console.log('Текущее время: ' + timeDisplay.textContent);
        }

        //Устанавливаем интервал обновления часов
        updateClock();
        window.clockInterval = setInterval(updateClock, 1000);
    }
});