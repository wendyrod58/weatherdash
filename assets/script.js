var apiKey = '4bcf9a7748598d2f2a26f50816e3eaf2';
var searchTextEl = document.getElementById("search-text");
var searchBtn = document.getElementById("getWeather");
var searchHistory = JSON.parse(localStorage.getItem("cityList")); //convert it back to JSON obj  

console.log("seacrh", searchHistory);
if( searchHistory === null){
    searchHistory = []; //if there is no value saved in local storage , for the first time assign it a blank array 
}
console.log("update search array ", searchHistory);


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
                    var date = new Date(data1.current.dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("current-date").textContent = date;
                    document.getElementById("current-temp").textContent = data1.current.temp;
                    document.getElementById("current-hum").textContent = data1.current.humidity;
                    document.getElementById("current-wind").textContent = data1.current.wind_speed;
                    document.getElementById("current-uvi").textContent = data1.current.uvi;



                    // //5-Day Forecast 

                    // display in HTML page
                    var date1 = new Date(data1.daily[1].dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("day1-date").textContent = date1;
                    document.getElementById("day1-temp").textContent = data1.daily[1].temp.day;
                    document.getElementById("day1-hum").textContent = data1.daily[1].humidity;
                    document.getElementById("day1-wind").textContent = data1.daily[1].wind_speed;
                    


                    var date2 = new Date(data1.daily[2].dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("day2-date").textContent = date2;
                    document.getElementById("day2-temp").textContent = data1.daily[2].temp.day;
                    document.getElementById("day2-hum").textContent = data1.daily[2].humidity;
                    document.getElementById("day2-wind").textContent = data1.daily[2].wind_speed;
                    

                    var date3 = new Date(data1.daily[3].dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("day3-date").textContent = date3;                    
                    document.getElementById("day3-temp").textContent = data1.daily[3].temp.day;
                    document.getElementById("day3-hum").textContent = data1.daily[3].humidity;
                    document.getElementById("day3-wind").textContent = data1.daily[3].wind_speed;
                    

                    var date4 = new Date(data1.daily[4].dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("day4-date").textContent = date4;             
                    document.getElementById("day4-temp").textContent = data1.daily[4].temp.day;
                    document.getElementById("day4-hum").textContent = data1.daily[4].humidity;
                    document.getElementById("day4-wind").textContent = data1.daily[4].wind_speed;
                    
                    var date5 = new Date(data1.daily[5].dt * 1000).toLocaleDateString("en-US");
                    document.getElementById("day5-date").textContent = date5;             
                    document.getElementById("day5-temp").textContent = data1.daily[5].temp.day;
                    document.getElementById("day5-hum").textContent = data1.daily[5].humidity;
                    document.getElementById("day5-wind").textContent = data1.daily[5].wind_speed;
                 

                    //append value to the array 
                    searchHistory.push(data[0].name);
                    //save the city in localstorage 
                    localStorage.setItem("cityList", JSON.stringify(searchHistory));
                    //calling the function 
                    searchedCities();
                })
        })

}


// Search History
function searchedCities() {
    document.getElementById("searched-cities").innerHTML = ""; //empty the previous values 

    for (var index = 0; index < searchHistory.length; index++) {
        console.log("city name", searchHistory[index]);
        //create an li tag element 
        var liTag = document.createElement("li"); 
        //set the display text of city name 
        liTag.textContent = searchHistory[index]; 

        liTag.setAttribute("class","list-group-item"); 
        console.log(liTag);

        //append it to the ul , so that it displays on my HTML page 
        document.getElementById("searched-cities").append(liTag); 
    }
}

//calling the function on page load 
searchedCities();

//Add Event listener 
searchBtn.addEventListener('click', getWeatherAPI); 