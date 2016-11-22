
   window.onload = function initMap(){

      var locationsArray = [

        {
              locationName: "chicagoMap",
              geolocation: {lat: 41.88425, lng: -87.63245},
              comments: "Chicago does this work"
        },

        {
              locationName: "greektown",
              geolocation: {lat: 41.8786, lng: -87.6471},
              comments: "Greek does this work"
        },
        {
              locationName: "goldcoast",
              geolocation: {lat: 41.9058, lng: -87.6273},
              comments: "Gold does this work"
        },
        {
              locationName: "hydepark",
              geolocation: {lat: 41.7943, lng: -87.5907},
              comments: "<h2><font color: red>Hyde Park</font>  </h2> does this work"
        },
        {
              locationName: "printersrow",
              geolocation: {lat:41.8783, lng: -87.6273},
              comments: "Printers does this work"
        },

          {
              locationName: "rivernorth",
              geolocation: {lat: 41.8924, lng: -87.6341},
              comments: "River Northdoes this work"
          },
         {
              locationName: "wrigleyville",
              geolocation: {lat:41.948437, lng: -87.655334},
              comments: "Wrigleyville does this work"
         },
        {
              locationName: "wickerpark",
              geolocation: {lat:41.9088, lng: -87.6796},
              comments: "Wicker Park does this work"
        },
        {
              locationName: "oldtown",
              geolocation: {lat:41.9077, lng: -87.6374},
              comments: "Old Town does this work"
        },
        {
              locationName: "westloop",
              geolocation: {lat:41.8825, lng: -87.6447},
              comments: "West Loop does this work"
        },
        {
              locationName: "magmile",
              geolocation: {lat:41.8948, lng: -87.6242},
              comments: "Mag Mile does this work"
        },
        {
              locationName: "lincolnpark",
              geolocation: {lat:41.9214, lng: -87.6513},
              comments: "Lincoln Park does this work"
        },
        {
              locationName: "lakeview",
              geolocation: {lat:41.9436, lng: -87.6584},
              comments: "Lake View does this work"
        },
        {
              locationName: "loop",
              geolocation: {lat: 41.8837, lng: -87.6289},
              comments: "Loop does this work"
        }

      ];

       pottyLocate(locationsArray)

   };
        



// ============FORM AUTOCOMPLETE===============-->
      var autocomplete;
      var pottySearch;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});
        autocomplete.addListener('place_changed', fillInAddress);
      }


      //getting info from autocomplete
      function fillInAddress() {

        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          //code from https://google-developers.appspot.com/maps/documentation/javascript/examples/full/places-autocomplete-addressform
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;

            console.log(place.geometry.location.lat(), 'lat', place.geometry.location.lng(), 'long')
            console.log(val, 'val')
          }
        }
      }

        
// ===================END OF AUTOCOMPLETE====================================


      //var geo = navigator.geolocation;

      function pottyLocate(locationsArray) {


          if (!navigator.geolocation) {
          } else navigator.geolocation.getCurrentPosition(function (position) {
              
              var geolocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              console.log(geolocation)
              var circle = new google.maps.Circle({
                  center: geolocation,
                  radius: position.coords.accuracy
              });
              autocomplete.setBounds(circle.getBounds());


              var pottymap = new google.maps.Map(document.getElementById('map'),
                  {
                      center: geolocation,
                      zoom: 16
                  });




              for (i = 0; i < locationsArray.length; i++) {
                  var locations = locationsArray[i].geolocation; //this might not be right
                   
                  var marker = new google.maps.Marker({
                      position: locations,
                      //animation: google.maps.Animation.BOUNCE, //bounce animation
                      
                      map: pottymap
                    })
                    
                  



                   var infowindow = new google.maps.InfoWindow ({ 
                        maxWidth:200,
                       //pixelOffset: new google.maps.Size(200,200),
                       content: locationsArray[i].comments
                   });
                   
                   


                   add(marker, infowindow, pottymap, infowindow.content)

             
              }
          })

}


function add(marker, infoWindow, map, comments){
         marker.addListener('click', function(){
                      console.log()
                       infoWindow.setContent(comments);
                       infoWindow.open(map, marker);
                   });
 }           

// var iconBase = 'icon.jpg';
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     icon: iconBase + 'potty'
//   });








//=============possible code to make infoWindow work===========


   //
   //
   // var marker = new google.maps.Marker({
   //     position: locations,
   //     map: pottymap
   // });
   //
  
  // ==================================================================

