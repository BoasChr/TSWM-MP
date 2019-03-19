
function animateWelcome() {

    $('#animation').fadeIn(0);
    
    $('#animation').animate({ 
        position: "absolute",
        paddingTop: "0",
        fontSize: "100%",
        position: "static",
        top: "2%",
        
        }, 850, 'swing', function () { //callback function when animation is done
        fadeRestIn();
    });
};

//Callback function called at end of animation animate above
function fadeRestIn(){       
    $('#mainSection').fadeIn(1500);
    $('#searchBar').fadeIn(1500);
}

//When the DOM is loaded and ready hide everything and start animating
$(document).ready(function () {
    $('#mainSection').hide();
    $('#searchBar').hide();
    $('#clearButton').hide();
    $('#animation').hide();    
    animateWelcome();
});