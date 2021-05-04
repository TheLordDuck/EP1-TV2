window.onload = function() {
	if(isNaN(localStorage.getItem("localstorage2_TimesVisited"))){
		window.localStorage.setItem("localstorage2_TimesVisited",1);
	}
	var y = parseInt(localStorage.getItem("localstorage2_TimesVisited"))+1;
	if(window.localStorage != undefined ){
  		window.localStorage.setItem("localstorage2_TimesVisited",y);
		window.localStorage.setItem("lastWebVisited", 'localstorage2.html');
		//  localStorage.removeItem("unaVar"); //Elimina contingut
	}

}