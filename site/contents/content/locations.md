---
title: Mountains
description: Climbs and hikes ordered by location
---
<script src="/assets/js/leaflet.js" type="text/javascript"></script>
<script src="/assets/js/leaflet.markercluster.js" type="text/javascript"></script>
<link rel="stylesheet" href="/assets/css/leaflet.css" media="screen" type="text/css">
<link rel="stylesheet" href="/assets/css/MarkerCluster.css" media="screen" type="text/css">
<link rel="stylesheet" href="/assets/css/MarkerCluster.Default.css" media="screen" type="text/css">


<div id="map" class="map leaflet-container" style="height: 500px; position:relative;"></div>

<script type="text/javascript">
  {{ locations_code }}

  // create the map object and set the cooridnates of the initial view:
  var map = L.map('map').setView([46.800604, 11.174361], 6);
  var tileserver = "http://c.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f13bfa644ac14730b74927c01e626a71";

  // create the tile layer with correct attribution:
  L.tileLayer(tileserver, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
      }).addTo(map);

  var markers = new L.MarkerClusterGroup();

  function formatDate(d) {
    var d2 = new Date(d);
    var monthNames = ["January", "February", "March", "April",
      "May", "June", "July", "August", "September", "October",
      "November", "December"];
    return monthNames[d2.getMonth()] + ' ' + d2.getFullYear();
  }

  function addMarker(location) {
    let m = new L.marker(location.location);
    let = triplist = "<ul>\n";
    location.trips.forEach((trip) => {
      let sdate = formatDate(trip.date);
      triplist += `<li><a href='${trip.url}'>${trip.title}</a> ${sdate}</li>\n`;
    });
    triplist += "</ul>\n";
    let popupstr = `<h3>${location.name}</h3>\n${triplist}`;
    m.bindPopup(popupstr);
    markers.addLayer(m);
  }

  mapdata.forEach((md) => {
    addMarker(md);
  });

  markers.addTo(map);
</script>

# Mountains by location

{{ locations_formatted }}
