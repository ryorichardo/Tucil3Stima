const mapboxgl = require('mapbox-gl');
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzamVycmllbHMiLCJhIjoiY2tuMWV6NGE5MHgycTJ2bG4wMmoxcmpreCJ9.wgJ5c_ImuNBnbbyLlmPe5g';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [107.61069128360595, -6.891373481780056], // starting position [lng, lat] , 
    zoom: 15 // starting zoom
});

    var marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true
        }).setLngLat([107.61069128360595, -6.891373481780056])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
        .addTo(map);