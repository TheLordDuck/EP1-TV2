//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
  iniciaVariables();
  associaDOMevents();
  altres();
//altres inicialitzacions......
}

function iniciaVariables(){
  var nom = document.getElementById('nom');
  var cognom = document.getElementById('cognom');
  var email = document.getElementById('email');
  var telefon = document.getElementById('telefon');
  var password = document.getElementById('password');
  var confirm_password = document.getElementById('confirm_password');
  //confirm_password.setCustomValidity("Ha de ser igual a la password de dalt.");
  var dataNaix = document.getElementById('dataNaix');
  //faig el calcul aquest per a posar l'atribut max del input al dia actual
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //Gener es el 0, per aixo sumo 1
  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  } 
  if(mm<10){
    mm='0'+mm
  } 
  today = yyyy+'-'+mm+'-'+dd;
  //aplico el calcul a l'atribut
  document.getElementById("dataNaix").setAttribute("max", today);
  var adreca = document.getElementById('adreca');
  var poblacio = document.getElementById('poblacio');
  var pais = document.getElementById('pais');
  var codiPostal = document.getElementById("codiPostal");
  var iban = document.getElementById('iban');

  //missatges d'error personalitzats, que apareixen al costat de cada camp
  var nomSuggestMessage = document.getElementById('nomSuggestMessage');
  var cognomSuggestMessage = document.getElementById('cognomSuggestMessage');
  var emailSuggestMessage = document.getElementById('emailSuggestMessage');
  var telefonSuggestMessage = document.getElementById('telefonSuggestMessage');
  var passwordSuggestMessage = document.getElementById('passwordSuggestMessage');
  var confirmPasswordSuggestMessage = document.getElementById('confirmPasswordSuggestMessage');
  var adrecaSuggestMessage = document.getElementById('adrecaSuggestMessage');
  var poblacioSuggestMessage = document.getElementById('poblacioSuggestMessage');
  var paisSuggestMessage = document.getElementById('paisSuggestMessage');
  var tipusEspSuggestMessage = document.getElementById('tipusEspSuggestMessage');
  var codiPostalSuggestMessage = document.getElementById('codiPostalSuggestMessage');
  var ibanSuggestMessage = document.getElementById('ibanSuggestMessage');
}

function associaDOMevents(){
  //asocio els elements d'input amb una funcio
  btn.onclick = crearCookie;
  btnCookie.onclick = mostrarCookie;
  btnDeleteCookie.onclick = borrarCookie;
  nom.addEventListener('input', function() {
    validacion(nom, nomSuggestMessage, 'Primera en majuscula.');
  });
  cognom.addEventListener('input', function() {
    validacion(cognom, cognomSuggestMessage, 'Primera en majuscula.');
  });
  email.addEventListener('input', function() {
    validacion(email, emailSuggestMessage, '2 char minim (@) 2 char minim (.) 2 char minim.');
  });
  telefon.addEventListener('input', function() {
    validacion(telefon, telefonSuggestMessage, "Ha de ser d'andorra (376-) mes (3 o 6 o 8) i 5 numeros finals.");
  });
  password.addEventListener('input', function() {
    validacion(password, passwordSuggestMessage, '2 numeros, 1 majuscula, i llargada minima de 6');
  });
  confirm_password.oninput = verificarConfirmarPassword;
  adreca.addEventListener('input', function() {
    validacion(adreca, adrecaSuggestMessage, 'Primera en majuscula.');
  });
  poblacio.addEventListener('input', function() {
    validacion(poblacio, poblacioSuggestMessage, 'Primera en majuscula.');
  });
  pais.addEventListener('input', function() {
    validacion(pais, paisSuggestMessage, 'Primera en majuscula.');
  });
  codiPostal.addEventListener('input', function() {
    validacion(codiPostal, codiPostalSuggestMessage, 'Ha de ser AD100 o AD200 fins a AD700');
  });
  iban.addEventListener('input', function() {
    validacion(iban, ibanSuggestMessage, "Ha de ser de l'estil ADXX-YYYY-ZZZZ-AAAA-AAAA-AAAA, on XX es el codi de pais, YYYY el codi del banc, ZZZZ es la sucursal del banc i els 12 A els el codi del client. XX del 00 al 99, YYYY nomes poden ser 0001, 0007, 0008 o 0025 i ZZZZ nomes pot ser 0000, 0001, 0002 i 0003 despres A son valors del 0 al 9");
  });
}

function altres(){

}

//validacio(input, errObj, errText)
//input es l'element que crida a la funcio, podria haber fet servir el this.
//errObj es l'element div on hi va el missatge d'error al costat del camp
//errText es el text que es posa al HTML per a fer saber a l'usuari que si el camp
//    esta en .checkValidity == false, vol dir que el camp no compleix el pattern.
function validacion(input, errObj, errText){
  //miro si el input esta validat
  if(!input.checkValidity()){
    //si esta poso el text al HTML
    errObj.innerHTML = errText;
  } else {
    //sino poso un text buit al HTML
    errObj.textContent = '';
  }
  //crido a la funcio per saber si despres dels canvis fets al input he de mostrar el boto 
	updateRegisterButton();
}

//funcio que mostra el boto si el formulari esta validat
function updateRegisterButton(){
  var formulario = document.querySelector("form[name='miformulario']");
  if(formulario.checkValidity()){
    btn.hidden = false;
  } else {
    btn.hidden = true;
	 btnCookie.hidden = true;
	 btnDeleteCookie.hidden = true;
  }
}

function verificarConfirmarPassword(){
  if(this.value != password.value || this.value==""){
    this.setCustomValidity("Ha de ser igual a la password de dalt.");
    confirmPasswordSuggestMessage.innerHTML = "Password ha de ser igual a la de dalt";
  } else {
    this.setCustomValidity("");
    confirmPasswordSuggestMessage.textContent = '';
  }
}

//funcio que crea les cookies amb els valors de l'usuari
//posem la expired date a l'any 9999 per a que no venci.
//aquesta funcio s'activa quan cliquem a registrar, llavors al final mostrem els dos botons
function crearCookie(){
  var tipusEsp = document.getElementById('tipusEsp').getElementsByTagName("input");
  document.cookie = "nom="+nom.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "cognom="+cognom.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "email="+email.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "telefon="+telefon.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "password="+password.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "dataNaixement="+dataNaix.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "adreca="+adreca.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "poblacio="+poblacio.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "pais="+pais.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "codiPostal="+codiPostal.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  for(var i = 0; i < tipusEsp.length; i++){
    if(tipusEsp[i].checked){
      document.cookie="Opcio"+(i+1)+"="+tipusEsp[i].value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
    }
  }
  document.cookie = "IBAN="+iban.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  //mostrar botons de veurecookie i borrarcookie
  btnCookie.hidden = false;
  btnDeleteCookie.hidden = false;
}

//funcio que mostra les cookies en un alert
function mostrarCookie(){
  alert(document.cookie);
}

//esborra totes les cookies posant un expired date que ja ha pasat, com per exemple 1970
function borrarCookie(){
  var tipusEsp = document.getElementById('tipusEsp').getElementsByTagName("input");
  document.cookie = "nom= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "cognom= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "telefon= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "password= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "dataNaixement= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "adreca= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "poblacio= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "pais= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "codiPostal= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  for(var i = 0; i < 3; i++){
    document.cookie = "Opcio"+(i+1)+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  }
  document.cookie = "IBAN= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

///Elements jquery
//Verificar que s'ha de posar com a minim un checkbox del tipus d'espectacle
$(document).ready(function(){
    var checkboxes = $('.checkboxes');
    checkboxes.change(function(){
        if($('.checkboxes:checked').length>0) {
            checkboxes.removeAttr('required');
            tipusEspSuggestMessage.textContent = '';
        } else {
            checkboxes.attr('required', 'required');
            tipusEspSuggestMessage.innerHTML = "Escull almenys una.";
        }
    });
});
    