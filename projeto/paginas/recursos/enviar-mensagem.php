<?php
try{
    require_once("..\..\includes\conexao\connection.php");

   session_start();
 //   $sql = "SELECT * from tb_fornecedor" ;

    if(isset($_POST['mensagem']) && $_POST['mensagem'] != ""){
        $mensagem =  addslashes($_POST['mensagem']);
        $mensagem = $_POST['mensagem'];
    }
    $cd_perfil = $_SESSION['cd'];


    $sql = "INSERT into tb_chat (ds_mensagem, cd_de, cd_grupo, cd_para, cd_tipo_chat) values";
    $sql = $sql . '(' . $conn->quote($mensagem) . ', ';
    $sql = $sql . $conn->quote($cd_perfil).  ', ';
    $sql = $sql . $conn->quote('1') .  ', ';
    $sql = $sql . 'null' . ', ';
    $sql = $sql . $conn->quote('3') . ')';



    if ($conn->query($sql)) {
        // $sql = "SELECT p.nm_nickname, c.ds_mensagem
        // from tb_perfil as p
        // inner join tb_chat as c
        // on p.cd_perfil = c.cd_de or p.cd_perfil =  c.cd_para
        // order by cd_chat asc";
        // $dados = $conn->query($sql);
        //
        //
        // $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
        // echo (json_encode($resu, JSON_PRETTY_PRINT));
    }else{
        echo "falhou";
    }


}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}
?>
