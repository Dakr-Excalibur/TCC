<?php
require_once("includes/conexao/connection.php");
session_start();
?>

<!DOCTYPE html>
<html>
<head>
	<?php
	include ('header.php');
	?>
	<title>Visualizar perfil</title>
</head>
<body onload="postagemOutroPerfil(),amigosOutroPerfil(),exibirDadosPerfil()">
	<?php

	include('navbar.php');

	?>

	<div class='container-fluid'>
		<div class="row ">

			<div class="col-12">
				<div id="divFotoPerfil" class="divFotoPerfil" onclick="aparecerModal('modalAlterarImagem')">
					<img id="imgPerfil" class="fotoPerfil" src="<?php echo $_SESSION['fotoPerfil'] ?>">
				</div>
			</div>
		</div>
		<hr class='col-12' >
		<div class="row">
			<div class="col-12 col-md-3 ml-3">
				<div class="row col-12 infoOutroPerfil">
					<p class='col-12' id="nicknameOutroPerfil">Nickname: </p>
					<p class='col-12' id="dataNascOutroPerfil">Data de nascimento: </p>
					<div class='col-12' id="sexoOutroPerfil">
						Sexo:
					</div>
				</div>
			</div>
			<hr class="hrMobile col-12">
			<div class="offset-md-1 col-11 col-md-8 ml-3" id="minhasPostagens">
			</div>
		</div>
	</div>
</body>
<?php
include('footer.php');
?>

</html>


<?php
?>
