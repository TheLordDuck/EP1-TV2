// Crear objecte AJAX
window.onload = function() {
  iniciaVariables();
  associaDOMevents();
}

function iniciaVariables(){
	var pXML = document.getElementById("pXML");
	var divPagination = document.getElementById("pagination");
	var taulaInfo = document.getElementById('taulaInfo'); //Referenciar el Div HTML
	var netejarBtn = document.getElementById('netejarBtn');
}

function associaDOMevents(){
	pXML.onclick = peticioAJAX;
	netejarBtn.onclick = netejarTaula;
}

function netejarTaula(){
	var divPagination = document.getElementById("pagination");
	divPagination.innerHTML = '';
	taulaInfo.innerHTML = '';
}

function crearObjAJAX(){
    var obj;
    //Verificaci� del navegador
    if(window.XMLHttpRequest) { // Navegadors actuals
      obj = new XMLHttpRequest();
    } else {
      try { //Navegadors antics
        obj = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        alert('El navegador emprat no suporta AJAX');
      }
    }
    return obj;
  }
// Funci� de lectura i presentaci� del resultat obtingut as�ncronament
function llegirDadesXML(){
  if (oXML.readyState == 4  && oXML.status == 200) { // L'estat = 4 disposem de la resposta del servidor
    var xml = oXML.responseXML.documentElement; // refer�ncia al XML rebut
	var divPagination = document.getElementById("pagination");
    divPagination.innerHTML = '';
	taulaInfo.innerHTML = ''; // buidar el contingut de DIV
    // Recorrer l'arbre XML per extreure informaci� de cada usuari
	var taulaInfoCompleta = '';
    taulaInfoCompleta += '<table class="table table-bordered table-hover">';
	taulaInfoCompleta += '<thead>';
	taulaInfoCompleta += '<tr>';
	taulaInfoCompleta += '<th>Nom</th>';
	taulaInfoCompleta += '<th>Data Creacio</th>';
	taulaInfoCompleta += '<th>Link al Canal</th>';
	taulaInfoCompleta += '<th>Titol Video</th>';
	taulaInfoCompleta += '<th>Descripcio Video</th>';
	taulaInfoCompleta += '<th>Data Publicacio VIdeo</th>';
	taulaInfoCompleta += '</tr>';
	taulaInfoCompleta += '</thead>';
	taulaInfoCompleta += '<tbody>';
	for (i = 0; i < xml.getElementsByTagName('CANAL').length; i++){
      var canal = xml.getElementsByTagName('CANAL')[i]; //Un Node usuari en XML
	  var nom_canal = canal.getElementsByTagName('NOM_CANAL')[0].firstChild.data; //Id
	  var datacreacio = xml.getElementsByTagName('DATA_CREACIO_CANAL')[i]; //Un Node usuari en XML
	  var dia = datacreacio.getElementsByTagName('DIA')[0].firstChild.data; //Id
	  var mes = datacreacio.getElementsByTagName('MES')[0].firstChild.data; //Id
	  var any = datacreacio.getElementsByTagName('ANY')[0].firstChild.data; //Id
	  var link_ = canal.getElementsByTagName('LINK')[0].firstChild.data; //Id
	  for (j = 0; j < canal.getElementsByTagName('VIDEO').length; j++){
		var video = xml.getElementsByTagName('VIDEO')[j]; //Un Node usuari en XML
		var titol = video.getElementsByTagName('TITOL')[0].firstChild.data; //Id
		var descripcio = video.getElementsByTagName('DESCRIPCIO')[0].firstChild.data; //Id
		var data_publicacio = video.getElementsByTagName('DATA_PUBLICACIO')[0].firstChild.data; //Id
		taulaInfoCompleta += '<tr>';
		taulaInfoCompleta += '<td>'+nom_canal+'</td>';
		taulaInfoCompleta += '<td>'+dia+'/'+mes+'/'+any+'</td>';
		taulaInfoCompleta += '<td>';
		taulaInfoCompleta += '<a href="'+link_+'">';
		taulaInfoCompleta += '<img border="0" alt="'+nom_canal+'" src="img/'+(i+1)+'.jpg" width="100" height="50">';
		taulaInfoCompleta += '</a>';
		taulaInfoCompleta += '</td>';
		taulaInfoCompleta += '<td>'+titol+'</td>';
		taulaInfoCompleta += '<td>'+descripcio+'</td>';
		taulaInfoCompleta += '<td>'+data_publicacio+'</td>';
		taulaInfoCompleta += '</tr>';
	  }
	  
    }
	taulaInfoCompleta += '</tbody>';
	taulaInfoCompleta += '</table>';
	taulaInfo.innerHTML = taulaInfoCompleta;
	pagination();
  }
}
 //Petici� As�ncrona
 function peticioAJAX(){
      oXML = crearObjAJAX();
	  oXML.onreadystatechange = llegirDadesXML;
      oXML.open('post', 'XML/dades.xml');
      oXML.send('');
    }