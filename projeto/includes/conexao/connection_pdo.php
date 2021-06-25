<?php
try{
    $conn=new PDO("$driver:host=$server;dbname=$database",$user,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
   // echo "\n\n conecão realizada \n\n";
    $conn->exec("set names utf8");
    //PDO::ERREMODE_SILENT
    //PDO::ERREMODE_WARNING
    //PDO::ERREMODE_EXEPTION
}
catch(PDOException $Exception){
    echo "Erro: " . $Exception->getMessage() . " - Codigo: " . $Exception->getCode();
    echo "\n\n conecão não realizada \n\n";
    die;
}
?>
