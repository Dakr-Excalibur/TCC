<?php
try{
  require_once("..\..\includes\conexao\connection.php");

  session_start();
  //   $sql = "SELECT * from tb_fornecedor" ;

  if(isset($_POST['mensagem']) && $_POST['mensagem'] != ""){
    $mensagem =  addslashes($_POST['mensagem']);
    $mensagem = $_POST['mensagem'];
  }
  $cd_de = $_SESSION['cd'];
  $cd_para = $_POST['para'];
  $tipoChat = $_POST['tipoChat'];

  if($tipoChat == 'amigo'){
  $sql = "INSERT into tb_chat (ds_mensagem, cd_de, cd_grupo, cd_para, cd_tipo_chat) values";
  $sql = $sql . '(' . $conn->quote($mensagem) . ', ';
  $sql = $sql . $conn->quote($cd_de).  ', ';
  $sql = $sql . 'null' . ', ';
  $sql = $sql . $conn->quote($cd_para) .  ', ';
  $sql = $sql . $conn->quote('1') . ')';
}else if($tipoChat == 'grupo'){
  $sql = "INSERT into tb_chat (ds_mensagem, cd_de, cd_grupo, cd_para, cd_tipo_chat) values";
  $sql = $sql . '(' . $conn->quote($mensagem) . ', ';
  $sql = $sql . $conn->quote($cd_de).  ', ';
  $sql = $sql . $conn->quote($cd_para) . ', ';
  $sql = $sql . 'null' .  ', ';
  $sql = $sql . $conn->quote('2') . ')';
}
  $conn->query($sql);
}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}

?>
