<?php
$home = 'active';
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
  <title>Home</title>
</head>

<body onload="notificar(),exibirAmigo(),exibirPostagem(),exibirGrupos()">


  <?php

  include('navbar.php');

  ?>

  <div class="contain">

      <!-- formulario postagem -->
      <div class=" col-12 col-md-6 col-lg-7 " >
        <div class="postar" >

        <?php
        require_once("paginas/formularios/formulario-postagem.php");
        ?>

        <div >
          <input type="submit" class="Exibir" value="Exibir Postagens" onclick="exibirPostagem()">
        </div>

        <div class="BuscarPostagem">
          <!-- <div class="row col-6 col-md-4"> -->
          <!-- <div class="col-5 col-sm-4 col-md-3 col-lg-3">
            <input  id="txtFiltrarPostagem" class="inputText2" name="txtNomeAmigo">
          </div>

          <div class="col-2 col-sm-2  col-md-2 col-lg-1">
            <img class="imgLupa w-100" src="assets/img/icon/lupa.png"   onclick="filtrarPostagem(txtFiltrarPostagem)">
          </div>

          <div class="col-3  col-md-3 col-lg-3">
            <select id="selectTipoPostagem" name="selectTipoPostagem">
              <option value="1" selected>Foto</option>
              <option value="2">Video</option>
              <option value="3">Audio</option>
              <option value="4">Apenas texto</option>
            </select>
          </div>

          <div class="col-2 col-sm-2  col-md-2 col-lg-1">
            <img class="imgLupa w-100" src="assets/img/icon/lupa.png"   onclick="filtrarPostagem(selectTipoPostagem)">
          </div>

          <div class="col-3  col-md-3 col-lg-3">
            <input id="txtDataPostagem" type="date" name="txtDataPostagem" >
          </div>

          <div class="col-2 col-sm-2  col-md-2 col-lg-1">
            <img class="imgLupa w-100" src="assets/img/icon/lupa.png"   onclick="filtrarPostagem(txtDataPostagem)">
          </div> -->

        </div>

        <hr>
  <div id="postagem" class="Postagem" >

  </div>
    </div>


        </div>

     </div>





      <!-- Amigos -->
      <div class="col-md-3 col-lg-3 pl-4 ">
        <div class="divAmigosGrupo">
          <div id="divAmigo">

          </div>
          <div id="divGrupo" class="Grupo">

          </div>
        </div>
      </div>


    </div>
  </div>
  <!-- Modal DENUNCIA -->
  <div class="modal fade" id="modalDenuncia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button>
          <br><br>
          <div id="denunciaModal">

          </div>
          <?php require_once("paginas/formularios/formulario-denuncia.php"); ?>
          <br>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal EXCLUIR -->
  <div class="modal" id="modalExcluir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button>
          <br><br>
          <div id="excluirModal">

          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</body>
<?php
include('footer.php');
?>

</html>
<?php
include('paginas/formularios/modal-removerAmigo.php');
include('paginas/formularios/modal-minichat.php');
?>
