var mapa;
var dades = [{
  seu: "IOC - Seu Central",
  lat: 41.375106,
  lon: 2.168342,
  adreca: "Avinguda del Paral·lel, 71. Barcelona"
}, {
  seu: "Proves Barcelona",
  lat: 41.3860669,
  lon: 2.1145104,
  adreca: "C/ John M. Keynes, 1-11. Barcelona"
}, {
  seu: "Proves Girona",
  lat: 41.961293,
  lon: 2.829387,
  adreca: "Carrer de la Universitat de Girona, 10. Girona",
}, {
  seu: "Proves Lleida",
  lat: 41.623023,
  lon: 0.6236748,
  adreca: "Pi i Margall, 51. Lleida",
}, {
  seu: "Proves Tarragona",
  lat: 41.120293,
  lon: 1.247892,
  adreca: "Av. de Catalunya, 35. Tarragona",
}];
var marcadors = [];
var finestresInfo = [];

var iniciarMapa = function() {
  mapa = new google.maps.Map(document.getElementById('mapa'), {
    center: {
      lat: 41.390205,
      lng: 2.154007
    },
    zoom: 7
  });
}

var crearMarcadors = function() {
  for (var i = 0; i < dades.length; i++) {
    var marcador = crearMarcador(dades[i]);
    marcadors.push(marcador);
  }
}

var crearMarcador = function(dada) {
  var finestraInfo = new google.maps.InfoWindow({
    content: '<h3>' + dada.seu + '</h3><p><b>Adreça:</b>' + dada.adreca + '</p>'
  });

  var marcador = new google.maps.Marker({
    position: {
      lat: dada.lat,
      lng: dada.lon
    },
    title: dada.seu,
  });

  marcador.addListener('click', function() {
    tancarTotesLesFinestres();
    finestraInfo.open(mapa, this);
  });

  finestresInfo.push(finestraInfo);
  
  return marcador;
}

var tancarTotesLesFinestres = function() {
  for (var i = 0; i < finestresInfo.length; i++) {
    finestresInfo[i].close();
  }
}

var afegirMarcadors = function() {
  for (var i = 0; i < marcadors.length; i++) {
    console.log("Afegir marcador: " + i);
    afegirMarcador(marcadors[i]);
  }
}

var afegirMarcador = function(marcador) {
  marcador.setMap(mapa);
}

var iniciarAplicacio = function() {
  iniciarMapa();
  crearMarcadors();
  afegirMarcadors();
}