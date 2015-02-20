define(function () {
    return function () {
       /* MAP INITIALIZATION */
        var myMap;
        var marker;
        var contentString = 'Your spot is here!';
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
    };
});


  /*
				function initialize()
				{
					var mapProp = {
					  //center:new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $lng; ?>),
					  mapTypeId:google.maps.MapTypeId.ROADMAP
					  
					  };
					var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
						//  Make an array of the LatLng's of the markers you want to show
						<?php
							$lata=array();
							$lnga=array();
							for($i=0; $i<sizeof($spots); $i++)
							{
								$lata[$i]=$spots[$i]['lat'];
								$lnga[$i]=$spots[$i]['lng'];
							}
						?>
						var Lat=<?php echo json_encode($lata) ?>;
						var Lng=<?php echo json_encode($lnga) ?>;
						var Spot=<?php echo json_encode($spots) ?>;
						var LatLngList = new Array();
						LatLngList[0]=new google.maps.LatLng (<?php echo $lat; ?>,<?php echo $lng; ?>);
						for (var i = 1, LtLen = Lat.length; i <= LtLen && i<=5; i++) {
							LatLngList[i]=new google.maps.LatLng (Lat[i-1],Lng[i-1]);
						}
					
						//sets the map to zoom in on the 5 closest spots
						//  Create a new viewpoint bound
						var bounds = new google.maps.LatLngBounds ();
						//  Go through each...
						for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
						  //  And increase the bounds to take this point
						  bounds.extend (LatLngList[i]);
						}
						//  Fit these bounds to the map
						map.fitBounds (bounds);
						
						//places all the markers for the spots on the map
						for (var i = 0, LtLen = Lat.length; i < LtLen; i++) {
						
						
							var contentString = '<div id="content">'+
					      '<div id="siteNotice">'+
					      '</div>'+
					      '<h1 id="firstHeading" class="firstHeading">'+Lat[i]+'</h1>'+
					      '<div id="bodyContent">'+
					      '<p>'+Spot[i]['id']+'</p>'+
					      '</div>'+
					      '</div>';
					
						  var infowindow = new google.maps.InfoWindow({
							  content: contentString
						  });

							var marker=new google.maps.Marker({
							  position:new google.maps.LatLng(Lat[i],Lng[i]),
							  icon:'img/spot-icon.png',
							  title: contentString
							  });
							  
							google.maps.event.addListener(marker, 'click', function() {
							infowindow.setContent(this.title);
							infowindow.open(map,this);
						  });

							marker.setMap(map);
						}
						
						//places the marker of the searched address on the map
						var carmarker=new google.maps.Marker({
						  position:new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $lng; ?>),
						  icon:'img/car-icon.png'
						  });

						carmarker.setMap(map);	
						


					}

					google.maps.event.addDomListener(window, 'load', initialize);*/