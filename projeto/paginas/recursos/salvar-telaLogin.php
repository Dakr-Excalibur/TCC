<?php
session_start();

$erro = "";
if(empty($_POST["txtEmailLogin"]) && trim($_POST["txtEmailLogin"]) == ""){
    echo $erro = "Preencha o campo E-mail!! \n";
}
if(empty($_POST["txtSenhaLogin"]) && trim($_POST["txtSenhaLogin"]) == ""){
    echo $erro =  "Preencha o campo Senha!!";
}

if($erro == ""){
   try{
     require_once('../../includes/conexao/connection.php');

     $email = ($_POST["txtEmailLogin"]);
     $senha = ($_POST["txtSenhaLogin"]);
     
     $SQL = "SELECT * FROM tb_perfil WHERE nm_email = '$email' and nm_senha = '$senha'";
       
      $dados = $conn->query($SQL);
               
     
      foreach($dados as $linha){ 
          $_SESSION['cd'] = $linha['cd_perfil'];
          $_SESSION['nickname'] = $linha['nm_nickname'];
          $_SESSION['dataNasc'] = $linha['dt_nasc'];
          $_SESSION['email'] = $linha['nm_email'];
          $_SESSION['sexo'] = $linha['ds_sexo']; 
          $_SESSION['fotoPerfil'] = $linha['ds_imagem'];             
         if($linha['nm_email'] == $email && $linha['nm_senha'] == $senha){
            echo "sucesso";
            break;      
            
        }else{
           echo "E-MAIL ou SENHA incorreta";
           break;
        }
      }                    
      
       }catch(PDOException $Exception){
           echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
       }
    }
    else{
        echo $erro; 
    }
?>