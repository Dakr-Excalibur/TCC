<?php

try{
    require_once("..\..\includes\conexao\connection.php");

    session_start();
    $amigo = $_POST['nomeAmigo'];


    $sql = "CALL buscarAmigo('$_SESSION[cd]', '$amigo')";
    $dados = $conn->query($sql);


    $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($resu, JSON_PRETTY_PRINT));





}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}


 ?>
