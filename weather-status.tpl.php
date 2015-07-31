<?php
/**
 * @file
 * AngularJS template to render a weather block.
 */
?>

<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<div id="map" style="height: 300px; border: 1px solid #000;"></div>

<div ng-app="weatherapp" id="YourElementId" ng-controller="MyModuleWeather">
  <h3>{{Place}}</h3>
  <p>{{description}}</p>
  <p>Temperature: {{main.temp}}</p>
  <p>Wind speed: {{wind.speed}}</p>
</div>
