/**
 * Created by Waldo on 25/06/2015.
 */
function load_main_page() {
    console.log("Main page rendering")
    window.location = 'home.html'
    /*
    if ( $(".all-elements").length ) {
        $.ajax({
            type: 'GET',
            url: 'wall_stub.html',
            success: function (file_html) {
                // success
                $('.all-elements').html(file_html)

            }
        });
    } else {
        window.location = 'home.html'
    }

    //remove loader spinner
    setTimeout(function(){
        $('#loader').hide();
    }, 400);
    */
}