window.onload = function() {
  iniciaVariables();
  associaDOMevents();
}

function iniciaVariables(){
	var pXML = document.getElementById("pXML");
	var pJSON = document.getElementById("pJSON");
	var divPagination = document.getElementById("pagination");
	var taulaInfo = document.getElementById('taulaInfo'); //Referenciar el Div HTML
	var netejarBtn = document.getElementById('netejarBtn');
}

function associaDOMevents(){
	pXML.onclick = peticioAJAX_XML;
	pJSON.onclick = peticioAJAX_JSON;
	netejarBtn.onclick = netejarTaula;
}

function netejarTaula(){
	var divPagination = document.getElementById("pagination");
	divPagination.innerHTML = '';
	taulaInfo.innerHTML = '';
}

// Crear objecte AJAX
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
	/*var taulaInfoCompleta = '';
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
	taulaInfoCompleta += '<tbody>';*/
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
		/*taulaInfoCompleta += '<tr>';
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
		taulaInfoCompleta += '</tr>';*/
		
	  }
	  
    }
	/*taulaInfoCompleta += '</tbody>';
	taulaInfoCompleta += '</table>';
	taulaInfo.innerHTML = taulaInfoCompleta;
	pagination();*/
  }
}

function llegirDadesJSON(){ 
  if (oXML.readyState  == 4 && oXML.status == 200) { 
	var divPagination = document.getElementById("pagination");
    divPagination.innerHTML = '';
     var DadesJSON=oXML.responseText;
	 var DadesParsejades = JSON.parse(DadesJSON); //Conversió a Array Java
	 var taulaInfoJSON=document.getElementById("taulaInfo");
	 taulaInfoJSON.innerHTML = '';
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
	 var canal = DadesParsejades.plataforma.canal;
	 for (i = 0; i < canal.length; i++){  //Recórrer Array, presentar dades
		var nom_canal = canal[i].nom_canal;
		var data_creacio_canal = canal[i].data_creacio_canal;
		var dia = data_creacio_canal.dia;
		var mes = data_creacio_canal.mes;
		var any = data_creacio_canal.any;
		var link_ = canal[i].link;
		var video = canal[i].video;
		for (j = 0; j < video.length; j++){
			var titol = video[j].titol;
			var descripcio = video[j].descripcio;
			var data_publicacio = video[j].data_publicacio;
			taulaInfoCompleta += '<tr>';
			taulaInfoCompleta += '<td>'+nom_canal+'</td>';
			taulaInfoCompleta += '<td>'+dia+'/'+mes+'/'+any+'</td>';
			taulaInfoCompleta += '<td>';
			taulaInfoCompleta += '<a href="'+link_+'">';
			taulaInfoCompleta += '<img border="0" alt="'+nom_canal+'" src="img/'+(i+1)+'b.jpg" width="100" height="50">';
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
 function peticioAJAX_XML(){
      oXML = crearObjAJAX();
	  oXML.onreadystatechange = llegirDadesXML;
      oXML.open('post', 'XML/dades.xml');
      oXML.send('');
    }
	
	//Petició Asíncrona 
 function peticioAJAX_JSON(){ 
      oXML = crearObjAJAX(); 
	  oXML.onreadystatechange = llegirDadesJSON; 
      oXML.open('GET', 'JSON/dades.json'); 
      oXML.send(''); 
    }