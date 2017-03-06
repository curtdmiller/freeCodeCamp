var weatherKey = config.WEATHER_KEY;

var city, tempFahr, tempCel, conditions, conditionid, icon;
$(document).ready(function(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var apiURL = "//api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&APPID=" + weatherKey ;
            $('.pre-load p').html('fetching weather');
            $.getJSON(apiURL, function(weather) {
                $('.pre-load').css('display', 'none');
                city = weather.name;
                tempFahr = weather.main.temp;
                tempCel = toCelsius(tempFahr);
                conditions = weather.weather[0].main;
                conditionid = weather.weather[0].id;
                icon = weatherIconFromID(conditionid);
                $('#location').html(city);
                $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
                $('#icon').html('<img src="' + icon + '">');
                $('#unit-btn-group').css('display', 'block');
            });
        }, function(error){ // will not work in chrome over http, must be https
            if (error.code == error.PERMISSION_DENIED){
                if (error.message.indexOf("Only secure origins are allowed") == 0) {
                    $('.alert').html('Geolocation not available over HTTP in Chrome. Here is the weather in Chicago!');
                } else {
                    $('.alert').html('Permission Denied! Understandable! Here is the weather in Chicago!');
                }
            }
            $('.alert').css('display', 'block');
            $('.pre-load').css('display', 'none');
            var apiURL = "//api.openweathermap.org/data/2.5/weather?q=Chicago,US&units=imperial&APPID=" + weatherKey;
            $.getJSON(apiURL, function(weather) {
                $('.pre-load i').css('display', 'none');
                city = weather.name;
                tempFahr = weather.main.temp;
                tempCel = toCelsius(tempFahr);
                conditions = weather.weather[0].main;
                conditionid = weather.weather[0].id;
                icon = weatherIconFromID(conditionid);
                $('#location').html(city);
                $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
                $('#icon').html('<img src="' + icon + '">');
                $('#unit-btn-group').css('display', 'block');
            });
        });
    } else  {
        /* geolocation IS NOT available */
        $('.alert').html('Geolocation not available in this browser/OS. Here is the weather in Chicago!');
        $('.alert').css('display', 'block');
        $('.pre-load').css('display', 'none');
        var apiURL = "//api.openweathermap.org/data/2.5/weather?q=Chicago,US&units=imperial&APPID=" + weatherKey;
        $.getJSON(apiURL, function(weather) {
            $('.pre-load i').css('display', 'none');
            city = weather.name;
            tempFahr = weather.main.temp;
            tempCel = toCelsius(tempFahr);
            conditions = weather.weather[0].main;
            conditionid = weather.weather[0].id;
            icon = weatherIconFromID(conditionid);
            $('#location').html(city);
            $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
            $('#icon').html('<img src="' + icon + '">');
            $('#unit-btn-group').css('display', 'block');
        });
    }
    $('#cel').on('click', function() {
        $('#conditions').html(conditions + ' | ' + parseInt(tempCel) + '&deg;C');
        $('#cel').attr('disabled', 'disabled');
        $('#fahr').removeAttr('disabled');
    });
    $('#fahr').on('click', function() {
        $('#conditions').html(conditions + ' | ' + parseInt(tempFahr) + '&deg;F');
        $('#cel').removeAttr('disabled');
        $('#fahr').attr('disabled', 'disabled');
    })
});

function toCelsius(degFahr) {
    return ((degFahr - 32) * 5) / 9;
}

// Icons by Adam Whitcroft: http://adamwhitcroft.com/climacons/
function weatherIconFromID(id) {
    var d = new Date();
    var h = d.getHours();
    if(h > 7 && h < 19) { // if time is between 7am and 7pm
        /* daytime icons */
        switch (id) {
            case 800: // clear
            case 951: // calm to breeze
            case 952:
            case 953:
            case 954:
            case 955:
            return 'svg/Sun.svg'
            break;
            case 801: // clouds
            case 802:
            case 803:
            case 804:
            return 'svg/Cloud-Sun.svg';
            break;
            case 300: // drizzle
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            return 'svg/Cloud-Drizzle-Sun.svg';
            break;
            case 500: // rain
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
            return 'svg/Cloud-Rain.svg';
            break;
            case 200: // thunderstorm
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
            case 960: // storm
            case 961: // violent storm
            case 962: // hurricane
            return 'svg/Cloud-Lightning.svg';
            break;
            case 600: // snow
            case 601:
            case 602:
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
            return 'svg/Cloud-Snow.svg';
            break;
            case 701: // atmosphere (mist, fog etc.)
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
            return 'svg/Cloud-Fog.svg';
            break;
            case 900: // tornado
            case 901: // tropical storm
            case 902: // hurricane
            return 'svg/Tornado.svg';
            break;
            case 903: // cold
            return 'svg/Thermometer-25.svg';
            break;
            case 904: // hot
            return 'svg/Thermometer-100.svg';
            break;
            case 906: // hail
            return 'svg/Cloud-Hail-Sun';
            break;
            case 905: // windy
            case 956: // strong breeze to severe gale
            case 957:
            case 958:
            case 959:
            return 'svg/Wind.svg';
            break;
            default:
            return 'svg/Sun.svg'
        }
    } else {
        /* nighttime icons */
        switch (currentConditions) {
            case 800: // clear
            case 951: // calm to breeze
            case 952:
            case 953:
            case 954:
            case 955:
            return 'svg/Moon.svg'
            break;
            case 801: // clouds
            case 802:
            case 803:
            case 804:
            return 'svg/Cloud-Moon.svg';
            break;
            case 300: // drizzle
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            return 'svg/Cloud-Drizzle-Moon.svg';
            break;
            case 500: // rain
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
            return 'svg/Cloud-Rain.svg';
            break;
            case 200: // thunderstorm
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
            case 960: // storm
            case 961: // violent storm
            case 962: // hurricane
            return 'svg/Cloud-Lightning.svg';
            break;
            case 600: // snow
            case 601:
            case 602:
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
            return 'svg/Cloud-Snow.svg';
            break;
            case 701: // atmosphere (mist, fog etc.)
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
            return 'svg/Cloud-Fog.svg';
            break;
            case 900: // tornado
            case 901: // tropical storm
            case 902: // hurricane
            return 'svg/Tornado.svg';
            break;
            case 903: // cold
            return 'svg/Thermometer-25.svg';
            break;
            case 904: // hot
            return 'svg/Thermometer-100.svg';
            break;
            case 906: // hail
            return 'svg/Cloud-Hail-Sun';
            break;
            case 905: // windy
            case 956: // strong breeze to severe gale
            case 957:
            case 958:
            case 959:
            return 'svg/Wind.svg';
            break;
            default:
            return 'svg/Moon.svg'
        }
    }
}
