$(function() { // When site has loaded (document ready)
    var lat, long; // declare variables

    if (Modernizr.geolocation) { // If browser supports geolocation
        navigator.geolocation.getCurrentPosition(success, fail); // Attempt to get geolocation
    }
    
    function success(position) { // If we were succesfull
        // save coordinates into respective variable
        long = position.coords.longitude;
        lat = position.coords.latitude;

        // Custom url to ping, using coordinates
        var geoUrl = "https://geocode.xyz/" + lat + "," + long + "?json=1";

        // Ajax request of Json data
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: geoUrl, 
            async: true,
            contentType: "application/json; charset=utf-8",
            
           
            success: function (data) { // If successful, store response into 'data'
    
                $.ajax('https://api.flickr.com/services/feeds/photos_public.gne', { // start a Flickr Ajax request ...
                    dataType: 'jsonp',
                    // ... using the 'city' attribute from the received data
                    data: { "tags": data.city, "format": "json" },
                });
            }
        });
    }

    function fail() { // Failed to get Geolocation - not really of importance to us
    }
});


//jsonFlickrFeed is a callback function that we get from the flickr.com documentation 
// it contains all the data that we want to access
function jsonFlickrFeed(json) {
        // Clear the 'gallery'
        $('#gallery').html('');

        if (json.items.length == 0) { // If we didn't receive any results from the request
            $("#results").text("0 results found."); // Feedback for the user

            $("#searchList li:first").addClass("resultless"); // Add the search anyway but with class 'resultless'
        }
        else $("#results").text(""); // Received some results, just show pictures not text.

        // For each item returned from json.items
        $.each(json.items, function (i, item) {
            // find the media item (contains picture url) and append it to the element called "gallery"
            $("<img />").attr("src", item.media.m).appendTo("#gallery");

            // when there are 20 images stop
            if (i == 20) return false;
            
        });
};

// When pressing on list element we will search for it using its ID
// Using document so we are able to find dynamically added items --
// -- define what we are looking for after event
$(document).on('click', "li", function (e) {

    if ($(this).hasClass("resultless")){
        $("#results").text("Unable to find results for '" + $(this).attr('id') + "'.");
        return false;
    }

    //The $.ajax() method with the form $.ajax(url [,settings]) (slide 29)
    //This method returns the URL to jsonFlickrFeed in the form of
    //https://api.flickr.com/services/feeds/photos_public.gne?tags=*ID OF WHAT YOU CLICKED*s&format=json    
    $.ajax('https://api.flickr.com/services/feeds/photos_public.gne',
    
        {
            dataType: 'jsonp',
            //The tag to search for is the ID of the element the user pressed
            data: { "tags": e.target.id, "format": "json" },
        }
    );
    $("li").removeClass("current");
    $(this).addClass("current");
});


//Function called by the clear history button in mainpage.html
function clearHistory(){
        if(searches < 1){
        alert("There are no searches to delete.");
        return;
    }
    
    // Remove all items of type li object, empty the gallery, set the label
    $("li").remove();
    searchLabel = "History cleared";
    searches = 0;
    $('#history').innerHTML = searchLabel;
    $('#gallery').html('');
}