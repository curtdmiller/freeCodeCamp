var weatherKey = config.WEATHER_KEY;

var city, tempFahr, tempCel, conditions, icon;
$(document).ready(function(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var apiURL = "//api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&APPID=" + weatherKey ;
            $('.pre-load p').html('fetching weather')
            $.getJSON(apiURL, function(weather) {
                $('.pre-load').css('display', 'none');
                city = weather.name;
                tempFahr = weather.main.temp;
                tempCel = toCelsius(tempFahr);
                conditions = weather.weather[0].main;
                icon = weatherIcon(conditions);
                $('#location').html(city);
                $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
                $('#icon').html('<img src="' + icon + '">');
                $('#unit-btn-group').css('display', 'block')
            });
        });
    } else  {
        /* geolocation IS NOT available */
    }
    $('#cel').on('click', function() {
        $('#conditions').html(conditions + ' | ' + parseInt(tempCel) + '&deg;C');
        $('#cel').attr('disabled', 'disabled');
        $('#fahr').removeAttr('disabled');
    })
    $('#fahr').on('click', function() {
        $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
        $('#cel').removeAttr('disabled');
        $('#fahr').attr('disabled', 'disabled');
    })
});

// Icons by Adam Whitcroft: http://adamwhitcroft.com/climacons/
function weatherIcon(currentConditions) {
    var d = new Date();
    var h = d.getHours();
    currentConditions = currentConditions.toLowerCase();
    if(h > 7 && h < 19) { // if time is between 7am and 7pm
        /* daytime icons */
        switch (currentConditions) {
            case 'clear':
            case 'clear sky':
                return 'svg/Sun.svg'
                break;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
                return 'svg/Cloud-Sun.svg';
                break;
            case 'shower rain':
                return 'svg/Cloud-Drizzle-Sun.svg';
                break;
            case 'rain':
                return 'svg/Cloud-Rain.svg';
                break;
            case 'thunderstorm':
                return 'svg/Cloud-Lightning.svg';
                break;
            case 'snow':
                return 'svg/Cloud-Snow.svg';
                break;
            case 'mist':
                return 'svg/Cloud-Fog.svg';
                break;
            default:
        }
    } else {
        /* nighttime icons */
        switch (currentConditions) {
            case 'clear':
            case 'clear sky':
                return('svg/Moon.svg');
                break;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
                return 'svg/Cloud-Moon.svg';
                break;
            case 'shower rain':
                return 'svg/Cloud-Drizzle-Moon.svg';
                break;
            case 'rain':
                return 'svg/Cloud-Rain.svg';
                break;
            case 'thunderstorm':
                return 'svg/Cloud-Lightning.svg';
                break;
            case 'snow':
                return 'svg/Cloud-Snow.svg';
                break;
            case 'mist':
                return 'svg/Cloud-Fog.svg';
                break;
            default:
        }
    }
}
function toCelsius(degFahr) {
    return ((degFahr - 32) * 5) / 9;
}
