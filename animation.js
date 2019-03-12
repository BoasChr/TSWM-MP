


function animateWelcome() {
    $('#welcome').fadeIn(1500);
    $('#welcome').fadeOut(1500);

    $('#flick').fadeIn(3000);
    
}

function animateFlick() {
}



$(document).ready(function() {
    $('#welcome').hide();
    $('#flick').hide();

    animateWelcome();
});



