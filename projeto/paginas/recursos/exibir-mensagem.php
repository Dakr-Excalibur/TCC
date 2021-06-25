<?php
try{
    require_once("..\..\includes\conexao\connection.php");

    session_start();
 //   $sql = "SELECT * from tb_fornecedor" ;

    $sql = "SELECT p.nm_nickname, c.ds_mensagem, c.cd_de, c.cd_para, c.cd_chat
    from tb_perfil as p
    inner join tb_chat as c
    on p.cd_perfil = c.cd_de
    where c.cd_tipo_chat = 3
    order by cd_chat asc";
    $dados = $conn->query($sql);


    $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($resu, JSON_PRETTY_PRINT));





}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}

?>
