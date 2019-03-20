$(function() { // When site has loaded (document ready)
    var lat, long; // declare variables

    if (Modernizr.geolocation) { // Check if the browser supports geolocation (It should cause we included the Modernizr script in line 86 in mainpage.html)
        navigator.geolocation.getCurrentPosition(success, fail); // Attempt to get geolocation (fail is e.g. if the user says no to request)
    }
    
    function success(position) { // If we were succesfull
        // save coordinates into respective variable
        long = position.coords.longitude;
        lat = position.coords.latitude;

        // URL with longitude and lattiude variables saved in a variable. We set json = 1, to see the data in json format
        var geoUrl = "https://geocode.xyz/" + lat + "," + long + "?json=1";

        // Ajax request of Json data. We use the GET method, jsonp datatype, the URL defined above, set it to async so the rest of the page loads and eliminate special characters
        var geoAjax = $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: geoUrl, 
            async: true,
            contentType: "application/json; charset=utf-8", //Only returns characters in UTF-8 format
            

            success: function (response) { // If we get a successful response back, store response into 'data'. We can access the data using response.
            var region = response.region; // Data returned is: "Ålborg Kommune, North Denmark". 
            var city = region.substr(0, region.indexOf(' ')); // Here we remove every character after the first ' '. Only the city name remains and we save it in the city variable
                
                $('#results').html('Default search: ' + city); // Using jQuery to insert the cityname into the "results" element in mainpage.html
        
                $.ajax('https://api.flickr.com/services/feeds/photos_public.gne', { // start a Flickr Ajax request ...
                    dataType: 'jsonp',
                    // ... using the 'city' attribute from the received data
                    data: { "tags": city, "format": "json" },
                });
            }
        });

        geoAjax.fail(function() {
            alert("Geolocation Ajax failed.");
        });
    }

    function fail() { // Failed to get Geolocation - not really of importance to us'
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