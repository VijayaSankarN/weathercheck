var app = angular.module('weatherapp', [])
.controller('MyModuleWeather', function($scope, $http, $log) {
  $scope.city = 'Trichy';
  $scope.change = function($la,$lo) {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    $http.jsonp(url, { params : {
        lat : $la || Drupal.settings.wc_latlong.wc_lat,
        lon : $lo || Drupal.settings.wc_latlong.wc_long,
        units : 'metric',
        callback: 'JSON_CALLBACK'
      }}).
      success(function(data, status, headers, config) {
		$scope.Place = data.name + "," + data.sys.country;
        $scope.main = data.main;
        $scope.wind = data.wind;
        $scope.description = data.weather[0].description;
      }).
      error(function(data, status, headers, config) {
        $log.error('Could not retrieve data from ' + url);
      });
  };
  $scope.change();
});

window.onload = function () {
    var latlng = new google.maps.LatLng(Drupal.settings.wc_latlong.wc_lat, Drupal.settings.wc_latlong.wc_long);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Set lat/lon values for this property',
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function (a) {
		angular.element(document.getElementById('YourElementId')).scope().change(a.latLng.lat().toFixed(4) , a.latLng.lng().toFixed(4));
    });
};