<?php
$erro = "";

if(!isset($_FILES['txtimagem']) && empty($_POST['txttitulo'])){
    $erro = "Arquivo e titulo vazio";
}
if($erro == ""){
    try{
       require_once('../../includes/conexao/connection.php');
       session_start();


       date_default_timezone_set("America/Sao_Paulo");
       $data = date("Y-m-d");
       $hora = date("H:i");

       if(isset($_FILES['txtimagem'])){
       $nome = $_FILES['txtimagem']['name'];
       $arquivo = $_FILES['txtimagem'];
       $formatosAceitos = array("png", "jpeg", "jpg","gif", "jfif" , "mp3", "mp4" , "AVI" , "MOV", "WMV" , "MPG" , "FLV" , "3GP" , "3G2"); // difinir valores aceitos
       $extensao = pathinfo($_FILES['txtimagem']['name'], PATHINFO_EXTENSION); // pegando extensão do arquivo
       $extensao = strtolower ($extensao); // deiando a extensão em minusculo

       if(in_array($extensao, $formatosAceitos)){  //verificando ser a extensão do arquivo é aceitavel
       $pasta = "../../assets/upload/postagem/"; // caminho da pasta
       if($extensao == "png" || $extensao == "jpeg" || $extensao == "jpg" || $extensao == "gif" || $extensao == "jfif"){
         $cd_tipo_postagem = 1;
         $pastaTipoArquivo = "img/";
         $pasta = $pasta .$pastaTipoArquivo ;
       }else if($extensao == "mp4" || $extensao == "AVI" || $extensao == "MOV" ||
       $extensao == "WMV" || $extensao == "MPG" || $extensao == "FLV" || $extensao == "3GP" || $extensao == "3G2" ){
        $cd_tipo_postagem = 2;
        $pastaTipoArquivo = "videos/";
        $pasta = $pasta . $pastaTipoArquivo;
      }else if($extensao == "mp3"){
        $cd_tipo_postagem= 3;
        $pastaTipoArquivotipoArquivo = "audio/";
        $pasta = $pasta . $tipoArquivo;
      }else if(empty($_POST["txttitulo"])){
        $cd_tipo_postagem= 4;
      }

       $nomeTemorario = $_FILES['txtimagem']['tmp_name']; // todo o nome do arquivo (Nome que  servidor gravou a imagem)
       $novoNome = uniqid ( time () ) . '.' . $extensao;       // definir novo unico do arquivo
       $destino = "assets/upload/postagem/" . $pastaTipoArquivo. $novoNome;
       if(move_uploaded_file($nomeTemorario, $pasta.$novoNome)){ // move o arquivo para a pasta que eu quero
           echo "Upload feito com sucesso! \n";

            if(empty($_POST["txttitulo"])){

                $SQL = "INSERT INTO tb_postagem( dt_postagem, hr_postagem, ds_imagem, cd_perfil, cd_tipo_postagem) VALUES ";
                $SQL = $SQL .  ' (' . $conn->quote($data) . ', ';
                $SQL = $SQL . $conn->quote($hora) . ', ';
                $SQL = $SQL . $conn->quote($destino) . ', ';
                $SQL = $SQL . $conn->quote($_SESSION['cd']) . ', ';
                $SQL = $SQL . $conn->quote($cd_tipo_postagem) . ') ';
                $linhaAfetadas = $conn->exec($SQL);
            echo "Postagem somente com a imagem realizada";

            }else{
                $titulo = $_POST["txttitulo"];
                $SQL = "INSERT INTO tb_postagem(nm_titulo,  dt_postagem, hr_postagem, ds_imagem, cd_perfil, cd_tipo_postagem) VALUES ";
                $SQL = $SQL .  ' (' . $conn->quote($titulo) . ', ';
                $SQL = $SQL . $conn->quote($data) . ', ';
                $SQL = $SQL . $conn->quote($hora) . ', ';
                $SQL = $SQL . $conn->quote($destino) . ', ';
                $SQL = $SQL . $conn->quote($_SESSION['cd']) . ', ';
                $SQL = $SQL . $conn->quote($cd_tipo_postagem) . ') ';
                $linhaAfetadas = $conn->exec($SQL);
            echo "Postagem com imagem e titulo realizadas";
            }

       }else{
           echo "Falha no upload do aquivo";
       }
    }else{
        echo "Formato inválido!";
    }
}else{
    $titulo = $_POST["txttitulo"];
    $SQL = "INSERT INTO tb_postagem(nm_titulo,  dt_postagem, hr_postagem, cd_perfil, cd_tipo_postagem) VALUES ";
    $SQL = $SQL .  ' (' . $conn->quote($titulo) . ', ';
    $SQL = $SQL . $conn->quote($data) . ', ';
    $SQL = $SQL . $conn->quote($hora) . ', ';
    $SQL = $SQL . $conn->quote($_SESSION['cd']) . ', ';
    $SQL = $SQL . $conn->quote($cd_tipo_postagem) . ') ';
    $linhaAfetadas = $conn->exec($SQL);
       echo "Postagem somente com o titulo realizada";
}

    }catch(PDOException $Exception){
        echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
    }

}else{
    echo $erro;
}

 ?>
