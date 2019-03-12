
//jsonFlickrFeed is a callback function that we get from the
//documentation from flickr.com
//it contains all the data that we want to access
//It can be found in the documentation of flickr
//Check:
//https://api.flickr.com/services/feeds/photos_public.gne?tags=dogss&format=json

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
            //findt the media item and append it to the element
            //called "container" in your html
            $("<img />").attr("src", item.media.m).appendTo("#gallery");

            //when there is 10 images stop
            if (i == 10) return false;
            
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
    //https://api.flickr.com/services/feeds/photos_public.gne?tags=*THE ID OF WHAT YOUR PRESSED*s&format=json
    $.ajax('https://api.flickr.com/services/feeds/photos_public.gne',
    
        {
            dataType: 'jsonp',
            //The tag to search for is the id of the currently pressed city.
            data: { "tags": e.target.id, "format": "json" },
        }
    );
    $("li").removeClass("current");
    $(this).addClass("current");
});