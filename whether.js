// const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const url = 'https://api.weatherstack.com/current?access_key={PASTE_YOUR_API_KEY_HERE}&query=New Delhi';
const options = {
	method: 'GET'
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
async function getWeather() {
    const location = document.getElementById('location').value;
    let url = '';
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('weather-info').innerHTML = '';

    if (location) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                await fetchWeather(url);
            }, () => {
                document.getElementById('weather-info').innerHTML = 'Geolocation not supported or permission denied.';
                document.getElementById('loading').classList.add('hidden');
            });
        } else {
            document.getElementById('weather-info').innerHTML = 'Geolocation not supported by this browser.';
            document.getElementById('loading').classList.add('hidden');
        }
        return;
    }
    await fetchWeather(url);
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('loading').classList.add('hidden');

        if (data.cod === 200) {
            document.getElementById('weather-info').innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="weather-icon">
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Visibility:</strong> ${data.visibility / 1000} km</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `Error: ${error.message}`;
    }
}
