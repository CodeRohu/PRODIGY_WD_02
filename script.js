let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopButton.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerHTML = 'Start';
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = 'Start';
    display.innerHTML = '00:00:00';
    laps = [];
    lapsContainer.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

startStopButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
