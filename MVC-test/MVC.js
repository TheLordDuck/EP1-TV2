//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
associaDOMevents();
altres();
//altres inicialitzacions......
}

function associaDOMevents() {
//Associar events de la Vista
//btn02 esta associat directament en HTML (no és el correcte)
  document.getElementById("btn01").onclick = F2;
  document.getElementById("btn01").onmouseenter = F3;
  document.getElementById("btn01").onmouseleave = F4;
  document.getElementById("btn03").onclick = F5;
  document.getElementById("btn04").onmousemove = F6;
 document.getElementById("btn05").onclick = F7;
 }
 
 function altres(){
  var refBTN05=document.getElementById("btn05");
  var att = document.createAttribute("unvalor");       // Crear nou attribut
  att.value = "Miki";                           	   // Inicialitzar-lo
  refBTN05.setAttributeNode(att);					  // Afegir-lo al element                          
}

//Funcions o handles a executar
function F2() {
	alert('Funció F2 activada per onClick');
}
function F3() {
	this.value="Funció F3";
	
}
function F4() {
	this.value="Funció F4";
	
}

function F5() {
	alert('Text boto : '+this.value+' atribut id :'+this.id);
	
}

function F6(event) {
	alert('PosiX : '+event.clientX+' PosiY : '+event.clientY);
	
}
function F7() {
	alert('attribut afegit unvalor : '+this.getAttribute('unvalor'));
	
}



