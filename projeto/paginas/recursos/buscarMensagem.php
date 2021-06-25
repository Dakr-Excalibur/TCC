<?php

try{
    require_once("..\..\includes\conexao\connection.php");

    $m = $_POST['mensagem'];

    
    $sql = "CALL buscarMensagem('$m')";
    $dados = $conn->query($sql);


    $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($resu, JSON_PRETTY_PRINT));





}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}


 ?>
