<?php

try {
  require_once("../../includes/conexao/connection.php");
  session_start();


  $nome = $_POST['nome'];




  $sql = "SELECT  p.nm_nickname, p.ds_imagem, n.ic_status, p.cd_perfil,  n.cd_de, n.cd_para, (select count(per.nm_nickname)
  from tb_perfil as per
  left join tb_notificacao as n
  on per.cd_perfil = n.cd_de or per.cd_perfil = n.cd_para
  where per.cd_perfil = p.cd_perfil) as repetido
  from tb_perfil  as p
  left join tb_notificacao as n
  on p.cd_perfil = n.cd_de or p.cd_perfil = n.cd_para
  where p.cd_perfil != all
  (SELECT per1.cd_perfil
    from tb_perfil as per1
    inner join tb_amigo as a
    on per1.cd_perfil = a.cd_de
    where a.cd_para = '$_SESSION[cd]'
    union all
    SELECT per2.cd_perfil
    from tb_perfil as per2
    inner join tb_amigo as a
    on per2.cd_perfil = a.cd_para
    where a.cd_de = '$_SESSION[cd]') and p.cd_perfil != '$_SESSION[cd]' and nm_nickname like '$nome%'
    order by nm_nickname";

    $dados = $conn->query($sql);


    $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
    echo (json_encode($resu, JSON_PRETTY_PRINT));


  } catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
  }
  ?>
