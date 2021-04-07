//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
  iniciaVariables();
  associaDOMevents();
  altres();
//altres inicialitzacions......
}

function iniciaVariables(){
  var video1 = document.getElementById("video1");
  var video2 = document.getElementById("video2");
  var video3 = document.getElementById("video3");
  var video4 = document.getElementById("video4");
  //mutejo tots els videos perque els he posat en autoplay
  video1.volume = 0;
  video2.volume = 0;
  video3.volume = 0;
  video4.volume = 0;
}

function associaDOMevents(){
  video1.addEventListener('mouseover', function() {
    verificarVisibilitatVideo(this);
  });
  video2.addEventListener('mouseover', function() {
    verificarVisibilitatVideo(this);
  });
  video3.addEventListener('mouseover', function() {
    verificarVisibilitatVideo(this);
  });
  video4.addEventListener('mouseover', function() {
    verificarVisibilitatVideo(this);
  });
}

//basicament agafo el video com a parametre i miro, si quan paso el mouse per sobre
//el video esta pausat llavors el poso al play, sino, si esta en play el pauso.
function verificarVisibilitatVideo(videoObj){
  if (videoObj.paused) {
    videoObj.play();
  } else {
    videoObj.pause();
  }
}

function altres(){

}