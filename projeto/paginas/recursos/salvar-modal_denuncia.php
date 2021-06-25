<?php
session_start();
$erro = "";
if($erro == ""){
        try{
            require_once("../../includes/conexao/connection.php");
                          
            $cd_postagem = $_POST['id'];
            $_SESSION['idPostagemDenuncia'] = $_POST['id'];
         
            $sql = "SELECT nm_nickname, po.cd_postagem FROM tb_postagem as po
            INNER JOIN tb_perfil as pe ON pe.cd_perfil = po.cd_perfil 
            WHERE po.cd_postagem = '$cd_postagem' ";
                    
            $dados = $conn->query($sql);

            $result = $dados->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result, JSON_PRETTY_PRINT);
            
        }catch(PDOException $exception){
            echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
        }
    }else{
        echo "Erro: " . $erro;
    }

?>

