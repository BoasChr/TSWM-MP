

var elMap = document.getElementById('loc');
var msg = 'Sorry, we cant find you.';

if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
    elMap.textContent = 'Checking Location...';
} else {
    elMap.textContent = msg;
}

function success(position) {
    msg = '<h3>Longitude:<br>';
    msg += position.coords.longitude + '</h3>';
    msg += '<h3>Latitude:<br>';
    msg += position.coords.latitude + '</h3>';
    elMap.innerHTML = msg;
}

function fail(error) {
    elMap.textContent = error.message;
    console.warn(error.code + ': ' + error.message);
}