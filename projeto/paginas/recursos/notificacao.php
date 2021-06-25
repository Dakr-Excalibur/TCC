<?php

try {
  require_once("../../includes/conexao/connection.php");
  session_start();

  $cd_de = $_SESSION['cd'];
  $cd_para = $_POST['cd_para'];


  $sql = "UPDATE tb_notificacao set ic_status = 1 where cd_de = $cd_de and cd_para = $cd_para";



  if ($conn->query($sql)) {
    $sql = "SELECT nm_nickname, ds_imagem, ic_status, cd_perfil,  cd_de,
    (select  count(per2.nm_nickname)
    from tb_perfil as per1
    left join tb_amigo as a
    on per1.cd_perfil = a.cd_de
    left join tb_perfil as per2
    on per2.cd_perfil = a.cd_para
    where (per1.cd_perfil = per0.cd_perfil or per2.cd_perfil = per0.cd_perfil) and (a.cd_de = '$_SESSION[cd]' or a.cd_para = '$_SESSION[cd]')) as qt
    from tb_perfil as per0
    left join tb_notificacao as n
    on (n.cd_de = '$_SESSION[cd]' and per0.cd_perfil = n.cd_para)
    where  (select  count(per2.nm_nickname) from tb_perfil as per1 left join tb_amigo as a on per1.cd_perfil = a.cd_de
    left join tb_perfil as per2 on per2.cd_perfil = a.cd_para
    where (per1.cd_perfil = per0.cd_perfil or per2.cd_perfil = per0.cd_perfil) and (a.cd_de = '$_SESSION[cd]' or a.cd_para = '$_SESSION[cd]')) = 0 order by per0.nm_nickname";

    $dados = $conn->query($sql);


    $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($resu, JSON_PRETTY_PRINT));


  }else{
    echo "falhou";
  }





} catch (PDOException $exception) {
  echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
