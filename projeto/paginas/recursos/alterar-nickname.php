<?php
$nickname = $_POST['nickname'];
echo $_POST['nickname'];
session_start();

try{
    require_once("..\..\includes\conexao\connection.php");
    $sql = "UPDATE tb_perfil
    set nm_nickname = '$nickname'
    where cd_perfil = '$_SESSION[cd]'";

    $dados = $conn->exec($sql);
    $_SESSION['nickname'] = $nickname;
}catch(PDOException $exception){
    echo "Erro " . $exception->getMessage( ) . "  -  Código " . $exception->getCode( );
}

?>