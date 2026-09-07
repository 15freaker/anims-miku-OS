export function initWidgets() {
    buildCalendar();
    fetchLiveWeather();
}

function buildCalendar() {
    const grid = document.getElementById('calendar-grid');
    const headerTitle = document.getElementById('cal-month-year');
    const badge = document.getElementById('calendarBadge');

    if (!grid || !headerTitle) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    headerTitle.textContent = `${monthNames[month]} ${year}`;
    if (badge) badge.textContent = `📅 ${monthNames[month].slice(0, 3)} ${now.getDate()}`;

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    grid.innerHTML = dayNames.map(d => `<div class="cal-day-header">${d}</div>`).join('');

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="cal-date empty"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === now.getDate() ? 'active' : '';
        grid.innerHTML += `<div class="cal-date ${isToday}">${d}</div>`;
    }
}

async function fetchLiveWeather() {
    const tempEl = document.getElementById('weatherTemp');
    const badgeEl = document.getElementById('weatherBadge');
    const condEl = document.getElementById('weatherCondition');
    const humEl = document.getElementById('weatherHumidity');
    const windEl = document.getElementById('weatherWind');

    const lat = 25.5941;
    const lon = 85.1376;

    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        if (!res.ok) return;
        const data = await res.json();
        
        if (data && data.current) {
            const temp = Math.round(data.current.temperature_2m);
            const humidity = data.current.relative_humidity_2m;
            const wind = Math.round(data.current.wind_speed_10m);

            if (tempEl) tempEl.textContent = `${temp}°C`;
            if (badgeEl) badgeEl.textContent = `🌤️ ${temp}°C`;
            if (condEl) condEl.textContent = getWeatherDescription(data.current.weather_code);
            if (humEl) humEl.textContent = `Humidity: ${humidity}%`;
            if (windEl) windEl.textContent = `Wind: ${wind} km/h`;
        }
    } catch (err) {
        if (badgeEl) badgeEl.textContent = `🌤️ 28°C`;
        if (tempEl) tempEl.textContent = `28°C`;
        if (condEl) condEl.textContent = `Partly Cloudy`;
        if (humEl) humEl.textContent = `Humidity: 70%`;
        if (windEl) windEl.textContent = `Wind: 12 km/h`;
    }
}

function getWeatherDescription(code) {
    if (code === 0) return 'Clear Sky';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rain / Drizzle';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Cloudy';
}