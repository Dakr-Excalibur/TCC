<?php
try{
    require_once("..\..\includes\conexao\connection.php");
    $para = $_POST['para'];
    $tipoChat = $_POST['tipoChat'];
    session_start();
 //   $sql = "SELECT * from tb_fornecedor" ;

    if($tipoChat == "amigo"){
    $SQL = "SELECT p.nm_nickname, c.ds_mensagem, c.cd_de, c.cd_para
    from tb_perfil as p
    inner join tb_chat as c
    on p.cd_perfil = c.cd_de
    where c.cd_tipo_chat = 1
    order by cd_chat asc";
  }else if($tipoChat == "grupo"){
    $SQL = "SELECT p.nm_nickname, c.ds_mensagem, c.cd_de from tb_chat as c
    inner join tb_perfil as p
    on p.cd_perfil = c.cd_de
    where cd_grupo = '$para' ";
  }
  $dados = $conn->query($SQL);
    $result = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($result, JSON_PRETTY_PRINT));





}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}

?>
