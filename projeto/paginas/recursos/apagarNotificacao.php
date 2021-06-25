<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $cd_notificacao = $_POST['cdNotificacao'];

    $sql = "DELETE from tb_notificacao where cd_notificacao = '$cd_notificacao'";


    if ($conn->query($sql)) {
        echo "sucesso";
    }else{
        echo "falhou";
    }

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
