//Permet esperar la càrrega complerta del DOM
//abans d'associar els events
window.onload = function() {
  associaDOMevents();
  altres();
//altres inicialitzacions......
}

var img1 = document.getElementById("image1");
var img2 = document.getElementById("image2");
var img3 = document.getElementById("image3");
var img4 = document.getElementById("image4");
//modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var span = document.getElementsByClassName("close")[0];

function associaDOMevents(){
  
  //images black color
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

function noResaltarImatge(imgObj, num){
  imgObj.src = "img/"+num+".jpg";
}

function resaltarImatge(imgObj, num){
  imgObj.src = "img/"+num+"b.jpg";
}

// Get the image and insert it inside the modal - use its "alt" text as a caption


function displayModal(num, altText){
  this.src = "img/"+num+".jpg";
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = altText;
}

// When the user clicks on <span> (x), close the modal
function hideModal() {
  modal.style.display = "none";
}