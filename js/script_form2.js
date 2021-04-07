//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
  associaDOMevents();
  altres();
//altres inicialitzacions......
}
//variables que necesito per a crear el modal quan es premi al boto
var modal = document.getElementById("myModal");
var myBtn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close-form")[0];
//varaibles que hi han dintre del modal, com l'usuari, la password i el boto de login
var username = document.getElementById("username");
var password = document.getElementById("password");
var btn = document.getElementById("btn");
var loginMsg = document.getElementById("loginMsg");

function associaDOMevents(){
  //al clicar el primer boto mostrara el formulari modal
  myBtn.onclick = mostrarModal;
  //es la creu que surt a la dreta per a tancar el modal
  span.onclick = tancarModal;
  //al clicar el boto del form modal s'executara la validacio de l'usuari
  btn.onclick = validarLogin;
}

//mostro la pantalla modal
function mostrarModal(){
  modal.style.display = "block";
}

//poso el form modal no visible
function tancarModal(){
  modal.style.display = "none";
}

//compara el username i password de l'usuari amb la per defecte
//i mostra el missatge del resultat de la validacio
function validarLogin(){
  var defaultUser = "root";
  var defaultPassword = "root"; 
  var userInp = username.value;
  var passInp = password.value;
  if(userInp == defaultUser && passInp == defaultPassword){
    loginMsg.innerHTML = "Login OK: "+"user="+userInp+" i password="+passInp;
  } else {
    loginMsg.innerHTML = "Error Login No Correcte: user="+userInp+" i password="+passInp;
  }
  
}

//funcio que permet sortir del modal si clico fora del mateix modal
/*
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/

function altres(){

}