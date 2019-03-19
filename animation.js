
function animateWelcome() {

    $('#animation').fadeIn(2000);

    $('#animation').animate({ 
        top: "5%",
        fontSize: "100%",
        position: "static",
        }, 850, 'swing', function () { //declare function when animation is done
        fadeRestIn();
    });
};


function fadeRestIn(){
   
    $('#clearButton').fadeIn(1500);
    $('#mainsection').fadeIn(1500);
    $('#searchBar').fadeIn(1500);

}


$(document).ready(function () {
 // $('#flick').hide();
    $('#mainsection').hide();
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