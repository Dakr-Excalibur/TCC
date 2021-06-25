<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $cd_grupo = $_POST['cd_grupo'];


    $sql = "DELETE from grupo_perfil where cd_perfil = '$_SESSION[cd]' and cd_grupo = '$cd_grupo'";


    if ($conn->query($sql)) {
        echo "sucesso";


    }else{
        echo "falhou";
    }


} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
