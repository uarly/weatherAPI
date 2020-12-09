//When Search Btn is pressed grab the input field value
let APIkey = "7628c6e85cc8985bee70462b6b4b3f35"
$("#search").on("click",function(){

    var cityname = $("#cityname").val()  // Grab the inpput
    console.log(cityname)
    currentForecast(cityname)
  fivedaysForecast(cityname)
})

//place ajax call to get current forecast
function currentForecast(cityname){
    $.ajax({
        method : "GET",
        url:`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=imperial`
    }).then(function(APIresponse){
            console.log(APIresponse) // Output from API
            $("#current").html(`
            <div class="container-fluid">
            <h4>City: ${cityname}</h4>
            <h6>Description: ${APIresponse.weather[0].description}</h6>
            <h6>temperature;${APIresponse.main.temp}</h6>
            <p>speed;${APIresponse.wind.speed}</p>
            <p>humudity${APIresponse.main.humidity}</p>
            <img src=" https://openweathermap.org/img/wn/${APIresponse.weather[0].icon}@2x.png" />
            </div>
            `)
    })
}

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//place ajax call to get fiveday forecast
function fivedaysForecast(cityname){
    $.ajax({
        method : "GET",
        url:`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}&units=imperial`
    }).then(function(APIresponse){
            console.log(APIresponse) // Output from API
            $("#fiveday").empty("")
            for(let i=0;i<APIresponse.list.length;i=i+8){
           $("#fiveday").append(`
            <div class="card">
            <h4>Date ${APIresponse.list[i].dt_txt}</h4>
            <h6>Description: ${APIresponse.list[i].weather[0].description}</h6>
            <h6>temperature;${APIresponse.list[i].main.temp}</h6>
            <p>speed;${APIresponse.list[i].wind.speed}</p>
            <p>humudity${APIresponse.list[i].main.humidity}</p>
            <img src=" https://openweathermap.org/img/wn/${APIresponse.list[i].weather[0].icon}@2x.png" />
            </div>
            `)
            }
    })
}
