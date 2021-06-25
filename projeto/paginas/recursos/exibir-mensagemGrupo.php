<?php
try {
    require_once("../../includes/conexao/connection.php");

    $cd_grupo = $_POST['cdGrupo'];

    $sql = "SELECT g.nm_grupo, p.nm_nickname, c.ds_mensagem, c.cd_de
    from tb_grupo as g
    inner join grupo_perfil as gp
    on g.cd_grupo = gp.cd_grupo
    inner join tb_perfil as p
    on gp.cd_perfil = p.cd_perfil
    inner join tb_chat as c
    on p.cd_perfil = c.cd_de
    where gp.cd_grupo = '$cd_grupo'";

    // $SQL = "SELECT p.cd_perfil, p.nm_nickname, c.ds_mensagem
    // from tb_perfil as p
    // inner join tb_chat as c
    // on p.cd_perfil = c.cd_de
    // where c.cd_grupo = '$cd_grupo' ";

    $dados = $conn->query($sql);

    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
