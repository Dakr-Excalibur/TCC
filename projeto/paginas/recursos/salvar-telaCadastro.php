<?php
$erro = "";

if(empty($_POST["txtNicknameCadastro"]) && trim($_POST["txtNicknameCadastro"]) == ""){
    $erro = "Preencha o campo nome!! \n";
}
if(empty($_POST["txtNascimentoCadastro"]) && trim($_POST["txtNascimentoCadastro"]) == ""){
    $erro = "Preencha o campo da Data de Nascimento!! \n";
}
if(empty($_POST["txtEmailCadastro"]) && trim($_POST["txtEmailCadastro"]) == ""){
    $erro = "Preencha o campo E-mail!! \n";
}
if(empty($_POST["txtSenhaCadastro"]) && trim($_POST["txtSenhaCadastro"]) == ""){
    $erro = "Preencha o campo Senha!! \n";
}
if(empty($_POST["txtConfSenhaCadastro"]) && trim($_POST["txtConfSenhaCadastro"]) == ""){
    $erro = "Preencha o campo de confirmação de senha!! \n";
}

if($erro == ""){
    try{
        require_once("../../includes/conexao/connection.php");

        $nome = ($_POST["txtNicknameCadastro"]);
        $nasc = ($_POST["txtNascimentoCadastro"]);
        $img = 'assets/img/upload/perfil/fotoUsuarioPadrao.png';
        if($_POST["txtSexoCadastro"] == 1){ $sexo = "M"; }
        if($_POST["txtSexoCadastro"] == 2){ $sexo = "F"; }
        if($_POST["txtSexoCadastro"] == 3){ $sexo = "I"; }
        $email = ($_POST["txtEmailCadastro"]);
        $senha = ($_POST["txtSenhaCadastro"]);
        $confSenha = ($_POST["txtConfSenhaCadastro"]);

        if($erro == "" && $senha == $confSenha){
        $SQL = "INSERT INTO tb_perfil (nm_nickname, dt_nasc, ds_sexo, nm_email, ds_imagem, nm_senha) VALUE";
        $SQL = $SQL . '(' . $conn->quote($nome) . ', ';
        $SQL = $SQL . $conn->quote($nasc) . ', ';
        $SQL = $SQL . $conn->quote($sexo) . ', ';
        $SQL = $SQL . $conn->quote($email) . ', ';
        $SQL = $SQL . $conn->quote($img) . ', ';
        $SQL = $SQL . $conn->quote($senha) . ') ';

        $linhaAfetadas = $conn->exec($SQL);
        echo "Cadastrado";
        }else{
         echo "Erros: " . $erro . $conn->errorInfo();
        }

    }catch(PDOException $Exception){
        echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
    }
}else{
    echo $erro;
}

?>
