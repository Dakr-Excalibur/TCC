<?php
try{
  session_start();
  $id = $_POST['id'];
  require_once('../../includes/conexao/connection.php');
  $SQL = "SELECT * FROM tb_perfil WHERE cd_perfil = '$id'";

  $dados = $conn->query($SQL);

  $result = $dados->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result, JSON_PRETTY_PRINT);

}catch(PDOException $Exception){
  echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
}
?>
