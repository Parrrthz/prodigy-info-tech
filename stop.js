let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let timer = document.getElementById('timer');
let lapList = document.getElementById('lapList');
let formatSelect = document.getElementById('format');
let darkModeToggle = document.getElementById('darkModeToggle');
let lapSound = document.getElementById('lapSound');
let startStopSound = document.getElementById('startStopSound');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopSound.play();
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
    startStopSound.play();
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    timer.innerHTML = formatTime(0, 0, 0);
    lapList.innerHTML = '';
    startStopSound.play();
}

function lapTimer() {
    if (running) {
        const lapTime = timer.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
        lapSound.play();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timer.innerHTML = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    let timeFormat = formatSelect.value;
    
    if (timeFormat === "HH:MM:SS") {
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    } else if (timeFormat === "MM:SS") {
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    } else if (timeFormat === "SS") {
        return seconds;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
darkModeToggle.addEventListener('click', toggleDarkMode);
