function init(){
    var mapOptions = {
        center: new google.maps.LatLng(57.94897, 9.923799),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        Zoom: 16
    };
    var venueMap;
    venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function loadScript(){
    var script = document.createElement('script');
    script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
    document.body.appendChild(script);
}

window.onload = loadScript;