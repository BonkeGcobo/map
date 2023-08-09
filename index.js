// Variables for tracking driver location and directions display
let driverMarker;
//let customerMarker;
let intervalId;
let directionsService;
let directionsDisplay;




function handleLocationError(error) {
  console.log('Error occurred while retrieving location:', error);
}

document.getElementById('startButton').addEventListener('click', () => {
 
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -33.918861, lng: 18.423300 }, 
    zoom: 12
  });
  
  
 
            
  driverMarker = new google.maps.Marker({
    position: { lat: -33.9261343, lng: 18.4443855 }, // Initial driver location -33.9261343,18.4443855
    map: map,
    title: 'Driver'
  });
 

  // Initialize the Directions Service and Display
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

 
  if (navigator.geolocation) {
    var infoWindow = new google.maps.InfoWindow({
      map: map
    });
  
    // Create a marker variable outside the callback
    var customerMarker;
   
    // Use watchPosition to continuously monitor device location
    navigator.geolocation.watchPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(position.coords.accuracy)
  
        // If the customerMarker doesn't exist, create it
        if (!customerMarker) {
          customerMarker = new google.maps.Marker({
            position: pos,
            icon: {
              url:"red-pin-png.jpg",
              scaledSize: new google.maps.Size(48, 48)
            },
            map: map,
            title: String(pos.lat) + ", " + String(pos.lng),
          });
        } else {
          // If the customerMarker already exists, update its position
          customerMarker.setPosition(pos);
        }
        console.log(pos)
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('<b>You are here.</b>');
        map.setCenter(pos);
      },
      handleLocationError,
      {
        enableHighAccuracy: true
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  

});



// Stop tracking button click handler
document.getElementById('stopButton').addEventListener('click', () => {

  clearInterval(intervalId);
  driverMarker.setMap(null);
  customerMarker.setMap(null);

  // Clear the directions display
  directionsDisplay.setMap(null);
});
