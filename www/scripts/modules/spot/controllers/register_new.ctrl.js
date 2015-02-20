define(function () {
    return function () {
       <!-- MAP INITIALIZATION -->
        var myMap;
        var marker;
        var contentString = 'Your spot is here!';
        var infowindow;
        jQuery(document).ready(function () {
            var mapCenter = new google.maps.LatLng(43.4304343, -80.4763151, 12); //Google map Coordinates - initial is the Kitchener city
            //var a =  new changeLocation();
            map_initialize(); // load map
            function map_initialize() {
                //Google map option
                var googleMapOptions = {
                    center: mapCenter, // map center
                    zoom: 12, //zoom level, 0 = earth view to higher value
                    panControl: true, //enable pan Control
                    zoomControl: true, //enable zoom control
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL //zoom control size
                    },
                    scaleControl: true, // enable scale control
                    mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
                };
                myMap = new google.maps.Map(document.getElementById("google_map"), googleMapOptions);
            }

            var new_spot_form = document.getElementById("register_new_spot");
            new_spot_form.addEventListener("blur", changeLocation, true);

             function changeLocation() {
                //$( "#register_new_spot" ).focusout(function() {
                var address = document.getElementById('address_field').value;
                var city = document.getElementById('city_field').value;
                var province = document.getElementById('province_field').value;
                var postalCode = document.getElementById('postalCode_field').value;
                var full_address=address + " " + city + " " + province + " " + postalCode;
                //address=str_replace ( " ", "+" , $address);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': full_address
                }, function (results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {  
                        latitude2 = results[0].geometry.location.lat();
                        longitude2 = results[0].geometry.location.lng();
                        var mapCenter_ = new google.maps.LatLng(latitude2, longitude2); //Google map Coordinates
                        myMap.setCenter(mapCenter_);
                        if (!marker)
                            marker = new google.maps.Marker({
                                map: myMap,
                                position: new google.maps.LatLng(latitude2, longitude2),
                                animation: google.maps.Animation.BOUNCE,
                                icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                                title: "Your spot is here"
                        });
                        else{
                            marker.setPosition(new google.maps.LatLng(latitude2, longitude2));  
                        }         
                        infowindow = new google.maps.InfoWindow({
                                content: contentString
                                });
                        infowindow.open(myMap, marker);
                        infowindow.close();
                    } //when status is OK
                }); // geocode
                return false;
            }


        });

        $("#register_new_spot").submit(function(){
            var address = $("#address_field").val();
            var city=$("#city_field").val();
            var province=$("#province_field").val();
            var postalCode=$("#postalCode_field").val();
            var price=$("#price_field").val();
            var condition=$("#condition_field").val();
            // Returns successful data submission message when the entered information is stored in database.
            var dataString = '&Address='+ address + 'City='+ city + 'Province=' + province + 'PostalCode' + postalCode + 'Price' + price + 'Condition' + condition;
            if(address==''|| city=='' || province=='' || postalCode=='' || price=='' || condition=='')
             {
                   alert("Please Fill All Fields");
             }
                else
            {
                                $.ajax({
                                    type: "POST",
                                    url: "http://airpark-kborykina.rhcloud.com/backend/register_new_spot.php", //  TODO  :  CHECK ACTION!!!
                                    data: { action: 'register_new_spot' , 
                                            Address:address , City: city, 
                                            Province: province, 
                                            PostalCode: postalCode, 
                                            Price: price,
                                            Condition: condition, 
                                            latitude: latitude2,
                                            longtitude: longitude2,
                                            result: 'nothing'},
                                    success: function(aParameter){  
                                        //alert(JSON.stringify(aParameter));
                                        var returnedData = JSON.parse(aParameter);
                                    if (returnedData.result == 'already_registered'){
                                        alert ('Current spot was already registered');
                                       // window.location.href = 'http://localhost/Parking/frontend/have_a_spot.html';
                                        $('#success').html("<div class='alert alert-danger'>");
                                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                            .append("</button>");
                                        $('#success > .alert-danger').append("<strong>You already register this spot");
                                        $('#success > .alert-danger').append('</div>');
                                        
                                    }else if (returnedData.result == 'session_is_not_valid'){
                                        alert ("Current session is not valid anymore. Please, login again");
                                        window.location.href = '#/main';
                                    }else if (returnedData.result == 'success_registration') {
 
                                        $('#success').html("<div class='alert alert-success center-block'>");
                                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                            .append("</button>");
                                        $('#success > .alert-success')
                                            .append("<strong> Your spot succesfully registered </strong>");
                                        $('#success > .alert-success')
                                            .append('</div>');
                                        //window.location.href = 'http://localhost/Parking/frontend/have_a_spot.html';
                                        alert ('Your spot succesfully registered');
                                    }

                                    },
                                    error: function(){
                                        // server doesn't return anything
                                        alert ("hmm.. Something went wrong");
                                        window.location.href = '#/main';
                                    }
                                    });

                                    }
            return false;
        });

                        
    };
});
