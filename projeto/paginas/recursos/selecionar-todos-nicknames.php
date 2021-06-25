<?php
try {
  require_once("..\..\includes\conexao\connection.php");


  $sql = "SELECT nm_nickname from tb_perfil";
  $dados = $conn->query($sql);


  $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
  echo (json_encode($resu, JSON_PRETTY_PRINT));

}catch(PDOException $exception){
  echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}

?>