window.onload = function()  {
//Verificar si el navegador disposa de l'objecte IndexedDB
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var dataBase = null;
	var importar = document.getElementById("importar");
	var llistar = document.getElementById("llistar");
	var afegir = document.getElementById("afegir");
	var netejar = document.getElementById("netejar");
	//importar.onclick = 
	llistar.onclick = llistatComplertByName;
	afegir.onclick = add;
	netejar.onclick = netejaDB;
	startDB(); // Creaci�/Obertura de la BD			
}
//Funci� de creaci� 
function startDB() {
	dataBase = indexedDB.open("BDTV2_3", 1);
	//Utilitzaci� de la propietat onupgradeneeded que s'executa a la creaci�
	// o modificaci� de la estructura de la nostra BD
	dataBase.onupgradeneeded = function (e) {
		//Recuperar el connector actual
		var active = dataBase.result;      
		//Crear la col�lecci� 
		var object = active.createObjectStore('people', { keyPath : 'id', autoIncrement : true });
		//Crear clau principal i secundaria (by_dni, by_name)
		//Venen a ser els �ndex
		object.createIndex('by_name', 'name', { unique : false });
		object.createIndex('by_dni', 'dni', { unique : true});
		
	};
	//Format asyncron : En cas de creaci� o modificaci� de la funci� anterior OK
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
	//Format asyncron : En cas de creaci� o modificaci� de la funci� anterior OK
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
	var data = active.transaction(["people"], "readwrite");
	//Refer�ncia a un objecte de tipus
	var object = data.objectStore("people");
	var request=object.clear();
	
	//Format asyncron : En cas de creaci� o modificaci� de la funci� anterior OK
	request.onsuccess = function (e) {
		//alert('Database loaded');
		llistatComplert();
	};
	//Format asyncron : En cas d'error
	request.onerror = function (e) {
		alert('Error al netejar database');
	};
}
//Funci� d'afegir elements a la BD
function add() {
	//Recuperar el connector actual
	var active = dataBase.result;
	//Parlem aqui de transaccions (L/E)
	var data = active.transaction(["people"], "readwrite");
	//Refer�ncia a un objecte de tipus
	var object = data.objectStore("people");
	//Petici� d'afegir 
	var request = object.add({
		//Recuperar dades del formulari i inserci� directa
		dni : document.querySelector("#dni").value,
		name : document.querySelector("#name").value.toLowerCase(),
		surname : document.querySelector("#surname").value
	});
	//Format asyncron : Cas d'error
	request.onerror = function (e) {
		alert(request.error.name + '\n\n' + request.error.message);
	};
	// Format asyncron : Quan transacci� completada
	data.oncomplete = function (e) {
		document.querySelector('#dni').value = '';
		document.querySelector('#name').value = '';
		document.querySelector('#surname').value = '';
		//alert('Persona afegida');
		llistatComplert();
	};
}
//Llistat selectiu per id
function load(id) {
	//Recuperar el connector actual
	var active = dataBase.result;
	// Transacci� de lectura �nicament
	var data = active.transaction(["people"], "readonly");
	// Seleccionar col�lecci�
	var object = data.objectStore("people");
	// Cercar objecte per Id
	var request = object.get(parseInt(id));
	//Format asyn : Cas de trobar el registre
	request.onsuccess = function () {
		
		var result = request.result;
		
		if (result !== undefined) {
			alert("ID: " + result.id + "\n\
			DNI: " + result.dni + "\n\
			Name: " + result.name + "\n\
			Surname: " + result.surname);
		}
	};
	
}
// Mateix proc�s per� cercant per Clau Index (dni)
function loadByDni(dni) {
	var active = dataBase.result;
	var data = active.transaction(["people"], "readonly");
	var object = data.objectStore("people");
	var index = object.index("by_dni");
	
	var request = index.get(String(dni));
	
	request.onsuccess = function () {
		var result = request.result;
		if (result !== undefined) {
			alert("ID: " + result.id + "\n\
			DNI: " + result.dni + "\n\
			Name: " + result.name + "\n\
			Surname: " + result.surname);
		}
	};
	
}
// Mateix proc�s per� cercant per Clau Index
function eliminaReg(id) {
	alert("Eliminar"+id);
	var active = dataBase.result;
	var data = active.transaction(["people"], "readwrite");
	var object = data.objectStore("people");
	//var index = object.index("by_dni");
	
	//var request = index.get(String(dni));
	var request=object.delete(id);
	 //Format asyncron : En cas de creaci� o modificaci� de la funci� anterior OK
	request.onsuccess = function (e) {
		//alert('Database loaded');
		llistatComplert();
	};
	//Format asyncron : En cas d'error
	request.onerror = function (e) {
		alert('Error al netejar database');
	};
	
}
//Transacci� de recuperar tots els registres
function llistatComplert() {
	
	var active = dataBase.result;
	var data = active.transaction(["people"], "readonly");
	var object = data.objectStore("people");
	//Taula JS per emmagatzemar objectes
	var elements = [];
	
	//El cursor ens permet navegar per la col�lecci� d'objectes
	object.openCursor().onsuccess = function (e) {
		var result = e.target.result;

		if (result === null) {
			return;
		}
		//Elements a taula
		elements.push(result.value);
		//navegar pels seg�ents
		result.continue();//El mateix continue() dispara novament un event success
						   //Per tant torna a entrar en aquesta funci� (fins que result===null)
	};
	//Al completar la transacci�, crear presentaci�
	data.oncomplete = function() {
		
		var outerHTML = '';
		
		for (var key in elements) {
			
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].dni + '</td>\n\
				<td>' + elements[key].name + '</td>\n\
				<td>' + elements[key].surname + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Detalls</button>\n\
					<button type="button" onclick="loadByDni(' + elements[key].dni + ');">Detall DNI</button>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">Elimina</button>\n\
				</td>\n\
			</tr>';                        
		}
		
		elements = [];
		document.querySelector("#elementsList").innerHTML = outerHTML;
	};
	
}
//Mateix proc�s per� per llistat complert per noms
//Usant l'index by_name
function llistatComplertByName() {
	
	var active = dataBase.result;
	var data = active.transaction(["people"], "readonly"); //Al ser llistat, amb lectura �s suficient
	var object = data.objectStore("people"); //Col�lecci� escollida en la BD
	var index = object.index('by_name');     //Indexada per by_name
	
	var elements = []; //Contenidor 
	
	index.openCursor().onsuccess = function (e) {
		var result = e.target.result;
		if (result === null) { //Es retorna quan el punter de continue() arriba al final
			return;
		}
		elements.push(result.value); //Afegir en taula d'elements
		result.continue(); //El mateix continue() dispara novament un event success
						   //Per tant torna a entrar en aquesta funci� (fins que result===null)
	 };
	
	data.oncomplete = function() {
		var outerHTML = '';
		for (var key in elements) {
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].dni + '</td>\n\
				<td>' + elements[key].name + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Details</button>\n\
					<button type="button" onclick="loadByDni(' + elements[key].dni + ');">Details DNI</button>\n\
					<button type="button" onclick="eliminaReg(' + elements[key].id + ');">Elimina</button>\n\
				</td>\n\
			</tr>';                        
		}
		elements = [];
		document.getElementById("elementsList").innerHTML = outerHTML;
		//document.querySelector("#elementsList").innerHTML = outerHTML;
	};
}
