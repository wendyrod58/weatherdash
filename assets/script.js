var apiKey = '4bcf9a7748598d2f2a26f50816e3eaf2';
var searchTextEl = document.getElementById("search-text");
var searchBtn = document.getElementById("getWeather");
var searchHistory = []

//function get the Weather
function getWeatherAPI() {
    var geoCodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTextEl.value + '&limit=1&appid=' + apiKey;
    console.log(geoCodingURL);

    //Fetch the Lat and Lon based on the user input 
    fetch(geoCodingURL)
        .then(function (response) {
            //console.log("Api response", response);
            return response.json(); //on sucess give the json object 
        })
        .then(function (data) {
            console.log("JSON object :", data);
            //Grab values from the JSON basically lat, lon and name 
            var long = data[0].lon;
            var lati = data[0].lat;

            console.log(data[0].name)
            // document.getElementById("city").textContent = data[0].name
            // console.log(data[0].name)

            var currentURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey;
            console.log(currentURL);

            //fetch Request for current weather api 
            fetch(currentURL)
                .then(function (response1) {
                    return response1.json();
                })
                .then(function (data1) {
                    console.log("current weather response", data1);
                    //display on HTMl PAGE 
                    document.getElementById("current-temp").textContent = data1.current.temp;
                    document.getElementById("current-hum").textContent = data1.current.humidity;
                    document.getElementById("current-wind").textContent = data1.current.wind_speed;
                    document.getElementById("current-uvi").textContent = data1.current.uvi;
                })




                //fetch Request for daily weather api 
                var forecastURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey;
                console.log(currentURL);
            
            fetch(forecastURL)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    console.log("daily weather response", data2);
                    //display on HTMl PAGE 
                    document.getElementById("day1-temp").textContent = data2.daily.temp;
                    document.getElementById("day1-hum").textContent = data2.daily.humidity;
                    document.getElementById("day1-wind").textContent = data2.daily.wind_speed;
                    document.getElementById("day1-uvi").textContent = data2.daily.uvi;
                })
        })

}

// Search History 
// function 
// loop
// create an array


//Add Event listener 
searchBtn.addEventListener('click', getWeatherAPI); 