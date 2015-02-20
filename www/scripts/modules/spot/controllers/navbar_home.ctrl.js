define(function () {
    return function () {

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
