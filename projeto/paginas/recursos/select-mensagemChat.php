<?php
try{
  session_start();
  $cdPara = $_POST['cdPara'];
  $tipoChat = $_POST['tipoChat'];
  require_once('../../includes/conexao/connection.php');
  if($tipoChat == 'amigo'){
    // $SQL = "SELECT ds_mensagem from tb_chat where cd_de = '$id' or cd_para = '$id'";
    $SQL = "SELECT p.nm_nickname, c.ds_mensagem, c.cd_de, c.cd_para
    from tb_perfil as p
    inner join tb_chat as c
    on p.cd_perfil = c.cd_de
    where c.cd_tipo_chat = 1 and (c.cd_de = '$cdPara' or c.cd_para = '$cdPara')
    order by cd_chat asc";
  }else {
    $SQL = "SELECT p.cd_perfil, p.nm_nickname, c.ds_mensagem, c.cd_grupo
    from tb_perfil as p
    inner join tb_chat as c
    on p.cd_perfil = c.cd_de
    where c.cd_grupo = '$cdPara'";
  }


  $dados = $conn->query($SQL);

  $result = $dados->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result, JSON_PRETTY_PRINT);

}catch(PDOException $Exception){
  echo "Erro " . $Exception->getMessage( ) . "  -  Código " . $Exception->getCode( );
}
?>
