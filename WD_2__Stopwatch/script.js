let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let laps = [];

function startStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startBtn').textContent = 'Start';
    } else {
        timer = setInterval(updateStopwatch, 1000);
        document.getElementById('startBtn').textContent = 'Pause';
    }

    isRunning = !isRunning;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    laps = [];
    updateDisplay();
    updateLaps();
    document.getElementById('startBtn').textContent = 'Start';
}

function recordLap() {
    const lapTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    laps.push(lapTime);
    updateLaps();
}

function updateStopwatch() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function updateLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';

    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapItem);
    });
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}
