<?php
try{
    require_once("..\..\includes\conexao\connection.php");

    $de   = $_POST['de'] ;
    $para = $_POST['para'];
    date_default_timezone_set('UTC');
    $data = date("Y-m-d");



    $sql = "INSERT into tb_amigo (dt_amizade, cd_de, cd_para) values";
    $sql = $sql . '(' . $conn->quote($data) . ', ';
    $sql = $sql . $conn->quote($de) . ', ';
    $sql = $sql . $conn->quote($para) . ')';

    if ($conn->query($sql)) {
        $sql = "DELETE  from tb_notificacao where cd_de = '$de' and cd_para = '$para'";
        if($conn->query($sql)){
            echo"sucesso";
        }else{
            echo 'falhou';
        }
    }else{
        echo "falhou";
    }


}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}
?>
