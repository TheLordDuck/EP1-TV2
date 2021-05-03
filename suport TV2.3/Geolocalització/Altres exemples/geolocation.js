function iniciar(){
  var boton = document.getElementById('boto');
  boton.addEventListener('click', obtenerubicacion);
}
function obtenerubicacion(){
  navigator.geolocation.getCurrentPosition(mostrarinfo);
}
function mostrarinfo(posicion){
  var cajadatos = document.getElementById('Dades');
  var datos = '';
  datos += 'Latitud: ' + posicion.coords.latitude + '<br>';
  datos += 'Longitud: ' + posicion.coords.longitude + '<br>';
  datos += 'Presició: ' + posicion.coords.accuracy + 'mts.<br>';
  cajadatos.innerHTML = datos;
}
addEventListener('load', iniciar);