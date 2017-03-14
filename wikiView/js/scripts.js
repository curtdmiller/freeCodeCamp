$(document).ready(function(){
    $('#searchInput').on('focusin', function() {
        $('.btn-submit').css('background-color', '#91bbff')
            .css('color', '#fff')
            .css('border-color', '#91bbff');
        $('#searchInput').css('border-color', '#91bbff');
    })
    $('#searchInput').on('focusout', function() {
        $('.btn-submit').css('background-color', 'white')
            .css('color', '#777')
            .css('border-color', '#555');
        $('#searchInput').css('border-color', '#555');
    })

    $('form').submit(function (event) {
        var search = $('#searchInput').val();
        var ajaxURL = constructSearchURL(search);
        $.ajax({
            url: ajaxURL,
            dataType: 'json',
            type: 'POST',
            headers: { 'Api-User-Agent': 'freeCodeCampWikiView/1.0' },
        }).done(function(data){
            // console.log(data[1]);
            $('form').css('margin-top', '0');
            $('#results h4').html('Results for "' + data[0] + '"');
            $('#results .list-group').html('');
            for (var i = 0, length = data[1].length; i < length ; i++) {
                $('#results .list-group').append('<a href="' + data[3][i] + '" class="list-group-item"><h5>' + data[1][i] + '</h5><p>' + data[2][i] + '</p></a>');
            }
        });
        event.preventDefault();
    })
})

function constructSearchURL(searchString) {
    var endpoint = "https://en.wikipedia.org/w/api.php";
    var url = endpoint + '?action=opensearch&format=json&origin=*&search=' + searchString + '&namespace=0&limit=10';
    return url;
}
