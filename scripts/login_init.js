/**
 * Created by Waldo on 21/07/2015.
 */

function gap_init() {
    var gaPlugin;

    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(successHandler, errorHandler, "UA-65301059-1", 10);
    window.gaPlugin = gaPlugin;
    function successHandler() {
        gaPlugin.trackEvent(function () {
        }, function () {
        }, "GAP Init", "Success", "event only", 1);
    };

    function errorHandler() {
        gaPlugin.trackEvent(function () {
        }, function () {
        }, "GAP Init", "Error", "event only", 1);
    };
};


function silent_fb_login(token) {
    upload_token('facebook', token)
};



function facebook_init() {
    var FB_LOGIN_URL = 'https://www.facebook.com/dialog/oauth';
    var oauthRedirectURL = 'https://www.facebook.com/connect/login_success.html';
    var fbAppId = '798638363585608';
    //var scope = ['email','public_profile','user_friends']|| '';
    ref = window.open(FB_LOGIN_URL + '?client_id=' + fbAppId + '&redirect_uri=' + oauthRedirectURL +'&response_type=token&display=popup&scope=email', '_blank', 'location=no');


    ref.addEventListener('loadstart', function (event) {
        var url = event.url;
        if (url.indexOf("access_token=") > 0) {
            ref.close();
            var hash = decodeURIComponent(url.substr(url.indexOf('#') + 1)),
                params = hash.split('&'),
                oauthData = {};
            params.forEach(function (param) {
                var splitter = param.split('=');
                oauthData[splitter[0]] = splitter[1];
            });
            var fbtoken = oauthData['access_token'];
            if (fbtoken) {
                window.localStorage['fbtoken'] = fbtoken;
                upload_token('facebook',fbtoken )
            } else {

            }
        }
    });
    //ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    //ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    //ref.addEventListener('exit', function(event) { alert(event.type); });
};

function upload_token(provider, token){
    data = {'token':token, 'provider':provider}
    //Ajax Call
    $.ajax
    ({
        type: "POST",
        url: "http://139.162.216.168/api/oauth_login",
        dataType: 'json',
        async: true,
        data: JSON.stringify(data),
        error: function (xhr, status, error) {
            //alert(xhr.responseText);
        },
        success: function (data) {
            //alert(data)
            if('name' in data){
                //alert("has name")
                window.sessionStorage['loggedIn'] = 'true';
                load_main_page()
            } else {
                //alert(data.message)
                facebook_init()
            }

        }
    })
}