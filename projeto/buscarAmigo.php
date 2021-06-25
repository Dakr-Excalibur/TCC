<?php
$bsucarAmigo = 'active';
require_once("includes/conexao/connection.php");
session_start();
if (!isset($_SESSION['email'])  || !isset($_SESSION['nickname'])) {
  header('location:index.php');
  session_destroy();
  die;
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <?php
  include('header.php');
  ?>
  <title>Buscar amigo</title>
</head>

<body onload="aparecerUsuarios(),notificar()">
  <?php

  include('navbar.php');

  ?>

  <div class='container-fluid'>
    <div class="row row-1">

    <!-- </div> -->
    <div class="divUsuarios">
      <div class="formBuscarUsuario">
        <div>
          <label class="TituloDeB">Digite o nickname do usuario</label>
        </div>

        <div>
              <input type="text" placeholder="Nickname" class="buscaramigo" id="txtBuscarAmigo">
        </div>
        <div>
            <input type="submit"  id='btnBuscarAmigo' value="Buscar" class="botaoPBA">
        </div>

      </div>
      <hr>

      <div class="row">
        <div id="divUsuarios" class="col-md-12  text-center">

        </div>
      </div>

    </div>
  </div>
</div>
</body>
<?php
include('footer.php');
?>

</html>
