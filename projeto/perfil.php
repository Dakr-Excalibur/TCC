<?php
$perfil = 'active';
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
  <title>Perfil</title>
</head>

<body onload="notificar(), exibirAmigo(), exibirGrupos(), exibirMinhasPostagensBasica()">
  <?php

  include('navbar.php');

  ?>

  <div class='container-fluid'>
    <div class="row row-1">
      <!-- perfil -->

      <div class="col-12 col-md-3 col-lg-2" >

          <div class="col-12 divManterPerfil " >
            <div id="divFotoPerfil" class="divFotoPerfil " onclick="aparecerModal('modalAlterarImagem')">
              <div class="row">
                <img id="imgPerfil" class="fotoPerfil" src="<?php echo $_SESSION['fotoPerfil'] ?>">
                <figcaption>Alterar foto</figcaption>
              </div>
            </div>

            <div class="col-12">
            <label class="labelNickname">
            <p> <?php // echo $_SESSION['nickname'];  ?> </p>
          </label>
        </div>
        <hr>
        <div class="row bg-light text-center">
        <div class="col-12">
          <h6 onclick="aparecerModal('modalAlteraNickname')">Alterar Nickname</h6>
          <h6 onclick="aparecerModal('modalCriarGrupo'),adicionarAmigosGrupo()">Criar Grupo</h6>
        </div>
      </div>
      </div>
      <br>
  </div>

 <div class="col-12 col-md-6 col-lg-7 pt-3 postagem text-center">
      <h5>Minhas Postagens</h5>
      <!-- <div class="row col-12  mx-auto bg-primary divBuscarPostagem p-3 justify-content-center align-items-center">

        <div class="col-8  col-md-4">
          <select id="selectTipoDenuncia" name="selectTipoDenuncia">
            <option value="Discurso de ódio" selected>Discurso de ódio</option>
            <option value="Racismo">Racismo</option>
            <option value="Xingamentos">Xingamentos</option>
            <option value="Xenofobia">Xenofobia</option>
            <option value="Nudez">Nudez</option>


          </select>
        </div>

          <div class="col-2 col-sm-2  col-md-2 col-lg-1">
            <img class="imgLupa w-100" src="assets/img/icon/lupa.png"   onclick="filtrarPostagem(selectTipoDenuncia)">
          </div> -->


      <!-- </div> -->
    <div id="minhasPostagens" >


    </div>
  </div>

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


<?php
include('paginas/formularios/modal-alterarNickname.php');
include('paginas/formularios/modal-alterarImagem.php');
include('paginas/formularios/modal-removerAmigo.php');
include('paginas/formularios/modal-criarGrupo.php');
include('paginas/formularios/modal-sucesso.php');
include('paginas/formularios/modal-amigos.php');
include('paginas/formularios/modal-minichat.php');
?>
