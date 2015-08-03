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
		$scope.Place = Drupal.settings.wc_latlong.wc_disp[0]=="1"?data.name:'';
		$scope.Place += Drupal.settings.wc_latlong.wc_disp[1]=="1"?(Drupal.settings.wc_latlong.wc_disp[0]?(','+data.sys.country):data.sys.country):'';
        $scope.temperature = Drupal.settings.wc_latlong.wc_disp[2]=="1"? "Temperature : " + data.main.temp+"°C<br>":'';
        $scope.temperature += Drupal.settings.wc_latlong.wc_disp[3]=="1"? "Min " + data.main.temp_min+"°C ":'';
        $scope.temperature += Drupal.settings.wc_latlong.wc_disp[4]=="1"? "Max " + data.main.temp_max+"°C ":'';
        $scope.windSpeed = Drupal.settings.wc_latlong.wc_disp[9]=="1"?"Wind Speed : "+data.wind.speed+"m/s":'';
        $scope.description = Drupal.settings.wc_latlong.wc_disp[5]=="1"?data.weather[0].description:'';
        $scope.Pressure = Drupal.settings.wc_latlong.wc_disp[6]=="1"?"Pressure : "+data.main.pressure+" hPa":'';
        $scope.Humidity = Drupal.settings.wc_latlong.wc_disp[7]=="1"?"Humidity : "+data.main.humidity+"%":'';
        $scope.VisibilityArea = Drupal.settings.wc_latlong.wc_disp[8]=="1"?"Visibility : "+(data.visibility/1000)+" Km":'';
        $scope.WindDir = Drupal.settings.wc_latlong.wc_disp[10]=="1"?"Wind Direction : "+windDirection(data.wind.deg):'';
      }).
      error(function(data, status, headers, config) {
        $log.error('Could not retrieve data from ' + url);
      });
  };
  $scope.change();
});

function windDirection(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

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
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function (a) {
		angular.element(document.getElementById('YourElementId')).scope().change(a.latLng.lat().toFixed(4) , a.latLng.lng().toFixed(4));
    });
};
