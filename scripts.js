var weatherResults = [];

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api.weather.gov/gridpoints/SEW/128,66/forecast", requestOptions)
    .then(response => response.json())
    .then(result => {
    weatherResults = result.properties.periods;
    displayWeather(weatherResults);
})
.catch(error => console.log(error));


function displayWeather(weatherResults) {
    const getContainer = document.getElementById('weather-container');
    weatherResults.forEach(period => {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-period';
        weatherDiv.innerHTML = `
        <h3 class="day">${period.name}</h3>
        <p class="temp">Temperature: <span id="temp">${period.temperature}</span></p>
        <p class="forecast">Forecast: ${period.shortForecast}</p>
        <img class="image" src="${period.icon}" alt="${period.shortForecast}">
        `;
        getContainer.appendChild(weatherDiv);
    });
}

/*
    TODO 
    1. Figure out a call to capture the grid points 
    2. Enter the grid points in the fetch call
*/