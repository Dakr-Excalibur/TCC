<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $cd_de = $_SESSION['cd'];
    $cd_para = $_POST['cd_para'];

    $sql = "DELETE from tb_notificacao where cd_de = $cd_de and cd_para = $cd_para";


    if ($conn->query($sql)) {
        echo "Solicitação cancelada"; 
    }else{
        echo "falhou";
    } 

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>