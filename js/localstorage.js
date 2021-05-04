window.onload = function() {
	document.getElementById("data-hora").innerHTML ="";
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	if(isNaN(localStorage.getItem("copsVisitat"))){
		window.localStorage.setItem("copsVisitat",1);
	}
	if(isNaN(localStorage.getItem("localstorage_TimesVisited"))){
		window.localStorage.setItem("localstorage_TimesVisited",1);
	}
	var x = parseInt(localStorage.getItem("copsVisitat"))+1;
	var y = parseInt(localStorage.getItem("localstorage_TimesVisited"))+1;
	if(window.localStorage != undefined ){
  		window.localStorage.setItem("dataHoraUltimaSessio",dateTime);
  		window.localStorage.setItem("copsVisitat",x);
  		document.getElementById("data-hora").innerHTML ="<h2> dataHoraUltimaSessio val : "+localStorage.getItem("dataHoraUltimaSessio")+"</h2>";
  		document.getElementById("copsVisitat").innerHTML ="<h2> copsVisitat val : "+localStorage.getItem("copsVisitat")+"</h2>";
		window.localStorage.setItem("localstorage_TimesVisited",y);
		window.localStorage.setItem("lastWebVisited", 'localstorage.html');
		//  localStorage.removeItem("unaVar"); //Elimina contingut
	}

}