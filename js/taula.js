$(document).ready(function() {
$('#files').pageMe({
pagerSelector: '#developer_page',
showPrevNext: true,
hidePageNumbers: false,
perPage: 3
});
});

function pagination(){
		var req_num_row=5;  //Paginació a 10 elements
		var $tr=$('tbody tr'); //Selecció de les files de la taula 
		var total_num_row=$tr.length; //Comptem les files
		var num_pages=0;
		if(total_num_row % req_num_row ==0){ //Cas de múltiple de 10
			num_pages=total_num_row / req_num_row; //Obtenir nombre de pàgines
		}
		if(total_num_row % req_num_row >=1){//Cas de no múltiple, sumar 1 pàgina més
			num_pages=total_num_row / req_num_row;
			num_pages++;
			num_pages=Math.floor(num_pages++); //arrodonir a la baixa
		}
		for(var i=1; i<=num_pages; i++){
			$('#pagination').append("<a class='paginationButton' href=#> "+i+"</a>"); //Dibuixar números de pàgina com enllaços
		}
		$tr.each(function(i){
			$(this).hide(); //Amaga totes les files inicialment
			if(i+1 <= req_num_row){ //Presentar els 5 elements de la pàgina actual
				$tr.eq(i).show();
			}

		});
		$('#pagination a').click(function(e){//tractar vels números de pàgina
			e.preventDefault(); //Evitar que es tractin com enllaços (event per a defecte)
			$tr.hide(); //Amaga totes les files
			var page=$(this).text(); //Recupera el click sobre el número de pàgina
			var temp=page-1;
			var start=temp*req_num_row; //Inici és Np-1*Nombre de files a mostrar
			
			for(var i=0; i< req_num_row; i++){ //Presentar els 5 elements
				$tr.eq(start+i).show();

			}
		});
	}
$('document').ready(function(){
	pagination();
});
