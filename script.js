//today variables
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-day"),
    todayLocation = document.getElementById("today-location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    umberella = document.getElementById("umberella")
    wind = document.getElementById("wind")
    compass = document.getElementById("compass")
    weatherCondition = document.getElementById("weather-condition"),
    searchBar = document.getElementById("search"),
    date = new Date();


//next day variables

let nextDay = document.getElementsByClassName("next-day"),
    nextdayIcon = document.getElementsByClassName("nextday-icon"),
    maxDegree = document.getElementsByClassName('max-degree'),
    minDegree = document.getElementsByClassName("min-degree"),
    nextdayCondition = document.getElementsByClassName("nextday-condition"),
    apiResponse,
    rsponseData,
    months = ["jan", "feb", "march", "April", "May", "June", "July", "Aug", "sept", "Oct", "Nov", "Dec"]
days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"]







async function getWeatherData(currentCity = "cairo") {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f9e94221aa924a8699a232851220302&q="${currentCity}"&days=7`)
    rsponseData = await apiResponse.json()
    console.log(rsponseData)
    displayTodayWeather()
    displayNextDay()
}

getWeatherData()

function displayTodayWeather() {
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
    todayLocation.innerHTML = rsponseData.location.name
    todayDegree.innerHTML = rsponseData.current.temp_c
    todayIcon.setAttribute("src",`https:${rsponseData.current.condition.icon}`)
    umberella.innerHTML = rsponseData.current.wind_dir
    wind.innerHTML = rsponseData.current.wind_kph +`${"%"}`
    compass.innerHTML = rsponseData.current.wind_mph +`${"m/h"}`
    weatherCondition.innerHTML = rsponseData.current.condition.text
    
}

function displayNextDay() {
    for(let i=0; i<nextDay.length; i++){
        nextDay[i].innerHTML = days[new Date(rsponseData.forecast.forecastday[i+1].date).getDay()]
        nextdayIcon[i].setAttribute("src", `https:${rsponseData.forecast.forecastday[i+1].day.condition.icon}`) 
        maxDegree[i].innerHTML = rsponseData.forecast.forecastday[i+1].day.maxtemp_c
        minDegree[i].innerHTML = rsponseData.forecast.forecastday[i+1].day.mintemp_c
        nextdayCondition[i].innerHTML = rsponseData.forecast.forecastday[i+1].day.condition.text
    }

}

searchBar.addEventListener("keyup",function(){
   let currentCity = searchBar.value
   getWeatherData(currentCity)
})
