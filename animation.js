
function animateWelcome() {

    $('#animation').fadeIn(0);

    $('#animation').animate({ 
        position: "absolute",
        paddingTop: "0",
        fontSize: "100%",
        position: "static",
        top: "2%",
        
        }, 850, 'swing', function () { //declare function when animation is done
        fadeRestIn();
    });
};


function fadeRestIn(){
   
    $('#clearButton').fadeIn(1500);
    $('#mainSection').fadeIn(1500);
    $('#searchBar').fadeIn(1500);

}


$(document).ready(function () {
//  $('#flick').hide();
    $('#mainSection').hide();
    $('#searchBar').hide();
    $('#clearButton').hide();
    $('#animation').hide();
    
    animateWelcome();
});


/* CSS Animation style
#varANIMATION {
  position: static;
  text-align: center;
  width: 100%;
  height: 10%;
}*/