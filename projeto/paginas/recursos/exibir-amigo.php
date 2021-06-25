<?php

try {
    require_once("../../includes/conexao/connection.php");
    session_start();

    $sql = "SELECT per.nm_nickname, per.ds_imagem, per.cd_perfil
    from tb_perfil as per
    inner join tb_amigo as a
    on per.cd_perfil = a.cd_de or per.cd_perfil = a.cd_para
    where per.cd_perfil not like '$_SESSION[cd]'  and (a.cd_de = '$_SESSION[cd]' or a.cd_para = '$_SESSION[cd]')
    order by per.nm_nickname";

    $dados = $conn->query($sql);



    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
?>
