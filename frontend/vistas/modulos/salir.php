<?php

session_destroy();

$url = Ruta::ctrRuta();

if(isset($_SESSION['id_token_google']) && !empty($_SESSION['id_token_google'])){

  unset($_SESSION['id_token_google']);

}

echo '<script>
	
	localStorage.removeItem("usuario");
	// localStorage.clear();

	swal({
		title: "Has cerrado tu sesión",
		type: "success",
		showConfirmButton: true,
		confirmButtonColor: "#3085d6"
	  },function(isConfirm){
		  if(isConfirm){
			window.location = "' . $url . '"
		  }
		})

</script>';