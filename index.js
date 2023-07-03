// Variables for tracking driver location and directions display
let driverMarker;
//let customerMarker;
let intervalId;
let directionsService;
let directionsDisplay;
let steps = 100; // Number of steps for the simulation
let step = 0; // Current step of the simulation

// Function to simulate driving from driver location to customer location
/*function simulateDriving() {
  if (step >= steps) {
    clearInterval(intervalId); // Stop the simulation when completed
    return;
  }

  // Calculate the interpolation factor based on the current step
  const factor = step / steps;

  // Interpolate the driver's location towards the customer's location
  const driverLat = driverMarker.getPosition().lat();
  const driverLng = driverMarker.getPosition().lng();
  
  const customerLat = customerMarker.getPosition().lat();
  const customerLng = customerMarker.getPosition().lng();
  const newLat = driverLat + (customerLat - driverLat) * factor;
  const newLng = driverLng + (customerLng - driverLng) * factor;
  const newLocation = new google.maps.LatLng(newLat, newLng);

  // Update the driver marker on the map
  customerMarker.setPosition(newLocation);

  // Calculate and display the directions from driver to customer
//  calculateAndDisplayDirections(newLocation, customerMarker.getPosition());

  step++; // Increment the step
}*/


 //Finding the intial Location
 

// Function to update customer location with live coordinates
function updateCustomerLocation(position) {
  const { latitude, longitude } = position.coords;
  const currentLocation = new google.maps.LatLng(latitude, longitude);

  // Update the customer marker on the map
  console.log("Update location")
  customerMarker.setPosition(currentLocation);
  console.log("Real "+customerMarker.lat + customerMarker.ln)

}

// Function to handle errors in retrieving live location
function handleLocationError(error) {
  console.log('Error occurred while retrieving location:', error);
}

// Start tracking button click handler
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
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      },
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
