var weatherKey = config.WEATHER_KEY;

var city, temp, humidity, conditions;
$(document).ready(function(){
    if ("geolocation" in navigator) {
        /* geolocation is available */
        $('.location').html('<p>getting location...</p>');
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var apiURL = "//api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&APPID=" + weatherKey ;
            $('.location').html('<p>getting weather...</p>');
            $.getJSON(apiURL, function(weather) {
                console.log(weather);
                city = weather.name;
                temp = weather.main.temp;
                humidity = weather.main.humidity;
                conditions = weather.weather[0].main;
                $('.location').html('<p>current weather for ' + city + ':<br>' + parseInt(temp) + '&deg;F<br>' + conditions + '<br>humidity:' + humidity + '%</p>');
            });
        });
    } else {
        /* geolocation IS NOT available */
    }
})
