define(function () {
    return function () {

        var myMap;
        var marker;
        var contentString = 'You are here!';
        var infowindow;
        jQuery(document).ready(function () {
            var mapCenter = new google.maps.LatLng(43.4304343, -80.4763151, 12); //Google map Coordinates - initial is the Kitchener city
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
        }); 
        

        $('#distance').on("change mousemove", function() {
            $('#value_of_distance').html($('#distance').val() + ' km' );
        });
        
        $('#find_spot_form').submit(function ( e ) {
                //google.maps.event.trigger(map, 'resize');
                //var latitude; 
                //var longitude;
                var mapCenter = new google.maps.LatLng(43.4304343, -80.4763151, 12); //Google map Coordinates - initial is the Kitchener city
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
                     var distance = $('#distance').val() * 1000;
                     var day = $('#day_of_week').val(); 
                     var circle = new google.maps.Circle({
                      map: myMap,
                      radius: distance,    // 10 miles in metres
                      fillColor: '#FFAFAF',
                      fillOpacity: 0.2,
                      strokeColor: "#0B7A9B", 
                      strokeOpacity: 0.4 
                    });
            
                /***********Find your location ***********/
                var full_address=$("#address").val();
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': full_address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {  
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();
                        var mapCenter_ = new google.maps.LatLng(latitude, longitude); //Google map Coordinates
                        myMap.setCenter(mapCenter_);
                        //if (!marker){
                              var marker = new google.maps.Marker({
                                    map: myMap,
                                    position: new google.maps.LatLng(latitude, longitude),
                                    animation: google.maps.Animation.BOUNCE,
                                    icon: 'images/current_location_mark.png',
                                    title: "You are here!"
                            });
                        //}
                        //else{
                        //    marker.setPosition(new google.maps.LatLng(latitude, longitude));  
                        //}    

                        /*************Find all spots nearby**************/

                        circle.bindTo('center', marker, 'position');
                        size = 0;
                         if ( day != '' && distance != '') {
                                $.ajax({
                                    type: "POST",
                                    dataType: "json",
                                    url: "http://airpark-kborykina.rhcloud.com/backend/find_spots.php",
                                    data: {
                                        day: day,
                                        distance: distance,
                                        lat: latitude,
                                        lon: longitude
                                    },
                                    success: function(data){
                                        console.log(data);
                                        var row;
                                        /*************Show all spots nearby on the map**********/
                                  /*      var markers = [];
                                        var infowindows = []; 
                                        var contents = [];
                                        for( row in data){
                                            markers[row] = new google.maps.Marker({
                                                    map: myMap,
                                                    position: new google.maps.LatLng(data[row].lat, data[row].lng),
                                                    icon: 'images/location_mark.png',
                                                    title: "Available spot!",
                                                    index: row
                                                });
                                            size++;
                                        }

                                    var key;
                                    contents[i] = '<br>';

                                    for( key in parameter){
                                        contents[i] += "<a href='#'>From: " + parameter[key].initialTime + " To: " +  parameter[key].finalTime + "</a><br>";
                                    }

                                    infowindows[i] = new google.maps.InfoWindow({
                                        content: data[i].address + contents[i]
                                    });

                                    google.maps.event.addListener(markers[i], "click", function(innerKey) {
                                        return function() {
                                            infowindows[innerKey].open(myMap, markers[innerKey]);
                                    }}(i));

                                    i++;
*/


                                    },
                                    error: function(){
                                         alert("Couldn't found spots !");
                                    }
                                }); 
                         }
                        /*for (i = 0; i < size; i++){
                         $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "http://airpark-kborykina.rhcloud.com/backend/load_spotstime.php",
                                data: {
                                    spot_id: data[i].id,
                                    day: day
                                },
                                success: function(parameter){
                                    var key;
                                    contents[i] = '<br>';

                                    for( key in parameter){
                                        contents[i] += "<a href='#'>From: " + parameter[key].initialTime + " To: " +  parameter[key].finalTime + "</a><br>";
                                    }

                                    infowindows[i] = new google.maps.InfoWindow({
                                        content: data[i].address + contents[i]
                                    });

                                    google.maps.event.addListener(markers[i], "click", function(innerKey) {
                                        return function() {
                                            infowindows[innerKey].open(myMap, markers[innerKey]);
                                    }}(i));

                                    i++;
                                },
                                error: function(){
                                     console.log("Unfortunately, spots table was not loaded !");
                                }
                            });
                        }*/
                         
                        return false;
                    } //when status is OK
                }); // geocode
            
            
            return false;
        });
                        
    };
});