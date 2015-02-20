(function () {

    var bind = function ( handler ) {
        for ( var id in handler ) {
            if ( "template" in handler[id] ) {
                document.getElementById(id).innerHTML = handler[id].template;
            }
            if ( "controller" in handler[id] ) {
                handler[id].controller();
            }
        }
    };

    var unbind = function ( currentState, routes ) {
        for ( var i = 0; i < routes.length; i++ ) {
            if ( currentState === routes[i].name ) {
                //document.getElementById(id).innerHTML
                for ( var id in routes[i].handler ) {
                    document.getElementById(id).innerHTML = '';
                }
            }
        }
    };

    this.Router = {

        routes: [],
        currentState: undefined,

        add: function ( name, handler ) {
            this.routes.push({
                name: name,
                handler: handler
            });
            return this;
        },

        to: function ( name ) {
            history.pushState(null, null, '#' + name);
        },

        get: function () {
            return window.location.hash.replace(/^#/, '');
        },

        listen: function () {
            var self = this;

            clearInterval(this.interval);
            this.interval = setInterval(function () {

                if ( self.currentState !== self.get() ) {
                    unbind(self.currentState, self.routes);
                    self.currentState = self.get();
                    for ( var i = 0; i < self.routes.length; i++ ) {
                        if ( self.currentState === self.routes[i].name ) {
                            bind(self.routes[i].handler);
                        }
                    }
                }
            }, 50);

            return this;
        },

        config: function () {
            return this.listen();
        }

    };
}());