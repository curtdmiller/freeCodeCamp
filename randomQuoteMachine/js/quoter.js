var body = document.getElementsByTagName("body")[0];
var colors = ['LightSteelBlue', 'LightSeaGreen', 'goldenrod', 'magenta', 'orchid', 'palevioletred'];

function randBGColor() {
    body.style.backgroundColor = colors[Math.floor(Math.random() * (colors.length - 1))];
}
