function iniciar() {
  var elemento = document.getElementById("obtener");
  //elemento.addEventListener("click", obtenerubicacion);
  elemento.addEventListener("click", initMap);
}
function obtenerubicacion() {
  navigator.geolocation.getCurrentPosition(mostrar, mostrarerror);
}
function mostrar(posicion) {
  var ubicacion = document.getElementById("ubicacion");
  var mapurl = "http://maps.google.com/maps/api/staticmap?center=" + posicion.coords.latitude + "," + posicion.coords.longitude + "&zoom=12&size=400x400&sensor=false&markers=" + posicion.coords.latitude + "," + posicion.coords.longitude;

  ubicacion.innerHTML = '<img src="' + mapurl + '">';
}
function mostrarerror(error) {
  alert("Error: " + error.code + " " + error.message);
}


 var map1;
  	 function initMap() {
		 var map;
        map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 43.5293, lng: -5.6773},
          zoom: 13,
        });
        var marker = new google.maps.Marker({
          position: {lat: 43.542194, lng: -5.676875},
          map: map,
	  title: 'Acuario de Gijón'
        });
      }
window.addEventListener("load", iniciar);