/**
 * @file
 * Generates map for retrieving the latitude and longitude of a desired location.
 *
 * @author: Vijaya Sankar N <https://www.drupal.org/user/3238637>
 */

window.onload = function (){
  var latlng = new google.maps.LatLng(Drupal.settings.wc_latlong.wc_lat, Drupal.settings.wc_latlong.wc_long);
  var map = new google.maps.Map(document.getElementById('AdminMap'), {
        center: latlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true
  });
  google.maps.event.addListener(marker, 'dragend', function (a) {
        document.getElementById('edit-weathercheck-latitude').value = a.latLng.lat().toFixed(4);
        document.getElementById('edit-weathercheck-longitude').value = a.latLng.lng().toFixed(4);
  });
}
