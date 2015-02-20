define(function ( require ) {

    require("router");
    require("jquery");
    require("underscore");
    require("bootstrap");

    /**
     * RequireJS modules
     */
    var App =  {
        Main: require("App.Main"),
        Home: require("App.Home"),
        Spot: require("App.Spot")
    };

    $(function () {

        Router
            .config()
            .add('/main', {
                header: {
                    controller: App.Main.HeaderCtrl,
                    template: require("text!./modules/main/templates/header.html")
                },
                navbar: {
                    controller: App.Main.LoginCtrl,
                    template: require("text!./modules/main/templates/navbarLogin.html")
                },
                main: {
                    controller: App.Main.ContentCtrl,
                    template: require("text!./modules/main/templates/content.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/main/sign-up', {
                header: {
                    controller: App.Main.SignUpCtrl,
                    template: require("text!./modules/main/templates/signUp.html")
                },
                navbar: {
                    controller: App.Main.LoginCtrl,
                    template: require("text!./modules/main/templates/navbarLogin.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/main/search-spot', {
                header: {
                    controller: App.Main.SearchSpotCtrl,
                    template: require("text!./modules/main/templates/searchSpot.html")
                },
                navbar: {
                    controller: App.Main.LoginCtrl,
                    template: require("text!./modules/main/templates/navbarLogin.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/home', {
                navbar: {
                    controller: App.Home.HomeCtrl,
                    template: require("text!./modules/home/templates/navbarHome.html")
                },
                header: {
                    controller: App.Home.ContentCtrl,
                    template: require("text!./modules/home/templates/content.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
           /* .add('/i-have-a-spot', {
                navbar: {
                    controller: App.Home.HomeCtrl,
                    template: require("text!./modules/home/templates/navbarHome.html")
                },
                header: {
                    template: require("text!./modules/spot/templates/registerNewSpot.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })*/
            .add('/i-have-a-spot/register', {
                navbar: {
                    controller: App.Home.HomeCtrl,
                    template: require("text!./modules/home/templates/navbarHome.html")
                },
                header: {
                    controller: App.Spot.RegisterNewSpotCtrl,
                    template: require("text!./modules/spot/templates/registerNewSpot.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/i-have-a-spot/schedule', {
                navbar: {
                    controller: App.Home.HomeCtrl,
                    template: require("text!./modules/home/templates/navbarHome.html")
                },
                header: {
                    controller: App.Spot.ScheduleCtrl,
                    template: require("text!./modules/spot/templates/schedelueSpot.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/i-need-a-spot', {
                navbar: {
                    controller: App.Home.HomeCtrl,
                    template: require("text!./modules/home/templates/navbarHome.html")
                },
                header: {
                    controller: App.Spot.NeedSpotCtrl,
                    template: require("text!./modules/spot/templates/needSpot.html")
                },
                footer: {
                    template: require("text!./modules/main/templates/footer.html")
                }
            })
            .add('/contact', {})
            .add('/about', {});

    });
});