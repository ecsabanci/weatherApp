
const locationTimezone = document.querySelector(".Location-timezone");
const weatherDescription = document.querySelector(".Weather-description");
let temperatureDegree = document.querySelector(".Temperature-degree")

const temperatureSection = document.querySelector(".Temperature");
let temperatureSign = document.querySelector(".Temperature-sign");

const searchButton = document.querySelector(".Search-button"); 
const searchInput = document.querySelector(".Search-input");

const locationWeatherIcon = document.querySelector(".Location-weather-icon");


if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(position => {
        
        long = position.coords.longitude;
        lat = position.coords.latitude;

        console.log(position)        

        const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c12cd420fd24effa0b81b33c545c0f3a`;

        getData(API);
        
    })
    

} else {
    let cityName = "London";
        

    
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c12cd420fd24effa0b81b33c545c0f3a`

    getData(API);


}




function getData(API){
    fetch(API)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)

        let weatherIcon = data.weather[0]["icon"]
        let description = data.weather[0]["description"];
        let temp = Math.floor((data.main.temp - 273.15) * 1.8 + 32);
        let location = data.name.split(" ")[0];

        weatherDescription.textContent =  description;
        temperatureDegree.textContent = temp;
        locationTimezone.textContent = location;
        locationWeatherIcon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                                    

        // change temperature fahrenheit to celcius
        temperatureSection.addEventListener("click", () => {
            if(temperatureSign.textContent === "F"){
                temperatureDegree.textContent = Math.floor((temp - 32) / 1.8);
                temperatureSign.textContent = "C";
            } else {
                temperatureSign.textContent = "F";
                temperatureDegree.textContent = temp;
            }  
        })

    })
}