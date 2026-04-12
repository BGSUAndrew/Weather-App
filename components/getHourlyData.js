class GetHourlyData extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        var weatherResults = [];
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

    fetch("https://api.weather.gov/gridpoints/SEW/128,66/forecast/hourly", requestOptions)
        .then(response => response.json())
        .then(result => {
        weatherResults = result.periods[0];
            console.log(weatherResults);
        })
            .catch(error => console.log(error));
    }
}
customElements.define("my-hourly-fetch", GetHourlyData);
