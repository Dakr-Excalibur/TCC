<?php

try {
  require_once("../../includes/conexao/connection.php");
  session_start();

  // $sql = "SELECT per.nm_nickname, per.ds_imagem, n.cd_de, n.cd_para, tn.nm_tipo_notificacao
  // from tb_notificacao as n
  // inner join tb_perfil as per
  // on n.cd_de = per.cd_perfil
  // inner join tb_tipo_notificacao as tn
  // on tn.cd_tipo_notificacao = n.cd_tipo_notificacao
  // where n.cd_para = '$_SESSION[cd]'";

  $sql = "SELECT p.nm_nickname as nome, n.cd_notificacao, n.cd_de, n.cd_para, n.cd_tipo_notificacao, tp.nm_tipo_notificacao, po.nm_titulo, per.nm_nickname, p.ds_imagem
  from tb_perfil as p
  left join tb_notificacao as n
  on p.cd_perfil = n.cd_de
  left join tb_perfil as per
  on per.cd_perfil = n.cd_para
  left join tb_tipo_notificacao as tp
  on tp.cd_tipo_notificacao = n.cd_tipo_notificacao
  left join tb_postagem as po
  on p.cd_perfil  = po.cd_perfil
  where n.cd_para = '$_SESSION[cd]'
  order by  n.cd_notificacao";

  $dados = $conn->query($sql);


  $resu = $dados->fetchAll(PDO:: FETCH_ASSOC);
  echo (json_encode($resu, JSON_PRETTY_PRINT));






} catch (PDOException $exception) {
  echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
