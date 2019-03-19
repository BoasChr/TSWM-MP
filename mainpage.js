$(function() {
    var lat, long, cityName = "roses"; // Default search value if we don't find a city

    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    
    function success(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        var geoUrl = "https://geocode.xyz/" + lat + "," + long + "?json=1";

        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: geoUrl,
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                cityName = data.city;
    
                $.ajax('https://api.flickr.com/services/feeds/photos_public.gne', {
                    dataType: 'jsonp',
                    //The tag to search for is the id of the currently pressed city.
                    data: { "tags": cityName, "format": "json" },
                });
            }

        });
    }

    function fail(error) {
        console.warn(error.code + ': ' + error.message);
    }

});


//jsonFlickrFeed is a callback function that we get from the
//documentation from flickr.com
//it contains all the data that we want to access
function jsonFlickrFeed(json) {
        // Clear the 'gallery'
        $('#gallery').html('');

        if (json.items.length == 0) {
            $("#results").text("0 results found.");

            $("#searchList li:first").addClass("resultless");
        }
        else $("#results").text("");

        //for each item returned from json.items (from jsonFlickrFeed)
        $.each(json.items, function (i, item) {
            //find the media item and append it to the element called "gallery" in the html
            $("<img />").attr("src", item.media.m).appendTo("#gallery");

            //when there are 20 images stop
            if (i == 20) return false;
            
        });
};

// When pressing on list element we will search for it using its class
// Using document so we are able to find dynamically added items --
// -- define what we are looking for after event
$(document).on('click', "li", function (e) {

    if ($(this).hasClass("resultless")){
        $("#results").text("Unable to find results for '" + $(this).attr('id') + "'.");
        return false;
    }

    //The $.ajax() method with the form $.ajax(url [,settings]) (slide 29)
    //This method returns the URL to jsonFlickrFeed in the form of
    //https://api.flickr.com/services/feeds/photos_public.gne?tags=* WHAT YOU TYPED *s&format=json    
    $.ajax('https://api.flickr.com/services/feeds/photos_public.gne',
    
        {
            dataType: 'jsonp',
            //The tag to search for is what id the user pressed
            data: { "tags": e.target.id, "format": "json" },
        }
    );
    $("li").removeClass("current");
    $(this).addClass("current");
});


//Function called by the clear history button in mainpage.html
function clearHistory(){
        if(searches < 1){
        alert("There are no searches to delete");
        return;
    }
    
    //Remove all items from the li object, empty the gallery, set the label
    $("li").remove();
    searchLabel = "History cleared";
    searches = 0;
    $('#history').innerHTML = searchLabel;
    $('#gallery').html('');
}