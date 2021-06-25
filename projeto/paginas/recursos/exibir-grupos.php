<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $sql = "SELECT g.nm_grupo, g.ds_imagem, g.cd_grupo
    from tb_grupo as g
    inner join grupo_perfil as gp
    on g.cd_grupo = gp.cd_grupo
    inner join tb_perfil as p
    on gp.cd_perfil = p.cd_perfil
    where p.cd_perfil = '$_SESSION[cd]'";

    $dados = $conn->query($sql);

    

    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
