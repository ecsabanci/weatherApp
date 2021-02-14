const locationTimezone = document.querySelector(".Location-timezone");
const weatherDescription = document.querySelector(".Weather-description");
const temperatureDegree = document.querySelector(".Temperature-degree")
const temperatureSign = document.querySelector(".Temperature-sign"); 

const searchButton = document.querySelector(".Search-button"); 
const searchInput = document.querySelector(".Search-input");

const locationWeatherIcon = document.querySelector(".Location-weather-icon");


const getData = async (location) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c12cd420fd24effa0b81b33c545c0f3a`;

    const response = await fetch(API);
    const data = await response.json();

    weatherInformations(data);
}

const weatherInformations = (data) => {
    
    let {icon} = data.weather[0];
    let {description} = data.weather[0];
    let temp = Math.floor((data.main.temp - 273.15));
    let location = data.name.split(" ")[0];

    weatherDescription.textContent =  description;
    temperatureDegree.textContent = temp;
    locationTimezone.textContent = location;
    locationWeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    
    document.title = locationTimezone.textContent+" "+temperatureDegree.textContent+" "+temperatureSign.textContent;

    
}


const eventListeners = () => {

    if(searchInput.value === ""){
        getData("Ankara");
    }

    searchButton.addEventListener("click", ()=> {
        getData(searchInput.value);
        searchInput.value = "";
    })

  
};

eventListeners();


