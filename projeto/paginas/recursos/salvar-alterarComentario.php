<?php
        try{
            require_once("../../includes/conexao/connection.php");
                          
              $cd_comentario = $_POST['id'];
              $novoComentario = $_POST['novoComentario'];

         
            $sql = "UPDATE tb_comentario 
                    SET ds_comentario = '$novoComentario'
                    WHERE cd_comentario = '$cd_comentario';";
                    
            $dados = $conn->query($sql);
            
        }catch(PDOException $exception){
            echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
        }
    
?>

