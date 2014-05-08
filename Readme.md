Uso de Bootstrap y JQuery para la crear, editar, consultar y borrar gits a traves de la api de github

	Consultar lista:
		Apretar el boton "Get Gists". Devolvera los ultimos 5 gists publicos
		
	Consultar un gist:
		Introducir la ID del gist en su correspondiente campo y apretar "Get Gist". Devolvera la informacion de un Gist.
		
	Editar Gist:
		Introducir la ID del gist en su correspondiente campo y apretar "Edit Gist". Rellenara los campos 'descripcion' y 'contenido' con los del gist actual.
		Modificar dichos cambios y apretar "Save Gist" para actualizar el gist
		La ID del gist a modificar debe ser de un gist del cual seas el autor.
		
	Crear Gist:
		Rellenar los datos del apartado 'Crear un nuevo Gist' y apretar "Create Gist". Se creara un Gist con dicha informacion asociado a tu cuenta (cambiar valores de username y password en el archivo gist.js)
		
	Borrar Gist:
		Introducir la ID del gist en su correspondiente campo y apretar "Delete Gist". Se eliminara el Gist con dicha ID.
		

A veces tarda un poco en aplicar los cambios ya que los recoge de cache. Es decir, si editas un Gist y vuelves a consultar su valor, quizas no devuelva los nuevos hasta pasados unos segundos.