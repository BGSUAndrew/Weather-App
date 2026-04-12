class GetData extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        var weatherResults = [];
        var temperature = '';
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

    fetch("https://api.weather.gov/gridpoints/SEW/128,66/forecast", requestOptions)
        .then(response => response.json())
        .then(result => {
        weatherResults = result.properties.periods;
        temperature = result.properties.periods[0].temperature;
            console.log(weatherResults[0]);
            displayWeather(weatherResults);
        })
            .catch(error => console.log(error));

    function displayWeather(weatherResults) {
        const getContainer = document.getElementById('weather-container');
        const getBody = document.getElementById('weather-style');

    weatherResults.forEach(period => {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-period';
        weatherDiv.innerHTML = `
        <h3 class="day">${period.name}</h3>
        <p class="bold">Temperature: <span id="bold">${period.temperature}</span></p>
        <p class="forecast">Forecast: <span id="bold">${period.shortForecast}</span></p>
        <img class="image" src="${period.icon}" alt="${period.shortForecast}">
        `;
        getContainer.appendChild(weatherDiv);
        
        if (temperature < 50) {
            getBody.classList.add('cold');
        } else if (temperature >=50 && temperature < 65) {
            getBody.classList.add('cool');
        } else if (temperature >= 66 && temperature < 80) {
            getBody.classList.add('warm');
        } else {
            getBody.classList.add('hot');
        }
    });
}//End the displayWeather function 

        }
        
    }

customElements.define("my-data-fetch", GetData);