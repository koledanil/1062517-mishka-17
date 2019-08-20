var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 59.93889, lng: 30.323090},
    zoomControl: true,
    scaleControl: true,
   streetViewControl: true,
  });

  var image = 'img/map-pin-svg.svg';
  var beachMarker = new google.maps.Marker({
    position: {lat: 59.93889, lng: 30.323090},
    map: map,
    animation: google.maps.Animation.DROP,
    icon: image
  });
}