var API_URL= "https://api.github.com";
var USERNAME = "testDSA";
var PASSWORD = "123456a";
//Autenticacion
$.ajaxSetup({
	headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

//boton GET GISTS
$("#button_get_gists").click(function(e){
	e.preventDefault();
	getGists();
});

//boton GET GIST
$("#button_get_gist").click(function(e){
	e.preventDefault();
	if($('#gist_id').val() == ""){
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Debes proporcionar una ID </div>').appendTo($("#gist_result"));
	}else{
		getGist($('#gist_id').val());
	}
});

//boton EDIT GIST
$("#button_edit_gist").click(function(e){
	e.preventDefault();
	if($('#gist_id_edit').val() == ""){
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Debes proporcionar una ID </div>').appendTo($("#update_result"));
	}else{
		getGistToEdit($('#gist_id_edit').val());
	}
});

//boton SAVE GIST
$("#button_save_gist").click(function(e){
	e.preventDefault();
	var gistEditado;
	if($('#description_to_edit').val() == "" || $('#content_to_edit').val()==""){
		$('<div class="alert alert-info">Debes rellenar los campos descripcion y contenido </div>').appendTo($("#update_result"));
	}else{
		gistEditado = {
			"description" : $("#description_to_edit").val(),
			"files" :{
				"archivo1" : {
					"content" : $("#content_to_edit").val()
				}
			}
		}
		editGist(gistEditado);
	}
});

//boton CREATE GIST
$("#button_to_create").click(function(e){
	e.preventDefault();
	var nuevoGist ;
	if($('#description_to_create').val() == "" || $('#content_to_create').val()==""){
		$('<div class="alert alert-info">Debes rellenar los campos descripcion y contenido</div>').appendTo($("#create_result"));
	}else{
		var filename = $('#archivo_to_create').val();
		nuevoGist = {
			"description" : $('#description_to_create').val(),
			"public" : true,
			"files":{
				 "archivo1" :  {
					"content" : $('#content_to_create').val()
				}
			}
		}
		crearGist(nuevoGist);
	}
});

//boton DELETE GIST
$("#button_to_delete").click(function(e){
	e.preventDefault();
	if($('#gist_id_delete').val() ==""){
		$('<div class="alert alert-info">Debes proporcionar una ID</div>').appendTo($("#delete_result"));
	}else{
		deleteGist($("#gist_id_delete").val());
	}
});

//////*Funciones*//////

//obtener una lista de gists
function getGists(){
	var url = API_URL + '/gists/public';
	$("#gists_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data,status,jqxhr){
				var gists = data;
				
				//$.each(gists, function(i,v){
				for (var i=0; i<5; i++){
					var gist = gists[i];
					
					$('<h4> Datos Gist </h4>').appendTo($('#gists_result'));
					$('<p>').appendTo($('#gists_result'));
					$('<strong> ID: </strong>' + gist.id + '<br>').appendTo($('#gists_result'));
					$('<strong> URL: </strong>' + gist.url + '<br>').appendTo($('#gists_result'));
					$('<strong> Descripcion: </strong>' + gist.description + '<br>').appendTo($('#gists_result'));
					$('<strong> Propietario: </strong>' + gist.owner.login + '<br>').appendTo($('#gists_result'));
					$('</p>').appendTo($('#gists_result'));
					console.log(gist);
				};
	}).fail(function(){
		$('#gists_result').text('No hay gists publicos');
	});
}

//obtener un solo gist a partir de su id
function getGist(gist_id){
	var url = API_URL + '/gists/' + gist_id;
	$("#gist_result").text('');
	
	$.ajax({
		url: url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data,status,jqxhr){
				var gist = data;
		
				$('<h4> Datos Gist </h4>').appendTo($('#gist_result'));
				$('<p>').appendTo($('#gist_result'));
				$('<strong> ID: </strong>' + gist.id + '<br>').appendTo($('#gist_result'));
				$('<strong> URL: </strong>' + gist.url + '<br>').appendTo($('#gist_result'));
				$('<strong> Forks: </strong>' + gist.forks_url + '<br>').appendTo($('#gist_result'));
				$('<strong> Commits: </strong>' + gist.commits_url + '<br>').appendTo($('#gist_result'));
				$('<strong> Descripcion: </strong>' + gist.description + '<br>').appendTo($('#gist_result'));
				$('<strong> Propietario: </strong>' + gist.owner.login + '<br>').appendTo($('#gist_result'));
				$('<img src = "' + gist.owner.avatar_url + '" width="100" height="100">').appendTo($('#gist_result'));
				$('</p>').appendTo($('#gists_result'));
				console.log(gist);
			}).fail(function(){
				$('<div class="alert alert-danger"> <strong>Oh!</strong> No se encuentra un Gist con esa ID </div>').appendTo($("#gist_result"));
				
		});
	
}

//obtener un gist para editar
function getGistToEdit(gist_id){
	var url = API_URL + '/gists/' + gist_id;
	$("#update_result").text('');
	
	$.ajax({
		url: url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data,status,jqxhr){
				var gist = data;
				var contenido = "";
				for (var n in gist.files){
					for(var fn in gist.files[n]){
						if (fn == "content") contenido = gist.files[n][fn];
					}
				}
				$('#description_to_edit').val(gist.description);
				$('#content_to_edit').val(contenido);
				console.log(gist);
			}).fail(function(){
				$('<div class="alert alert-danger"> <strong>Oh!</strong> No se encuentra un Gist con esa ID </div>').appendTo($("#update_result"));				
		});
	
}

//guardar los cambios de un gist editado (requiere estar autenticado y que el gist sea tuyo)
function editGist(gistEditado){

	var url = API_URL + '/gists/' + $("#gist_id_edit").val() ;
	var gist = JSON.stringify(gistEditado);
	
	$("#update_result").text('');
	
	$.ajax({
		url: url,
		type : 'PATCH',
		crossDomain :true,
		dataType : 'json',
		data : gist,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Editado</div>').appendTo($("#update_result"));				 
		$("#description_to_edit").val("");
		$("#content_to_edit").val("");
		console.log(data);
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});


}

//crear un nuevo gist (requiere estar autenticado)
function crearGist(nuevoGist){

	var url = API_URL + '/gists';
	var gist = JSON.stringify(nuevoGist);
	

	$("#create_result").text('');
	 
	
	$.ajax({
		url: url,
		type : 'POST',
		crossDomain :true,
		dataType : 'json',
		data : gist,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist creado</div>').appendTo($("#create_result"));				 
		$("#description_to_create").val("");
		$("#content_to_create").val("");
		console.log(data);
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});


}

//borrar un gist (requiere estar autenticado y que el gist sea tuyo)
function deleteGist(id_gist){
	$("#delete_result").text('');
	var url = API_URL + '/gists/' + id_gist;
	$.ajax({
		url: url,
		type : 'DELETE',
		crossDomain :true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Eliminado</div>').appendTo($("#delete_result"));				 
		console.log(data);
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#delete_result"));
	});
}



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	