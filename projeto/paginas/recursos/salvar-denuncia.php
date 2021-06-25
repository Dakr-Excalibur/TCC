<?php
session_start();
$erro = "";
if($erro == ""){
        try{
            require_once("../../includes/conexao/connection.php");

            date_default_timezone_Set('America/Sao_Paulo');
            $dt_denuncia = date('y/m/d');
            $cd_postagem = $_SESSION['idPostagemDenuncia'];
            $cd_perfil = 1;
            $tipoDenuncia = "";

            // TODOS SELECIONADOS
            if(isset($_POST["txt1"]) && isset($_POST["txt2"]) && isset($_POST["txt3"])){
                echo $tipoDenuncia = $_POST["txt1"] . ", " . $_POST["txt2"] . ", " . $_POST["txt3"];  }
                
            //SOMENTE o txt1
            if(isset($_POST["txt1"]) && !isset($_POST["txt2"]) && !isset($_POST["txt3"])){ echo $tipoDenuncia = $_POST["txt1"]; }
            //SOMENTE o txt2
            if(!isset($_POST["txt1"]) && isset($_POST["txt2"]) && !isset($_POST["txt3"])){ echo $tipoDenuncia = $_POST["txt2"]; }
            //SOMENTE o txt3
            if(!isset($_POST["txt1"]) && !isset($_POST["txt2"]) && isset($_POST["txt3"])){ echo $tipoDenuncia = $_POST["txt3"]; }

            //SELECIONADOS SÂO OS txt1 e txt2
            if(isset($_POST["txt1"]) && isset($_POST["txt2"]) && !isset($_POST["txt3"]) ){
                echo $tipoDenuncia = $_POST["txt1"] . ", " . $_POST["txt2"];  } 
            //SELECIONADOS SÂO OS txt1 e txt3
            if(isset($_POST["txt1"]) && !isset($_POST["txt2"]) && isset($_POST["txt3"])){
                echo $tipoDenuncia = $_POST["txt1"] . ", " . $_POST["txt3"];  } 
            //SELECIONADOS SÂO OS txt2 e txt3
            if(!isset($_POST["txt1"]) && isset($_POST["txt2"]) && isset($_POST["txt3"])){
                echo $tipoDenuncia = $_POST["txt2"] . ", " . $_POST["txt3"];  }     

            if(isset($_POST['txt4'])){ 
                if(isset($_POST['outroDenuncia']) && !empty($_POST['outroDenuncia'])){
                    echo $tipoDenuncia = $_POST["outroDenuncia"] . "\n"; 
                }else{ echo "input vazio"; }
            }    
            echo "\n";    

            if($tipoDenuncia != ""){
            $sql = $conn->prepare("INSERT INTO tb_tipo_denuncia (nm_tipo_denuncia) 
            values (:nm_tipo_denuncia)");
            $sql->bindParam(':nm_tipo_denuncia', $tipoDenuncia);
            $sql->execute();
            echo "Tipo de denuncia enviada com secesso! \n";

            echo "Tentando pega Max ID \n";
            $sql2 = "SELECT max(cd_tipo_denuncia ) AS id FROM tb_tipo_denuncia;"; 
            $dados = $conn->query($sql2);
            foreach ($dados as $linha){ 
               $maxId = $linha['id'];
               echo "$maxId \n"  ;  
            }

            $sql = $conn->prepare("INSERT INTO tb_denuncia (dt_denuncia, cd_perfil, cd_postagem, cd_tipo_denuncia) 
            values (:dt_denuncia, :cd_perfil, :cd_postagem, :cd_tipo_denuncia)");
            $sql->bindParam(':dt_denuncia', $dt_denuncia);
            $sql->bindParam(':cd_perfil', $cd_perfil);    
            $sql->bindParam(':cd_postagem'  , $cd_postagem);
            $sql->bindParam(':cd_tipo_denuncia'  , $maxId);
            $sql->execute();
            echo "Denuncia enviada com secesso!";
            echo true;
        }else{
            echo "NENHUMA SELECIONADA!";
        }

        }catch(PDOException $exception){
            echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
        }
    }else{
        echo "Erro: " . $erro;
    }
?>