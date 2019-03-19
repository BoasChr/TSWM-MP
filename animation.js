
function animateWelcome() {

    $('#flick').fadeIn(3000);

    $('#flick').animate({ paddingTop: 50, }, 850, 'swing', function () {
        //declare function to take you to mainpage
        fadeRestIn();
    });
};


function fadeRestIn(){
    
    $('#mainsection').fadeIn(3000);
    $('#searchBar').fadeIn(3000);
    $('#clearButton').fadeIn(3000);

}


$(document).ready(function () {
    $('#flick').hide();
    $('#mainsection').hide();
    $('#searchBar').hide();
    $('#clearButton').hide();
    
    animateWelcome();
});



