requirejs.config({
    baseUrl: './scripts',
    paths: {
        text: 'vendors/requirejs-text/text',
        jquery: "vendors/jquery/jquery-1.11.0",
        bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        history: "//cdnjs.cloudflare.com/ajax/libs/history.js/1.8/bundled-uncompressed/html4+html5/jquery.history",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
        router: "vendors/router/router"
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: {
            "deps": ['jquery']
        }
    },
    packages: [
        {
            name: 'App.Main',
            location: 'modules/main'
        },
        {
            name: 'App.Home',
            location: 'modules/home'
        },
        {
            name: 'App.Spot',
            location: 'modules/spot'
        }
    ],
    deps: ['index']
});