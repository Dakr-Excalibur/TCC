<?php


  try{
      require_once("..\..\includes\conexao\connection.php");
      session_start();

      $campo =  $_POST['campo'];

      $vrf = $_POST['vrf'];

      if($vrf === 'txtNomeAmigo'){
        $sql = "CALL buscarPostagem('$_SESSION[cd]', '$campo')";
      }else if($vrf === "selectTipoPostagem"){
        $sql = "CALL tipoPostagem('$_SESSION[cd]', '$campo')";
      }else if($vrf === 'selectTipoDenuncia'){
        $sql = "CALL tipoDenuncia('$_SESSION[cd]', '$campo')";
      }else if($vrf === 'txtDataPostagem' ){
        // echo 'Next Week: '. date('d-m-Y', $nextWeek) ."<br>";
        $campo = date($campo);
        $sql = "CALL dtPostagem('$_SESSION[cd]', '$campo')";
      }

            $dados = $conn->query($sql);
            $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
            echo (json_encode($resu, JSON_PRETTY_PRINT));



  }catch(PDOException $exception){
      echo "Erro: ". $exception->getMessage() . " - Código ". $exception->getCode();
  }


?>
