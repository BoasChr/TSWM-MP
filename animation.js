
function animateWelcome() {

    $('#flick').fadeIn(3000);

    $('#flick').animate({ lineHeight: 100, }, 750, 'swing', function () {
        //declare function to take you to mainpage
        fadeRestIn();
    });
};


function fareRestIn(){
    
    $('#mainsection').hide();
    $('#top').hide();

}


$(document).ready(function () {
    $('#flick').hide();
    $('#mainsection').hide();
    $('#top').hide();
    
    animateWelcome();
});



