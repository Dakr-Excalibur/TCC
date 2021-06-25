<?php
session_start();
$erro = "";
if(!isset($_FILES['imGrupo']) || !isset($_POST['nmGrupo']) || !isset($_POST['dsGrupo'])){
  $erro = "Ops, um dos campos não foi preenchido";
}else{
  $nm_grupo = $_POST['nmGrupo'];
  $ds_grupo = $_POST['dsGrupo'];
  $nomeArquivo = $_FILES['imGrupo']['name'];
  $arquivo = $_FILES['imGrupo'];
  $amigos = implode(",", $_POST['amigo']);
  $amigos = explode(",", $amigos);
  echo $nm_grupo;
}

if($erro == ""){
  try{
    require_once('../../includes/conexao/connection.php');

    date_default_timezone_set("America/Sao_Paulo");
    $data = date("Y-m-d");
    $hora = date("H:i");

    $formatosAceitos = array("png", "jpeg", "jpg","gif"); // difinir valores aceitos
    $extensao = pathinfo($_FILES['imGrupo']['name'], PATHINFO_EXTENSION); // pegando extensão do arquivo
    $extensao = strtolower ($extensao); // deiando a extensão em minusculo
    if(in_array($extensao, $formatosAceitos)){  //verificando ser a extensão do arquivo é aceitavel
      $pasta = "../../assets/img/upload/grupo/"; // caminho da pasta
      $nomeTemorario = $_FILES['imGrupo']['tmp_name']; // todo o nome do arquivo (Nome ue  servido gravo a imagem)
      $novoNome = uniqid ( time () ) . '.' . $extensao;       // definir novo unico do arquivo
      $destino = "assets/img/upload/grupo/" . $novoNome;
      if(move_uploaded_file($nomeTemorario, $pasta.$novoNome)){ // move o arquivo para a pasta que eu quero
        $SQL = "INSERT INTO tb_grupo(nm_grupo, ds_grupo, ds_imagem, dt_criacao) VALUES ";
        $SQL = $SQL . '(' . $conn->quote($nm_grupo) . ', ';
        $SQL = $SQL . $conn->quote($ds_grupo) . ', ';
        $SQL = $SQL . $conn->quote($destino) . ', ';
        $SQL = $SQL . $conn->quote($data) . ') ';
        $linhaAfetadas = $conn->exec($SQL);

        $cd_grupo = $conn->lastInsertId();

        $SQL = "INSERT into grupo_perfil(cd_grupo, cd_perfil, ic_administrador) VALUES";
        $SQL = $SQL .  ' (' . $conn->quote($cd_grupo) . ', ';
        $SQL = $SQL . $conn->quote($_SESSION['cd']) . ', ';
        $SQL = $SQL . $conn->quote(1) . ')';
        $conn->exec($SQL);

        foreach ($amigos as $a) {
          $SQL = "INSERT into grupo_perfil(cd_grupo, cd_perfil, ic_administrador) VALUES";
          $SQL = $SQL .  ' (' . $conn->quote($cd_grupo) . ', ';
          $SQL = $SQL . $conn->quote($a) . ', ';
          $SQL = $SQL . $conn->quote(0) . ')';
          $conn->exec($SQL);
        }

      }
    }

  }catch(PDOException $Exception){
    echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
  }
}



?>
