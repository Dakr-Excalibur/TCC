<?php
try {
    require_once("../../includes/conexao/connection.php");
    $cd = $_POST['id'];    

    $sql = "SELECT c.cd_perfil, pe.nm_nickname, c.cd_comentario, c.ds_comentario, 
    c.dt_comentario, c.hr_comentario, c.cd_postagem,
    (SELECT count(cd_comentario) FROM tb_comentario WHERE cd_postagem = '$cd' ) as soma
    From tb_comentario as c
    inner join tb_postagem as po on po.cd_postagem = c.cd_postagem
    inner join tb_perfil as pe on pe.cd_perfil = c.cd_perfil
    where c.cd_postagem ='$cd'";

    $dados = $conn->query($sql);

    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>