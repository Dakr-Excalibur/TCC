<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $cd_de = $_SESSION['cd'];
    $cd_para = $_POST['cd_para'];
    $tipo_notificacao = '7';


    $sql = "INSERT into tb_notificacao (ic_status,  cd_de, cd_para, cd_tipo_notificacao) value ";
    $sql = $sql . '(' . $conn->quote(0) . ', ';
    $sql = $sql . $conn->quote($cd_de) . ', ';
    $sql = $sql . $conn->quote($cd_para) . ',';
    $sql = $sql . $conn->quote($tipo_notificacao) . ')';


    if ($conn->query($sql)) {
     echo "Solicitação enviada";


    }else{
        echo "falhou";
    }





} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
