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
        document.getElementById('edit-wc-latitude').value=a.latLng.lat().toFixed(4);
        document.getElementById('edit-wc-longitude').value=a.latLng.lng().toFixed(4);
    });
}