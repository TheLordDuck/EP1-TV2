function iniciar(){
  var boton = document.getElementById('boton');
  boton.addEventListener('click', obtenerubicacion);
}
function obtenerubicacion(){
  navigator.geolocation.getCurrentPosition(mostrarinfo, mostrarerror);
}
function mostrarinfo(posicion){
  var cajadatos = document.getElementById('cajadatos');
  var mapaurl = 'http://maps.google.com/maps/api/staticmap?center=' + posicion.coords.latitude + ',' + posicion.coords.longitude + '&zoom=12&size=400x400&sensor=false&markers=' + posicion.coords.latitude + ',' + posicion.coords.longitude;
  cajadatos.innerHTML = '<img src="' + mapaurl + '">';
}
function mostrarerror(error){
  alert('Error: ' + error.code + ' ' + error.message);
}
addEventListener('load', iniciar);