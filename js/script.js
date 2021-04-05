class Model {
  constructor() {

  }
}

class View {
  constructor() {

  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const app = new Controller(new Model(), new View())

//Verificar que s'ha de posar com a minim
// un checkbox del formulari
//fet amb jquery
$(document).ready(function(){
    var checkboxes = $('.checkboxes');
    checkboxes.change(function(){
        if($('.checkboxes:checked').length>0) {
            checkboxes.removeAttr('required');
        } else {
            checkboxes.attr('required', 'required');
        }
    });
});


//tendre que ordenarlo bien donde toque, en el modelo, vista o controlador, ya mirare
var btn, formulario, nom, cognom;
function iniciar(){
  btn = document.getElementById("btn");
  formulario = document.querySelector("form[name='miformulario']");
  nom = document.getElementById('nom').getElementsByTagName('input');
  cognom = document.getElementById('cognom').getElementsByTagName('input');
  email = document.getElementById('email').getElementsByTagName('input');
  telefon = document.getElementById('telefon').getElementsByTagName('input');
  passwd = document.getElementById('passwd').getElementsByTagName('input');
  dataNaix = document.getElementById('dataNaix').getElementsByTagName('input');
  adreca = document.getElementById('adreca').getElementsByTagName('input');
  poblacio = document.getElementById('poblacio').getElementsByTagName('input');
  pais = document.getElementById('pais').getElementsByTagName('input');
  //este no tiene input, hay que cambiarlo
  codiPostal = document.getElementById('codiPostal').getElementsByTagName('select');
  //para saber el valor en selectedIndex usar 
  //--> 
  //--> codiPostal[0][codiPostal[0].options.selectedIndex].value
  //este tiene 3 inputs entonces tipusEsp[0], tipusEsp[1], tipusEsp[2] son los valores de los checkbox
  tipusEsp = document.getElementById('tipusEsp').getElementsByTagName('input');
  //no tiene inputs, ver como hay que hacerlo
  codiBancari = document.getElementById('codiBancari').getElementsByTagName('input');
  //no tiene inputs, hay que ver como lo hago
  codiSucursal = document.getElementById('codiSucursal').getElementsByTagName('input');
  numBanc = document.getElementById('numBanc').getElementsByTagName('input');

  //missatges d'error personalitzats, que apareixen al costat de cada camp
  nomSuggestMessage = document.getElementById('nomSuggestMessage');
  cognomSuggestMessage = document.getElementById('cognomSuggestMessage');
  
  nom[0].addEventListener("input", myfunc.validacion_nom);
  cognom[0].addEventListener("input", myfunc.validacion_cognom);
  btn.onclick = crearCookie;
}

myfunc = function(){
  var flag = true;
  function validacion_nom(){
    if(!nom[0].checkValidity()){
      nomSuggestMessage.style.visibility = "visible";
    } else {
      nomSuggestMessage.style.visibility = "hidden";
    }
    updateRegisterButton();
  }
  function validacion_cognom(){
    if(!cognom[0].checkValidity()){
      cognomSuggestMessage.style.visibility = "visible";
    } else {
      cognomSuggestMessage.style.visibility = "hidden";
    }
    updateRegisterButton();
  }
  function updateRegisterButton(){
    if(formulario.checkValidity()){
      btn.hidden = false;
    } else {
      btn.hidden = true;
    }
  }
  return{
    validacion_nom:validacion_nom,
    validacion_cognom:validacion_cognom,
    updateRegisterButton:updateRegisterButton
  }
}();

function crearCookie(){
  setCookie();
}

function setCookie(){
  document.cookie = "user=Flavio";
  alert(document.cookie);
}

addEventListener("load", iniciar);