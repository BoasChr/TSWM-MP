
//jsonFlickrFeed is a callback function that we get from the
//documentation from flickr.com
//it contains all the data that we want to access
//It can be found in the documentation of flickr
//Check:
//https://api.flickr.com/services/feeds/photos_public.gne?tags=dogss&format=json

function jsonFlickrFeed(json) {

    //set the content of element with id "container" to empty
    $('#right').html('');

    //for each item returned from json.items (from jsonFlickrFeed)
    $.each(json.items, function (i, item) {
        //findt the media item and append it to the element
        //called "container" in your html
        $("<img />").attr("src", item.media.m).appendTo("#right");

        //when there is 10 images stop
        if (i == 9)
            return false;
    });

};

//When pressing on element with class "city"
$(".test").on('click', function (e) {

    $myList = $("li#searches");

    //The $.ajax() method with the form $.ajax(url [,settings]) (slide 29)
    //This method returns the URL to jsonFlickrFeed in the form of
    //https://api.flickr.com/services/feeds/photos_public.gne?tags=*THE ID OF WHAT YOUR PRESSED*s&format=json
    $.ajax('https://api.flickr.com/services/feeds/photos_public.gne',
    
        {
            dataType: 'jsonp',
            //The tag to search for is the id of the currently pressed city.
            data: { "tags": this.id, "format": "json" }
        }
    );
});