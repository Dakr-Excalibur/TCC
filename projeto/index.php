<?php
   require_once('includes/conexao/connection.php');
   session_start();
   session_destroy();
  ?>
<!DOCTYPE html>
<html>
<head>
  <?php
      include ('header.php');
  ?>
  <title>Login</title>
</head>
<body onload="digitar()">

  <?php
      include ('paginas/formularios/formulario-telaLogin.php');
  ?>


</body>
</html>

  <?php
      include ('footer.php');
  ?>

<script src="js/jquery.js" ></script>
<script src="js/bootstrap.js" ></script>
<script src="js/functions.js"></script>
<input type='text' hidden id="txtCdPerfil" value="<?php echo $_SESSION['cd'] ?>">
<input type='text' hidden  id="txtOutroPerfil"  value="<?php echo $_SESSION['cdOutroPerfil']?>" >
