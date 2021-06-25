<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $id = $_POST['id'];

    $sql = "DELETE from tb_amigo where (cd_de = '$_SESSION[cd]' and cd_para = $id) or (cd_de = $id and cd_para = '$_SESSION[cd]')";


    if ($conn->query($sql)) {
        echo "sucesso";

      
    }else{
        echo "falhou";
    }
    

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>