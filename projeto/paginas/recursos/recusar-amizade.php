<?php
try{
    require_once("..\..\includes\conexao\connection.php");

    $de   = $_POST['de'] ;
    $para = $_POST['para'];
    date_default_timezone_set('UTC');
    $data = date("Y-m-d");
  


        $sql = "DELETE  from tb_notificacao where cd_de = '$de' and cd_para = $para";
        if($conn->query($sql)){
            echo"sucesso";
        }else{
            echo 'falhou';
        }


}catch(PDOException $exception){
    echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
}

?>