<?php

$erro = "";
    session_start();
if(isset($_POST['comentario']) && trim($_POST['comentario']) != "" && !empty($_POST['comentario'])){
    date_default_timezone_set('America/Sao_Paulo');
    $ds_comentario = $_POST['comentario'];
    $dt_comentario =  date("Y/m/d");
    $hr_comentario =  date('H:i:s');
    $cd_postagem = $_POST['id'];
    $cd_perfil = $_SESSION['cd'];
}else{
    $erro = "Digite algo no comentário";
}

    if($erro == ""){
        try{
            require_once("../../includes/conexao/connection.php");

            $sql = $conn->prepare("INSERT INTO tb_comentario (ds_comentario, dt_comentario,
            hr_comentario,  cd_postagem, cd_perfil)
            values (:ds_comentario, :dt_comentario, :hr_comentario,:cd_postagem, :cd_perfil)");
            $sql->bindParam(':ds_comentario', $ds_comentario);
            $sql->bindParam(':dt_comentario', $dt_comentario);
            $sql->bindParam(':hr_comentario', $hr_comentario);
            // $conn->bindParam(':qt_comentario', $cd);
            $sql->bindParam(':cd_postagem'  , $cd_postagem);
            $sql->bindParam(':cd_perfil', $cd_perfil);

            $sql->execute();
            echo "Comentário enviado com secesso!";

// ('1', 'show', '2019-04-07', '19:03','1', '1', 1),
        }catch(PDOException $exception){
            echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
        }
    }else{
        echo "Erro: " . $erro;
    }
?>
