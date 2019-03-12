
function animateWelcome() {

    $('#flick').fadeIn(3000);

    $('#flick').animate({ lineHeight: 100, }, 750, 'swing', function () {
        //declare function to take you to mainpage
        redirect();
    });
};


function redirect(){
    url = "mainpage.html";
    $(location).attr("href", url);
}


$(document).ready(function () {
    $('#flick').hide();

    animateWelcome();
});


