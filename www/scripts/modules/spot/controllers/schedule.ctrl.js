define(function ( require ) {
    return function () {
       
       jQuery(document).ready(function () {
            
           $.ajax({
                    dataType: "json",
                    url: "http://airpark-kborykina.rhcloud.com/backend/show_all_users_spots.php",
                    success: function(data){
                        var selectElement = document.getElementById("select_spot_field");
                        var row;
                        console.log(data);
                        for( row in data){
                            var option = document.createElement("option");
                            option.text = data[row].address;
                            option.id = data[row].id;
                            console.log(data[row]);
                            selectElement.add(option);
                        }
                        loadTable( data[0].id );
                    },
                    error: function(){
                         alert("Couldn't download schedelue of spots");
                    }
                });
       });
        
        
        //var e = document.getElementById("select_spot_field");
        //   var spot_id = e.options[e.selectedIndex].id;  
        //   loadTable( spot_id );
        
        $("#select_spot_field").change(function (e) {
           var e = document.getElementById("select_spot_field");
           var spot_id = e.options[e.selectedIndex].id;  
           loadTable( spot_id );
        });
        function loadTable( spot_id ){
            $('tbody tr').remove();
            $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://airpark-kborykina.rhcloud.com/backend/load_spotstime.php",
                        data: {
                            spot_id: spot_id,
                            day: ''
                        },
                        success: function(data){
                            var row;
                            console.log(data);
                            var tmpl = _.template(require('text!../templates/rowSchedule.html'));
                            for( row in data){
                                $('tbody').append(tmpl({ 
                                    spotstime_id : data[row].id,
                                    day: data[row].dayOfWeek,
                                    initialTime: data[row].initialTime,
                                    finalTime: data[row].finalTime
                                }) );
                            }
                        },
                        error: function(){
                             console.log("Unfortunately, spots table was not loaded !");
                        }
                    });
        }
        
        
        $("#add_more_schedelue").click(function (e) {
            $("#new_schedule").show();            
        });
        
        
        $("#save_new_schedule").click(function (e) {
                console.log('123');
                var day = $('#day_for_new_schedule').val();
                var initialTime = $('#initial_time_for_new_schedule').val();
                var finalTime = $('#final_time_for_new_schedule').val();
                var e = document.getElementById("select_spot_field");
                var spot_id = e.options[e.selectedIndex].id;    
                if (spot_id == ''){
                    alert('Please, choose spot first');
                }
                if ( day != '' && initialTime != '' && finalTime != '' && spot_id != '') {
                    var spotstime_id = 1;
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://airpark-kborykina.rhcloud.com/backend/add_new_spotstime.php",
                        data: {
                            action: 'add_new_spotstime',
                            spot_id: spot_id,
                            day: day,
                            initialTime: initialTime,
                            finalTime: finalTime
                        },
                        success: function(data){
                            spotstime_id = data;
                            alert("New schedule was saved !");
                            var tmpl = _.template(require('text!../templates/rowSchedule.html'));
                            $('tbody').append(tmpl({ 
                                spotstime_id : spotstime_id.toString(),
                                day: day,
                                initialTime: initialTime,
                                finalTime: finalTime
                            }) );
                        },
                        error: function(){
                             alert("New schedule was not saved !");
                        }
                    });
                    
                    
                    
                    $("#new_schedule").hide(); 
                }
        });
        
        $("#close_new_schedule").click(function (e) {
            $("#new_schedule").hide(); 
        });
        $("#close_edit_schedule").click(function (e) {
            $("#edit_schedule").hide(); 
        });
        
        
        $("tbody").on( "click", ".remove-spotstime", function (e) {
            var spotstime_id = $(this).data('id');  
            
            $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://airpark-kborykina.rhcloud.com/backend/remove_spotstime.php",
                        data: {
                            spotstime_id: spotstime_id,
                        },
                        success: function(data){
                        },
                        error: function(){
                             alert("schedule was not removed !");
                        }
                    });
            
            
            var e = document.getElementById("select_spot_field");
            var spot_id = e.options[e.selectedIndex].id;  
            loadTable( spot_id );
        });
        
        $("tbody").on( "click", ".edit-spotstime", function (e) {
            var e = document.getElementById("select_spot_field");
            var spot_id = e.options[e.selectedIndex].id; 
            var spotstime_id = $(this).data('id');
            $("#save_edit_schedule").val(spotstime_id);
             $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://airpark-kborykina.rhcloud.com/backend/load_spotstime.php",
                        data: {
                            spot_id: spot_id,
                        },
                        success: function(data){
                            var row;
                            for( row in data){
                                if  (data[row].id == spotstime_id){
                                         $('#edit_day_of_week').val(data[row].dayOfWeek);
                                         $('#edit_initial_time').val(data[row].initialTime);
                                         $('#edit_final_time').val(data[row].finalTime);
                                }
                            }
                        },
                        error: function(){
                             console.log("Unfortunately, spotstime was not loaded !");
                        }
                    });

            $("#edit_schedule").show(); 
        });
        
        $("#save_edit_schedule").click(function (e) {
                var id = $("#save_edit_schedule").val();
                var day = $('#edit_day_of_week').val();
                var initialTime = $('#edit_initial_time').val();
                var finalTime = $('#edit_final_time').val();
                var e = document.getElementById("select_spot_field");
                var spot_id = e.options[e.selectedIndex].id;    
                if (spot_id == ''){
                    alert('Please, choose spot first');
                }
                if ( day != '' && initialTime != '' && finalTime != '' && spot_id != '') {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://airpark-kborykina.rhcloud.com/backend/edit_spotstime.php",
                        data: {
                            id: id,
                            day: day,
                            initialTime: initialTime,
                            finalTime: finalTime
                        },
                        success: function(data){
                            var e = document.getElementById("select_spot_field");
                            var spot_id = e.options[e.selectedIndex].id;  
                            loadTable( spot_id );
                        },
                        error: function(){
                             alert("Updated schedule was not saved !");
                        }
                    }); 
                }
            $("#edit_schedule").hide(); 
        });
                        
    };
});