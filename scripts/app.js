
   window.onload = function initMap(){


     var contentArray = [
        chicagoMap = "chicago",
        greektown = "greektown", 
        goldcoast = "goldcoast", 
        hydepark = "hydepark",
        printersrow = "printersrow",
        rivernorth = "rivernorth",
        wrigleyville = 'wrigleyville',
        wickerpark = 'wickerpark',
        oldtown = "oldtown",
        westloop = "west loop",
        magmile = "mag mile",
        lincolnpark = "lincoln park",
        lakeview = "lakeview",
        loop = "loop"

     ] 



      var locationsArray = [
        chicagoMap = {lat: 41.88425, lng: -87.63245},
        greektown = {lat: 41.8786, lng: -87.6471}, 
        goldcoast = {lat: 41.9058, lng: -87.6273}, 
        hydepark = {lat: 41.7943, lng: -87.5907},
        printersrow = {lat:41.8783, lng: -87.6273},
        rivernorth = {lat:41.8924, lng: -87.6341},
        wrigleyville = {lat:41.948437, lng: -87.655334},
        wickerpark = {lat:41.9088, lng: -87.6796},
        oldtown = {lat:41.9077, lng: -87.6374},
        westloop = {lat:41.8825, lng: -87.6447},
        magmile = {lat:41.8948, lng: -87.6242},
        lincolnpark = {lat:41.9214, lng: -87.6513},
        lakeview = {lat:41.9436, lng: -87.6584},
        loop = {lat: 41.8837, lng: -87.6289}
      ];

      pottyLocate(locationsArray)

  };
        


 

// <!--===========================-->
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
          }
        }
      }

      var geo = navigator.geolocation

      function pottyLocate(locationsArray) {


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
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
          zoom: 13
        });


      for (i = 0; i < locationsArray.length; i++){
        var locations = locationsArray[i];

        var marker = new google.maps.Marker({
          position: locations,
          map: pottymap
              }) 
            }
                 
          });
      }
  }; 





    