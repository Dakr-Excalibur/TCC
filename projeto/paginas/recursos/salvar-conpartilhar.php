<?php  

try{
   require_once("../../includes/conexao/connection.php");
   $cd_postagem = $_POST['id']; 
   $cd_perfil = 1;  
   date_default_timezone_set("America/Sao_Paulo");
   $dataAtual = date("Y-m-d");
   $horaAtual = date("H:i");  
   
   ////////////////////////// PEGANDO INFORMACOES NECESSÁRIAS /////////////////////////

   $sql2 = "SELECT dt_postagem, hr_postagem, ds_extensao, nm_titulo, cd_tipo_postagem,
                 (select cd_perfil  from tb_perfil as pe
                  where pe.cd_perfil = pg.cd_perfil ) as cd_perfil
            FROM tb_postagem as pg  WHERE cd_postagem = '$cd_postagem';";
   $dados = $conn->query($sql2);
   foreach ($dados as $linha) {
      $titulo = $linha['nm_titulo'];
      $data = $linha['dt_postagem'];
      $hora = $linha['hr_postagem'] ;
      $extensao = $linha['ds_extensao'];
      $cd = $linha['cd_perfil'];
      $cd_tipo_postagem = $linha['cd_tipo_postagem'];
      echo "PEGANDO INFORMACOES NECESSÁRIAS \n"; 
   break;
   }

   echo "Tentando pega Max ID \n";
   $sql = "SELECT max(cd_postagem + 1) AS id FROM tb_postagem;"; 
   $dados = $conn->query($sql);
   foreach ($dados as $linha){ 
      $maxId = $linha['id'];
     echo "$maxId \n"  ;  
   }     
  
///////////////////////////////// DANDO INSERT NA tb_postagem e uploaded ///////////////////////////////////
   if($extensao != null){
      if($titulo != null ){
         //midia e TITULO
         $SQL = "INSERT INTO tb_postagem(cd_postagem, nm_titulo,  dt_postagem, hr_postagem, ds_extensao, cd_tipo_postagem, cd_perfil) VALUES ";
         $SQL = $SQL .  ' (' . $conn->quote($maxId) . ', ';
         $SQL = $SQL . $conn->quote($titulo) . ', ';
         $SQL = $SQL . $conn->quote($dataAtual) . ', ';
         $SQL = $SQL . $conn->quote($horaAtual) . ', ';
         $SQL = $SQL . $conn->quote($extensao) . ', ';
         $SQL = $SQL . $conn->quote($cd_tipo_postagem) . ', ';
         $SQL = $SQL . $conn->quote($cd_perfil) . ') ';
         $linhaAfetadas = $conn->exec($SQL);
     echo "Postagem com midia e titulo realizadas\n";  
      }else{
         //Só midia
         $SQL = "INSERT INTO tb_postagem(cd_postagem, dt_postagem, hr_postagem, ds_extensao, cd_tipo_postagem, cd_perfil) VALUES ";
                $SQL = $SQL .  ' (' . $conn->quote($maxId) . ', ';
                $SQL = $SQL . $conn->quote($dataAtual) . ', ';
                $SQL = $SQL . $conn->quote($horaAtual) . ', ';
                $SQL = $SQL . $conn->quote($extensao) . ', ';
                $SQL = $SQL . $conn->quote($cd_tipo_postagem) . ', ';
                $SQL = $SQL . $conn->quote($cd_perfil) . ') ';
                $linhaAfetadas = $conn->exec($SQL);
            echo "Postagem somente com a imagem realizada\n";
      }  
   }else{
           //Só titulo
      $SQL = "INSERT INTO tb_postagem(cd_postagem, nm_titulo,  dt_postagem, hr_postagem, cd_perfil) VALUES ";
      $SQL = $SQL .  ' (' . $conn->quote($maxId) . ', ';
      $SQL = $SQL . $conn->quote($titulo) . ', ';
      $SQL = $SQL . $conn->quote($dataAtual) . ', ';
      $SQL = $SQL . $conn->quote($horaAtual) . ', ';
      $SQL = $SQL . $conn->quote($cd_perfil) . ') ';
      $linhaAfetadas = $conn->exec($SQL);
         echo "Postagem somente com o titulo realizada\n"; 
   }
   
   if($linhaAfetadas == true){
      //////////////////////// INSERT EM tb_compartilhamento ///////////////////////////////
      $SQL = "INSERT INTO tb_compartilhamento( dt_compartilhamento, hr_compartilhamento, 
      cd_postagem, cd_perfil) VALUES ";
      $SQL = $SQL .  ' (' . $conn->quote($data) . ', ';
      $SQL = $SQL . $conn->quote($hora) . ', ';
      $SQL = $SQL . $conn->quote($maxId) . ', ';
      $SQL = $SQL . $conn->quote($cd) . ') ';
      $linhaAfetadas = $conn->exec($SQL); 
          
    if($linhaAfetadas == true){
    echo "insert em tb_compartilhamento \n"; 

   }
}
}catch(PDOException $exception){
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}

?>

