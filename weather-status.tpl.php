<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<div id="map" style="height: 300px; border: 1px solid #000;"></div>

<div ng-app="weatherapp" id="YourElementId" ng-controller="MyModuleWeather">
    <h3 ng-bind="Place"></h3>
    <p ng-bind="description"/></p>
    <p ng-bind-html-unsafe="temperature"></p>
    <p ng-bind="Pressure"></p>
    <p ng-bind="Humidity"></p>
    <p ng-bind="windSpeed"></p>
    <p ng-bind="WindDir"></p>
    <p ng-bind="VisibilityArea"></p>
</div>
