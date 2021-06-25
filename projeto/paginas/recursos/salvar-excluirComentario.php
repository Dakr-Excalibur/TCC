<?php
        try{
            require_once("../../includes/conexao/connection.php");
                          
            $cd_comentario = $_POST['id'];
         
            $sql = "DELETE FROM tb_comentario WHERE cd_comentario = '$cd_comentario';";
                    
            $dados = $conn->query($sql);
            
        }catch(PDOException $exception){
            echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
        }
    
?>

