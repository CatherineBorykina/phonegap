define(function (require) {
    "use strict";

    /*var sUrl = window.location.href.indexOf('localhost') == -1? 
	                        "http://api.novocin.webfactional.com": 
	                                "http://localhost/api/public";
	    require.config({
	        urlArgs: "bust="  + Math.floor(Math.random()*1000)
	    });
	    jQuery.ajaxPrefilter( function( options, originalOptions, jgXHR) {
	        options.url = sUrl + options.url;
	        options.crossDomain = options.crossDomain || true;
	        options.xhrFields = options.xhrFields || {withCredentials:true};
    });*/
    
    
    return {
        ContentCtrl: require('./controllers/content.ctrl'),
        LoginCtrl: require("./controllers/login.ctrl"),
        SignUpCtrl: require("./controllers/signup.ctrl"),
        SearchSpotCtrl: require("./controllers/searchspot.ctrl"),
        HeaderCtrl: require("./controllers/header.ctrl")
    };
});