define(function () {
    return function () {

            jQuery(document).ready(function(){ 
                
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "http://airpark-kborykina.rhcloud.com/backend/check_user_session.php",
                    success: function(user){
                        document.getElementById("UserName").innerHTML = "Hello, " + user.userName + "! Look nice :)";
                        if (user.userName == 'Unknown')
                        {
                            alert("Some mistake :( Please, try to login one more time ." );
                            window.location.href = '#/main';
                        }
                    },
                    error: function(){
                          alert("Login failed :( Please, try to login one more time ." );
                           window.location.href = '#/main';
                    }
                });
                
            });

        $("#logout").click(function(){

           $.ajax({
                type: "POST",
                url: "http://airpark-kborykina.rhcloud.com/backend/logout.php", 
                data: { 
                    action: 'logout', 
                    result: 'nothing'
                }
            }).done(function(){
                window.location.href = '#/main';
            }).fail(function(){
                alert("hmm.. Something went wrong");
                window.location.href = '#/main';
            });
            return false;
        });            
                        
    };
});
