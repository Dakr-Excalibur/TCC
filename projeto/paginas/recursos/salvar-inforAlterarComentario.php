<?php
try {
    require_once("../../includes/conexao/connection.php");

    $cdComentario = $_POST['id'];

    $sql ="SELECT * FROM tb_comentario WHERE cd_comentario = '$cdComentario'";

    $dados = $conn->query($sql);
        
    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
}
/*

*/
?>