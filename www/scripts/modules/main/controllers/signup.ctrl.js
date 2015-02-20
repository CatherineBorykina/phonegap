define(function () {
    return function () {

      $("#form1").submit(function ( e ) {
            //console.log($(this).serializeArray());
            
            var name = $("#InputUserName").val();
            var email = $("#InputEmail").val();
            var password = $("#InputPassword").val();

            if (name == ''| email == '' || password == '' ) {
                alert("Please Fill All Fields");
            } else {

                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "http://airpark-kborykina.rhcloud.com/backend/sign-up.php",//"http://localhost/Parking/www/backend/index/login",//
                    data: {
                        action: 'login',
                        submit: 'submit',
                        name: name,
                        email: email,
                        password: password
                    },
                    success: function(data){
                        if(data.statusCode == 422)
                      alert("You are register now");
                        else if (data.statusCode == 200)
                        {
                            alert ("Verification link was sent to your email. Please, confirm it.");
                        }else if (data.statusCode == 402){
                        	alert ("You already sign in" );
                        	window.location.href = '#/home';
                        }

                    },
                    error: function(){
                         alert("something happen");
                    }
                });

            }
            return false;
        });
 

    };
});
