define(function () {
    return function () {

        $("#form-authorization").submit(function ( e ) {
            //console.log($(this).serializeArray());
            
            var email = $("#email").val();
            var password = $("#password").val();

            if ( email == '' || password == '' ) {
                alert("Please Fill All Fields");
            } else {

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "http://airpark-kborykina.rhcloud.com/backend/login.php",//"http://localhost/Parking/www/backend/index/login",//
                    data: {
                        action: 'login',
                        email: email,
                        password: password
                    },
                    success: function(data){
                        if ( data.statusCode === 200 ) {
                            console.log(data.userName);
                            window.location.href = '#/home';
                        } else if ( data.statusCode === 422 ) {
                            alert("Username/Password is incorrect");
                        }
                    },
                    error: function(){
                         alert("Username/Password is incorrect");
                    }
                });

            }
            return false;
        });

    };
});
