window.onload = function()  {
//Verificar si el navegador disposa de l'objecte IndexedDB
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var dataBase = null;
	
	var importar = document.getElementById("importarXML");
	var llistarNomCanal = document.getElementById("llistarNomCanal");
	var llistarNomLloc = document.getElementById("llistarNomLloc");
	var afegir = document.getElementById("afegir");
	var netejar = document.getElementById("netejar");

	importar.onclick = peticioAJAX_XML;
	llistarNomCanal.onclick = llistatComplertByName;
	llistarNomLloc.onclick = llistatComplertByLloc;
	afegir.onclick = add;
	netejar.onclick = netejaDB;
	startDB(); // Creació/Obertura de la BD			
}

//Funció de creació 
function startDB() {
	dataBase = indexedDB.open("BDTV2_3", 1);
	//Utilització de la propietat onupgradeneeded que s'executa a la creació
	// o modificació de la estructura de la nostra BD
	dataBase.onupgradeneeded = function (e) {
		//Recuperar el connector actual
		var active = dataBase.result;      
		//Crear la col·lecció 
		var object = active.createObjectStore('media', { keyPath : 'id', autoIncrement : true });
		//Crear clau principal i secundaria (by_dni, by_name)
		//Venen a ser els índex
		//object.createIndex('by_name', 'name', { unique : false });
		//object.createIndex('by_dni', 'dni', { unique : true});
		object.createIndex('by_nomcanal', 'nomcanal', { unique : false });
		//object.createIndex('datacreacio', { unique : false });
		//object.createIndex('link', { unique : false });
		object.createIndex('by_nomlloc', 'nomlloc', { unique : false });
		//object.createIndex('latitud', { unique : false });
		//object.createIndex('longitud', { unique : false });
	};
	//Format asyncron : En cas de creació o modificació de la funció anterior OK
	dataBase.onsuccess = function (e) {
		//alert('BD carregada');
		llistatComplert();
	};
	//Format asyncron : En cas d'error
	dataBase.onerror = function (e) {
		alert('Error Obrint la BD');
	};
}

function eliminaDB() {
	var dataBase=indexedDB.deleteDatabase("BDTV2_3");
	//Format asyncron : En cas de creació o modificació de la funció anterior OK
	dataBase.onsuccess = function (e) {
		alert('Database eliminada');
		//llistatComplert();
	};
	//Format asyncron : En cas d'error
	dataBase.onerror = function (e) {
		alert('Error al esborrar database');
	};
}

function netejaDB() {
	 //Recuperar el connector actual
	var active = dataBase.result;
	//Parlem aqui de transaccions (L/E)
	var data = active.transaction(["media"], "readwrite");
	//Referència a un objecte de tipus
	var object = data.objectStore("media");
	var request=object.clear();
	
	//Format asyncron : En cas de creació o modificació de la funció anterior OK
	request.onsuccess = function (e) {
		//alert('Database loaded');
		llistatComplert();
	};
	//Format asyncron : En cas d'error
	request.onerror = function (e) {
		alert('Error al netejar database');
	};
}
//Funció d'afegir elements a la BD
function add() {
	//Recuperar el connector actual
	var active = dataBase.result;
	//Parlem aqui de transaccions (L/E)
	var data = active.transaction(["media"], "readwrite");
	//Referència a un objecte de tipus
	var object = data.objectStore("media");
	//Petició d'afegir 
	var request = object.add({
		//Recuperar dades del formulari i inserció directa
		nomcanal : document.querySelector('#nomcanal').value,
		//datacreacio : document.querySelector("#name").value.toLowerCase(),
		datacreacio : document.querySelector('#datacreacio').value,
		link : document.querySelector('#link').value,
		nomlloc : document.querySelector('#nomlloc').value,
		latitud : document.querySelector('#latitud').value,
		longitud : document.querySelector("#longitud").value
	});
	//Format asyncron : Cas d'error
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	// Format asyncron : Quan transacció completada
	data.oncomplete = function (e) {
		document.querySelector('#nomcanal').value = '';
		document.querySelector('#datacreacio').value = '';
		document.querySelector('#link').value = '';
		document.querySelector('#nomlloc').value = '';
		document.querySelector('#latitud').value = '';
		document.querySelector('#longitud').value = '';
		//alert('Persona afegida');
		llistatComplert();
	};
}
//Llistat selectiu per id
function load(id) {
	//Recuperar el connector actual
	var active = dataBase.result;
	// Transacció de lectura únicament
	var data = active.transaction(["media"], "readonly");
	// Seleccionar col·lecció
	var object = data.objectStore("media");
	// Cercar objecte per Id
	var request = object.get(parseInt(id));
	//Format asyn : Cas de trobar el registre
	request.onsuccess = function () {
		
		var result = request.result;
		
		if (result !== undefined) {
			alert("ID: " + result.id + "\n\
			NomCanal: " + result.nomcanal + "\n\
			DataCreacio: " + result.datacreacio + "\n\
			Link: " + result.link + "\n\
			NomLloc: " + result.nomlloc + "\n\
			Latitud: " + result.latitud + "\n\
			Longitud: " + result.longitud);
		}
	};
	
}
// Mateix procés però cercant per Clau Index (dni)
function loadByDni(nomcanal) {
	var active = dataBase.result;
	var data = active.transaction(["media"], "readonly");
	var object = data.objectStore("media");
	var index = object.index("by_nomcanal");
	
	var request = index.get(String(nomcanal));
	
	request.onsuccess = function () {
		var result = request.result;
		if (result !== undefined) {
			alert("ID: " + result.id + "\n\
			NomCanal: " + result.nomcanal + "\n\
			DataCreacio: " + result.datacreacio + "\n\
			Link: " + result.link + "\n\
			NomLloc: " + result.nomlloc + "\n\
			Latitud: " + result.latitud + "\n\
			Longitud: " + result.longitud);
		}
	};
	
}
// Mateix procés però cercant per Clau Index
function eliminaReg(id) {
	alert("Eliminar"+id);
	var active = dataBase.result;
	var data = active.transaction(["media"], "readwrite");
	var object = data.objectStore("media");
	//var index = object.index("by_dni");
	
	//var request = index.get(String(dni));
	var request=object.delete(id);
	 //Format asyncron : En cas de creació o modificació de la funció anterior OK
	request.onsuccess = function (e) {
		//alert('Database loaded');
		llistatComplert();
	};
	//Format asyncron : En cas d'error
	request.onerror = function (e) {
		alert('Error al netejar database');
	};
	
}
//Transacció de recuperar tots els registres
function llistatComplert() {
	
	var active = dataBase.result;
	var data = active.transaction(["media"], "readonly");
	var object = data.objectStore("media");
	//Taula JS per emmagatzemar objectes
	var elements = [];
	
	//El cursor ens permet navegar per la col·lecció d'objectes
	object.openCursor().onsuccess = function (e) {
		var result = e.target.result;

		if (result === null) {
			return;
		}
		//Elements a taula
		elements.push(result.value);
		//navegar pels següents
		result.continue();//El mateix continue() dispara novament un event success
						   //Per tant torna a entrar en aquesta funció (fins que result===null)
	};
	//Al completar la transacció, crear presentació
	data.oncomplete = function() {
		
		var outerHTML = '';
		
		for (var key in elements) {
			
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].nomcanal + '</td>\n\
				<td>' + elements[key].datacreacio + '</td>\n\
				<td>' + elements[key].link + '</td>\n\
				<td>' + elements[key].nomlloc + '</td>\n\
				<td>' + elements[key].latitud + '</td>\n\
				<td>' + elements[key].longitud + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Detalls</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">GPS</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">Elimina</button>\n\
				</td>\n\
			</tr>';                        
		}
		
		elements = [];
		document.querySelector("#elementsList").innerHTML = outerHTML;
	};
	
}
//Mateix procés però per llistat complert per noms
//Usant l'index by_name
function llistatComplertByName() {
	
	var active = dataBase.result;
	var data = active.transaction(["media"], "readonly"); //Al ser llistat, amb lectura és suficient
	var object = data.objectStore("media"); //Col·lecció escollida en la BD
	var index = object.index('by_nomcanal');     //Indexada per by_name
	
	var elements = []; //Contenidor 
	
	index.openCursor().onsuccess = function (e) {
		var result = e.target.result;
		if (result === null) { //Es retorna quan el punter de continue() arriba al final
			return;
		}
		elements.push(result.value); //Afegir en taula d'elements
		result.continue(); //El mateix continue() dispara novament un event success
						   //Per tant torna a entrar en aquesta funció (fins que result===null)
	 };
	
	data.oncomplete = function() {
		var outerHTML = '';
		for (var key in elements) {
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].nomcanal + '</td>\n\
				<td>' + elements[key].datacreacio + '</td>\n\
				<td>' + elements[key].link + '</td>\n\
				<td>' + elements[key].nomlloc + '</td>\n\
				<td>' + elements[key].latitud + '</td>\n\
				<td>' + elements[key].longitud + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Detalls</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">GPS</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">Elimina</button>\n\
				</td>\n\
			</tr>';                        
		}
		elements = [];
		document.getElementById("elementsList").innerHTML = outerHTML;
		//document.querySelector("#elementsList").innerHTML = outerHTML;
	};
}
//Mateix procés però per llistat complert per noms
//Usant l'index by_name
function llistatComplertByLloc() {
	
	var active = dataBase.result;
	var data = active.transaction(["media"], "readonly"); //Al ser llistat, amb lectura és suficient
	var object = data.objectStore("media"); //Col·lecció escollida en la BD
	var index = object.index('by_nomlloc');     //Indexada per by_name
	
	var elements = []; //Contenidor 
	
	index.openCursor().onsuccess = function (e) {
		var result = e.target.result;
		if (result === null) { //Es retorna quan el punter de continue() arriba al final
			return;
		}
		elements.push(result.value); //Afegir en taula d'elements
		result.continue(); //El mateix continue() dispara novament un event success
						   //Per tant torna a entrar en aquesta funció (fins que result===null)
	 };
	
	data.oncomplete = function() {
		var outerHTML = '';
		for (var key in elements) {
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].nomcanal + '</td>\n\
				<td>' + elements[key].datacreacio + '</td>\n\
				<td>' + elements[key].link + '</td>\n\
				<td>' + elements[key].nomlloc + '</td>\n\
				<td>' + elements[key].latitud + '</td>\n\
				<td>' + elements[key].longitud + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Detalls</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">GPS</button>\n\
				</td>\n\
				<td>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">Elimina</button>\n\
				</td>\n\
			</tr>';                        
		}
		elements = [];
		document.getElementById("elementsList").innerHTML = outerHTML;
		//document.querySelector("#elementsList").innerHTML = outerHTML;
	};
}

// Crear objecte AJAX
function crearObjAJAX(){
    var obj;
    //Verificaci? del navegador
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
// Funci? de lectura i presentaci? del resultat obtingut as?ncronament
function llegirDadesXML(){
  if (oXML.readyState == 4  && oXML.status == 200) { // L'estat = 4 disposem de la resposta del servidor
    var xml = oXML.responseXML.documentElement; // refer?ncia al XML rebut
	
	var active = dataBase.result;
	//Parlem aqui de transaccions (L/E)
	var data = active.transaction(["media"], "readwrite");
	//Referència a un objecte de tipus
	var object = data.objectStore("media");
	
    // Recorrer l'arbre XML per extreure informaci? de cada usuari
	for (i = 0; i < xml.getElementsByTagName('CANAL').length; i++){
      var canal = xml.getElementsByTagName('CANAL')[i]; //Un Node usuari en XML
	  var nom_canal = canal.getElementsByTagName('NOM_CANAL')[0].firstChild.data; //Id
	  var datacreacio = xml.getElementsByTagName('DATA_CREACIO_CANAL')[i]; //Un Node usuari en XML
	  var dia = datacreacio.getElementsByTagName('DIA')[0].firstChild.data; //Id
	  var mes = datacreacio.getElementsByTagName('MES')[0].firstChild.data; //Id
	  var any = datacreacio.getElementsByTagName('ANY')[0].firstChild.data; //Id
	  var link_ = canal.getElementsByTagName('LINK')[0].firstChild.data; //Id
	  var nom_lloc = canal.getElementsByTagName('NOM_LLOC')[0].firstChild.data; //Id
	  var latitud = canal.getElementsByTagName('LATITUD')[0].firstChild.data; //Id
	  var longitud = canal.getElementsByTagName('LONGITUD')[0].firstChild.data; //Id
	  for (j = 0; j < canal.getElementsByTagName('VIDEO').length; j++){
		var video = xml.getElementsByTagName('VIDEO')[j]; //Un Node usuari en XML
		var titol = video.getElementsByTagName('TITOL')[0].firstChild.data; //Id
		var descripcio = video.getElementsByTagName('DESCRIPCIO')[0].firstChild.data; //Id
		var data_publicacio = video.getElementsByTagName('DATA_PUBLICACIO')[0].firstChild.data; //Id
		
		//Petició d'afegir 
		var request = object.add({
			nomcanal : nom_canal,
			datacreacio : dia+mes+any,
			link : link_,
			nomlloc : nom_lloc,
			latitud : latitud,
			longitud : longitud
		});
		//Format asyncron : Cas d'error
		request.onerror = function (e) {
			alert(request.error.name + '\n\n' + request.error.message);
		};
		llistatComplert();
	  }
	  
    }
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
 //Petici? As?ncrona
 function peticioAJAX_XML(){
      oXML = crearObjAJAX();
	  oXML.onreadystatechange = llegirDadesXML;
      oXML.open('post', 'XML/dades2.xml');
      oXML.send('');
}
	
	//Petició Asíncrona 
 function peticioAJAX_JSON(){ 
      oXML = crearObjAJAX(); 
	  oXML.onreadystatechange = llegirDadesJSON; 
      oXML.open('GET', 'JSON/dades.json'); 
      oXML.send(''); 
    }