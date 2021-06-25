<?php
$chat = 'active';
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
  include ('header.php');
  ?>
  <title>Chat</title>
</head>

<body class="boryChat" onload="repetir('null'), notificar() ,exibirAmigosGrupoChat()">
  <?php

  include('navbar.php');

  ?>
  <div class="container container-chat">
    <div class="text-center">
      <h1 >Chat</h1>
    </div>
    <div class="row ">

      <div id="divChat" class="divChat  col-11 mx-auto">

      </div>
      <!-- <div class="row col-11 mx-auto bg-primary divOpcoesChat p-2">

        <div class="col-5 col-sm-4 col-md-3">
          <input  id="txtBuscarMensagemChat" class="inputText2">
        </div>
        <div class="col-2  col-md-1">
          <img class="imgLupa w-75" src="assets/img/icon/lupa.png"   onclick="buscarMensagemChat(txtBuscarMensagemChat)">
        </div>

      </div> -->
    </div>
    <form id="formChat">
      <div class="row mx-auto col-12 mx-auto  my-3">
        <div class="col-9   ">
          <textarea id="txtMensagem" class="txtMensagem mx-1" placeholder="Digite Algo"></textarea>
        </div>
        <div class="col-3"> 
          <input type="submit" class="button2-os" id="btnEnviarChat" value="Enviar">
          <input type="submit" class="button2-os" id="btnEnviarChatAmigoGrupo" hidden onclick="enviarMensagemChat()" value="Enviar">
        </div>
      </div>
      <input hidden id="txtTipoChat">
      <input hidden id="txtPara">
    </form>
    <!-- <div class="row">
    <h3 class="mx-auto col-12 text-center writeSlow text-justify">Seja Bem Vindo ao Chat <?php
    // echo $_SESSION['nickname'];?>.</h3>



  </div> -->
  <div id='amigosGrupoChat'  >
    <div class="row">
      <div id='divAmigo' class="col-10 offset-1">

      </div>
      <div id='divGrupo' class="col-10 offset-1 ">

      </div>
    </div>
  </div>
</div>
</body>
<?php
include ('footer.php');
?>
<input id="nomeChat" hidden value="<?php
echo $_SESSION['nickname'];?>">
</html>
