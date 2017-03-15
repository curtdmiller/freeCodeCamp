var endpoint = "https://wind-bow.glitch.me/twitch-api/";
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","brunofin","comster404"];

$(document).ready(function(){
    $.each(channels, function(i, val){ // for every name in channels array
        $.ajax({
            url: endpoint + 'streams/' + channels[i], // first see if currently streaming
            dataType: 'jsonp',
        }).done(function(json){
            if (json.stream == null) { // if not streaming, get info from channel endpoint
                $.ajax({
                    url: endpoint + 'channels/' + channels[i],
                    dataType: 'jsonp'
                }).done(function(json){
                    if(json.status == 404){ // if not a channel
                        $('#error-list').append('<div class="alert alert-danger" role="alert">' + channels[i] + ' is not a Twitch.tv channel<div>');
                    } else {
                        var mediaStatus = 'Last broadcast: <a href="' + json.url + '">' + json.status + "</a>";
                        createMedia(false, json.logo, json.display_name, mediaStatus) // otherwise create a media object
                    }
                });
            } else { // is currently streaming, grab info
                var channel = json.stream.channel;
                var mediaStatus = '<a href=' + channel.url + '>' + channel.status + '</a>';
                createMedia(true, channel.logo, channel.display_name, mediaStatus);
            }
        });
    });
    $('#streamBox').on('change',function(){
        if ($('#streamBox').is(':checked')) {
            $('.active').css('display', 'block');
        } else {
            $('.active').css('display', 'none');
        }
    });
    $('#offlineBox').on('change',function(){
        if ($('#offlineBox').is(':checked')) {
            $('.offline').css('display', 'block');
        } else {
            $('.offline').css('display', 'none');
        }
    });
    $('#errorBox').on('change',function(){
        if ($('#errorBox').is(':checked')) {
            $('.alert').css('display', 'block');
        } else {
            $('.alert').css('display', 'none');
        }
    });
});

function createMedia(isStreaming, imgSrc, heading, status) {
    var row = document.getElementById('media-list');
    var panelDiv = document.createElement('div');
    var panelBody = document.createElement('div');
    var mediaDiv = document.createElement('div');
    var mediaLeft = document.createElement('div');
    var mediaBody = document.createElement('div');
    var img = document.createElement('img');
    var head = document.createElement('h4');
    var body = document.createElement('p');
    var label = document.createElement('span');

    panelDiv.classList = "panel panel-default";
    panelBody.className = "panel-body";
    mediaDiv.className = 'media';
    row.appendChild(panelDiv);
    panelDiv.append(panelBody);
    panelBody.append(mediaDiv);

    mediaLeft.className = 'media-left';
    img.className = 'media-object';
    img.src = imgSrc;
    mediaLeft.appendChild(img);

    mediaBody.className = 'media-body';
    head.className = 'media-heading';
    head.innerHTML = heading;
    if(isStreaming) {
        panelDiv.classList += ' active'
        label.classList = 'label label-success';
        label.innerHTML = 'Streaming'
    } else {
        panelDiv.classList += ' offline'
        label.classList = 'label label-danger';
        label.innerHTML = 'Offline'
    }
    body.appendChild(label);
    body.innerHTML += ' ' + status;
    mediaBody.appendChild(head);
    mediaBody.appendChild(body);

    mediaDiv.appendChild(mediaLeft);
    mediaDiv.appendChild(mediaBody);
}
