var apiKey = '4bcf9a7748598d2f2a26f50816e3eaf2';
var searchTextEl = document.getElementById("search-text");
var searchBtn = document.getElementById("getWeather");
var searchHistory = []



//function get the Weather
function getWeatherAPI() {
    var geoCodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchTextEl.value + '&limit=1&appid=' + apiKey;
    console.log("location URL", geoCodingURL);

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

            // to show name of city
            console.log(data[0].name)
            document.getElementById("city").textContent = data[0].name

            var currentURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey;
            console.log(currentURL);

            // var dayName = Date(value.dt * 1000).toLocaleDateString("en", {weekday: "long",});

            //fetch Request for current weather api 
            fetch(currentURL)
                .then(function (response1) {
                    return response1.json();
                })
                .then(function (data1) {
                    console.log("current weather response", data1);
                    //display on HTMl PAGE 
                    document.getElementById("current-date").textContent = data1.current.dt;
                    document.getElementById("current-temp").textContent = data1.current.temp;
                    document.getElementById("current-hum").textContent = data1.current.humidity;
                    document.getElementById("current-wind").textContent = data1.current.wind_speed;
                    document.getElementById("current-uvi").textContent = data1.current.uvi;



                    // //5-Day Forecast 
                    // var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey;
                    // console.log(forecastURL);

                    //fetch Request for daily weather api 
                    // fetch(forecastURL)
                    //     .then(function (response1) {
                    //         return response1.json();
                    //     })
                    //     .then(function (data1) {
                    //         console.log("daily weather response", data1);
                    // display in HTML page
                    document.getElementById("day1-date").textContent = data1.daily[0].dt;
                    document.getElementById("day1-temp").textContent = data1.daily[0].temp.day;
                    document.getElementById("day1-hum").textContent = data1.daily[0].humidity;
                    document.getElementById("day1-wind").textContent = data1.daily[0].wind_speed;
                    document.getElementById("day1-uvi").textContent = data1.daily[0].uvi;

                    document.getElementById("day2-temp").textContent = data1.daily[1].temp.day;
                    document.getElementById("day2-hum").textContent = data1.daily[1].humidity;
                    document.getElementById("day2-wind").textContent = data1.daily[1].wind_speed;
                    document.getElementById("day2-uvi").textContent = data1.daily[1].uvi;

                    document.getElementById("day3-temp").textContent = data1.daily[2].temp.day;
                    document.getElementById("day3-hum").textContent = data1.daily[2].humidity;
                    document.getElementById("day3-wind").textContent = data1.daily[2].wind_speed;
                    document.getElementById("day3-uvi").textContent = data1.daily[2].uvi;

                    document.getElementById("day4-temp").textContent = data1.daily[3].temp.day;
                    document.getElementById("day4-hum").textContent = data1.daily[3].humidity;
                    document.getElementById("day4-wind").textContent = data1.daily[3].wind_speed;
                    document.getElementById("day4-uvi").textContent = data1.daily[3].uvi;

                    document.getElementById("day5-temp").textContent = data1.daily[4].temp.day;
                    document.getElementById("day5-hum").textContent = data1.daily[4].humidity;
                    document.getElementById("day5-wind").textContent = data1.daily[4].wind_speed;
                    document.getElementById("day5-uvi").textContent = data1.daily[4].uvi;
                })
        })

}

// Search History 
// function 
// loop
// create an array


//Add Event listener 
searchBtn.addEventListener('click', getWeatherAPI); 