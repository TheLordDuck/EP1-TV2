//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
  associaDOMevents();
  altres();
//altres inicialitzacions......
}

//agafo els elements dels 4 videos
var img1 = document.getElementById("image1");
var img2 = document.getElementById("image2");
var img3 = document.getElementById("image3");
var img4 = document.getElementById("image4");
//elements del modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var span = document.getElementsByClassName("close")[0];

function associaDOMevents(){
  img1.addEventListener('mouseover', function(){
    resaltarImatge(img1, 1);
  });
  img1.addEventListener('mouseout', function(){
    noResaltarImatge(img1, 1);
  });
  img2.addEventListener('mouseover', function(){
    resaltarImatge(img2, 2);
  });
  img2.addEventListener('mouseout', function(){
    noResaltarImatge(img2, 2);
  });
  img3.addEventListener('mouseover', function(){
    resaltarImatge(img3, 3);
  });
  img3.addEventListener('mouseout', function(){
    noResaltarImatge(img3, 3);
  });
  img4.addEventListener('mouseover', function(){
    resaltarImatge(img4, 4);
  });
  img4.addEventListener('mouseout', function(){
    noResaltarImatge(img4, 4);
  });
  img1.addEventListener('click', function(){
    displayModal(1, img1.alt);
  });
  img2.addEventListener('click', function(){
    displayModal(2, img2.alt);
  });
  img3.addEventListener('click', function(){
    displayModal(3, img3.alt);
  });
  img4.addEventListener('click', function(){
    displayModal(4, img4.alt);
  });
  span.onclick = hideModal;
}

function altres(){

}

//funcio que li paso el element de la imatge, i el numero, per a poder canviarli el src
//per exemple la imatge de color es diu 1.jpg, i la negra 1b.jpg
//llavors jugo amb aquesta variable per a canviar de imatges
//llavors quan s'executa el src canvia a l'altra imatge negra.
function noResaltarImatge(imgObj, num){
  imgObj.src = "img/"+num+".jpg";
}

//igual que abans pero tornant a la imatge original
function resaltarImatge(imgObj, num){
  imgObj.src = "img/"+num+"b.jpg";
}

//mostrar el modal quan es clica en una foto
function displayModal(num, altText){
  //aqui com que per clicar he d'estar en la imatge, sino faig aixo hem posa
  //al modal la imatge en blanc i negre.
  this.src = "img/"+num+".jpg";
  modal.style.display = "block";
  modalImg.src = this.src;
  //li poso el alt que tenia la imatge al HTML
  captionText.innerHTML = altText;
}

// amagar el modal quan clico a la creu
function hideModal() {
  modal.style.display = "none";
}