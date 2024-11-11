// Alternar entre reloj, cronómetro y hora mundial
function showClock() {
    document.getElementById('clock-section').style.display = 'block';
    document.getElementById('stopwatch-section').style.display = 'none';
    document.getElementById('world-clock-section').style.display = 'none';
}

function showStopwatch() {
    document.getElementById('clock-section').style.display = 'none';
    document.getElementById('stopwatch-section').style.display = 'block';
    document.getElementById('world-clock-section').style.display = 'none';
}

function showWorldClock() {
    document.getElementById('clock-section').style.display = 'none';
    document.getElementById('stopwatch-section').style.display = 'none';
    document.getElementById('world-clock-section').style.display = 'block';
}

// Reloj en tiempo real
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    const day = now.toLocaleDateString('es-ES', { weekday: 'long' });
    const date = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('date').textContent = `${day.charAt(0).toUpperCase() + day.slice(1)}, ${date}`;
}

setInterval(updateClock, 1000);
updateClock();

// Cronómetro
let swInterval;
let swTime = 0;

function startStopwatch() {
    if (!swInterval) {
        swInterval = setInterval(updateStopwatch, 10);
    }
    document.getElementById('start-button').classList.add('hidden');
}

function stopStopwatch() {
    clearInterval(swInterval);
    swInterval = null;
}

function resetStopwatch() {
    clearInterval(swInterval);
    swInterval = null;
    swTime = 0;
    updateStopwatch();
    document.getElementById('start-button').classList.remove('hidden');
}

function updateStopwatch() {
    swTime += 10;
    const milliseconds = String(Math.floor((swTime % 1000) / 10)).padStart(2, '0');
    const seconds = String(Math.floor((swTime / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((swTime / (1000 * 60)) % 60)).padStart(2, '0');
    const hours = String(Math.floor(swTime / (1000 * 60 * 60))).padStart(2, '0');

    document.getElementById('sw-hours').textContent = hours;
    document.getElementById('sw-minutes').textContent = minutes;
    document.getElementById('sw-seconds').textContent = seconds;
    document.getElementById('sw-milliseconds').textContent = milliseconds;
}

// Hora Mundial
const worldClocksContainer = document.getElementById('world-clocks-container');

function addWorldClock() {
    const timezone = document.getElementById('timezone-select').value;
    if (timezone) {
        const clockElement = document.createElement('div');
        clockElement.className = 'world-clock';

        const timeZoneLabel = document.createElement('div');
        timeZoneLabel.className = 'timezone-label';
        timeZoneLabel.textContent = timezone;

        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'world-time';
        timeDisplay.textContent = getCurrentTimeForTimezone(timezone);

        clockElement.appendChild(timeZoneLabel);
        clockElement.appendChild(timeDisplay);
        worldClocksContainer.appendChild(clockElement);

        // Actualizar el reloj de esta zona horaria cada segundo
        setInterval(() => {
            timeDisplay.textContent = getCurrentTimeForTimezone(timezone);
        }, 1000);
    }
}

function getCurrentTimeForTimezone(timezone) {
    const now = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat('es-ES', options).format(now);
}

