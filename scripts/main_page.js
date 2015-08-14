/**
 * Created by Waldo on 25/06/2015.
 */
function load_main_page() {
    console.log("Main page rendering")


    $.ajax({
        type: 'GET',
        url: 'wall_stub.html',
        success: function (file_html) {
            // success
            $('.content').html(file_html)

        }
    });


    //window.location= "crowd_main.html"

    //remove loader spinner
    setTimeout(function(){
        $('#loader').hide();
    }, 400);
}