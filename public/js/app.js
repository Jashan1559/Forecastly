const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const errormessage = document.querySelector('#error');
const successmessage = document.querySelector('#success');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;

    errormessage.textContent = 'Loading...';
    successmessage.textContent = '';

    if(!location){
        errormessage.textContent = 'Please provide a Location.';
        return;
    }
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                errormessage.textContent = data.error;
                successmessage.textContent = '';
            } else{
                const WeatherDetails = `
                <table class = "table table-bordered mt-3">
                <tbody>
                    <tr>
                        <td>Location</td>
                        <td>${data.LocationFromGeocode}</td>
                    </tr>
                    <tr>
                        <td>Forecast</td>
                        <td>${data.Weather.forecast}</td>
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        <td>${data.Weather.temperature}°C</td>
                    </tr>
                    <tr>
                        <td>Feels Like</td>
                        <td>${data.Weather.feels_like}°C</td>
                    </tr>
                    <tr>
                        <td>Wind Speed</td>
                        <td>${data.Weather.wind_speed} km/h</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>${data.Weather.humidity}%</td>
                    </tr>
                </tbody>
            </table>
            `;
                errormessage.textContent = '';
                successmessage.innerHTML = WeatherDetails;

            }
            
    
        })
    })
    
})