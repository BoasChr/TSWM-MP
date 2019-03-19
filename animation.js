
function animateWelcome() {

    $('#flick').fadeIn(3000);

    $('#flick').animate({ lineHeight: 100, }, 750, 'swing', function () {
        //declare function to take you to mainpage
        fadeRestIn();
    });
};


function fadeRestIn(){
    
    $('#mainsection').fadeIn(3000);
    $('#top').fadeIn(3000);

}


$(document).ready(function () {
    $('#flick').hide();
    $('#mainsection').hide();
    $('#top').hide();
    
    animateWelcome();
});



