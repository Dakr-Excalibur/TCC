<?php
$erro = "";

session_start();
if(!isset($_FILES['txtimagem'])){
    $erro = "Arquivo vazio";

}else{
    $nome = $_FILES['txtimagem']['name'];
    $arquivo = $_FILES['txtimagem'];
}

if($erro == ""){
    try{
    require_once("..\..\includes\conexao\connection.php");
       date_default_timezone_set("America/Sao_Paulo");
    //    date_default_timezone_set('UTC');
       $data = date("Y-m-d");
       $hora = date("H:i");


    //    $formatosAceitos = array("png", "jpeg", "jpg","gif"); // difinir valores aceitos
    //    $extensao = pathinfo($_FILES['txtimagem']['name'], PATHINFO_EXTENSION); // pegando extensão do arquivo
    //    $extensao = strtolower ($extensao); // deiando a extensão em minusculo
    //    if(in_array($extensao, $formatosAceitos)){  //verificando ser a extensão do arquivo é aceitavel
    //    $pasta = "../../assets/img/upload/perfil/"; // caminho da pasta
    //    $nomeTemorario = $_FILES['txtimagem']['tmp_name']; // todo o nome do arquivo (Nome ue  servido gravo a imagem)
    //    $novoNome = uniqid ( time () ) . '.' . $extensao;       // definir novo unico do arquivo
    //    $destino = "assets/img/upload/perfil/" . $novoNome;
    //    if(move_uploaded_file($nomeTemorario, $pasta.$novoNome)){ // move o arquivo para a pasta que eu quero
    //     // echo "Upload feito com sucesso!";
    $formatosAceitos = array("png", "jpeg", "jpg","gif"); // difinir valores aceitos
    $extensao = pathinfo($_FILES['txtimagem']['name'], PATHINFO_EXTENSION); // pegando extensão do arquivo
    $extensao = strtolower ($extensao); // deiando a extensão em minusculo
    if(in_array($extensao, $formatosAceitos)){  //verificando ser a extensão do arquivo é aceitavel
    $pasta = "../../assets/img/upload/perfil/"; // caminho da pasta
    $nomeTemorario = $_FILES['txtimagem']['tmp_name']; // todo o nome do arquivo (Nome ue  servido gravo a imagem)
 //    $novoNome = uniqid ( time () ) . '.' . $extensao;       // definir novo unico do arquivo
     $tamanhoExtensao = strrchr($nome, '.');
     $tamanhoExtensao = strlen($tamanhoExtensao);
     $novoNome =substr($nome, 0, -$tamanhoExtensao);
     $vrf = '/' . "perfil" . '/';

     // if(preg_match($vrf, $novoNome)){
     //    $novoNome = uniqid ( time () ) . '.' . $extensao ;
     //
     //    $destino ="../../assets/img/upload/perfil/";
     //    $pasta =$destino.$novoNome;
     //    $destino ="assets/img/upload/perfil/$novoNome";
     //    echo "if $destino";
     // }
     // else{
     //   $destino ="../../assets/img/upload/perfil/";
     //    $novoNome =($novoNome ) . '.' . $extensao;
     //    $destino = $destino.$novoNome;
     //    $pasta ="../../$destino";
     //    echo "else $destino";
     // }
    // $destino = "assets/img/upload/perfil/" . $novoNome;
    $novoNome = uniqid ( time () ) . '.' . $extensao ;

      $destino ="../../assets/img/upload/perfil/";
      $pasta =$destino.$novoNome;
      $destino ="assets/img/upload/perfil/$novoNome";


    if(move_uploaded_file($nomeTemorario, $pasta)){ // move o arquivo para a pasta que eu quero


        $sql = "UPDATE tb_perfil
        SET ds_imagem='$destino'
        WHERE cd_perfil = '$_SESSION[cd]'";
        $linhaAfetadas = $conn->exec($sql);

        // echo "imagem alterada com sucesso";
        
        $_SESSION['fotoPerfil'] = $destino;

       }else{
           echo "Falha no upload do aquivo";
       }
    }else{
        echo "Formato inválido!";
    }
    }catch(PDOException $Exception){
        echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
    }

}else{
    echo $erro;
}
?>
