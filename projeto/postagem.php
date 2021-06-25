<?php
require_once("includes/connections/connection.php");
?>

<!DOCTYPE html>
<html>
<head>
	<?php
	include ('header.php'); 
	?>
	<title>Postagem</title>
</head>
<body>     
	<?php

	include('navbar.php');

	?>
	<div class="telaL">
		<?php
		require_once("paginas/formulario/formulario-postagem.php");
		?>
	</div>
</body>
</html>

<?php
include ('footer.php'); 
?>

