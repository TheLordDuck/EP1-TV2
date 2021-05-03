window.onload = function() { 
    mapat();
}	

function mapat(){
	//var Divisio=L.DomUtil.get('mapid');
	//var Divisio=document.getElementById('mapid');
var mymap = L.map('mapid').setView([42.4529631, 1.4918235], 13);
//var mymap = Divisio.setView([42.4529631, 1.4918235], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

	L.marker([42.465144, 1.490289]).addTo(mymap)
		.bindPopup("<b>Bon dia</b><br />Soc un popup.").openPopup();

	L.circle([42.453, 1.53], 800, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");

	L.polygon([
		[42.453861, 1.434402],
		[42.454621, 1.469078],
		[42.437647, 1.468048],
		[42.433846, 1.432343]
	]).addTo(mymap).bindPopup("I am a polygon.");


	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}
	mymap.on('click', onMapClick);
}

	