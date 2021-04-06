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
  var dataNaix = document.getElementById('dataNaix');
  //posar que el maxim de data sigui el dia actual
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  } 
  if(mm<10){
    mm='0'+mm
  } 
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("dataNaix").setAttribute("max", today);
  var adreca = document.getElementById('adreca');
  var poblacio = document.getElementById('poblacio');
  var pais = document.getElementById('pais');
  var codiPostal = document.getElementById("codiPostal");
  var codiBancari = document.getElementById('codiBancari');
  var codiSucursal = document.getElementById('codiSucursal');
  var numBanc = document.getElementById('numBanc');

  //missatges d'error personalitzats, que apareixen al costat de cada camp
  var nomSuggestMessage = document.getElementById('nomSuggestMessage');
  var cognomSuggestMessage = document.getElementById('cognomSuggestMessage');
  var emailSuggestMessage = document.getElementById('emailSuggestMessage');
  var telefonSuggestMessage = document.getElementById('emailSuggestMessage');
  var passwordSuggestMessage = document.getElementById('emailSuggestMessage');
  var adrecaSuggestMessage = document.getElementById('emailSuggestMessage');
  var poblacioSuggestMessage = document.getElementById('emailSuggestMessage');
  var paisSuggestMessage = document.getElementById('emailSuggestMessage');
  var tipusEspSuggestMessage = document.getElementById('tipusEspSuggestMessage');
}

function associaDOMevents(){
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
  adreca.addEventListener('input', function() {
    validacion(adreca, adrecaSuggestMessage, 'Primera en majuscula.');
  });
  poblacio.addEventListener('input', function() {
    validacion(poblacio, poblacioSuggestMessage, 'Primera en majuscula.');
  });
  pais.addEventListener('input', function() {
    validacion(pais, paisSuggestMessage, 'Primera en majuscula.');
  });
}

function altres(){

}

function validacion(input, errObj, errText){
  if(!input.checkValidity()){
    errObj.innerHTML = errText;
  } else {
    errObj.textContent = '';
  }
  updateRegisterButton();
}

function updateRegisterButton(){
  var formulario = document.querySelector("form[name='miformulario']");
  if(formulario.checkValidity()){
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
}

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
  document.cookie = "codiBancari="+codiBancari.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "codiSucursal="+codiSucursal.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  document.cookie = "numBanc="+numBanc.value+"; expires=Thu, 31 Dec 9999 23:59:59 GMT";
  btnCookie.hidden = false;
  btnDeleteCookie.hidden = false;
}

function mostrarCookie(){
  alert(document.cookie);
}

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
  document.cookie = "codiBancari= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "codiSucursal= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "numBanc= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

///Elements jquery
//Verificar que s'ha de posar com a minim
// un checkbox del formulari
//fet amb jquery
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
    