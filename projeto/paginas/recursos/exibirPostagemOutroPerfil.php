<?php
try {
  require_once("../../includes/conexao/connection.php");
  session_start();

  $sql ="SELECT  pg.cd_postagem, pg.nm_titulo, pg.ds_imagem, datediff(CURRENT_DATE(), pg.dt_postagem)
  AS dias, hr_postagem as horas, pg.hr_postagem, p.nm_nickname, p.cd_perfil as cdPerfil, p.ds_imagem as imgPerfil,
  (select count(cd_curtida)  from tb_curtida
  where pg.cd_postagem = tb_curtida.cd_postagem ) as qtdLike,
  (select count(cd_descurtida)  from tb_descurtida
  where pg.cd_postagem = tb_descurtida.cd_postagem ) as qtdDeslike,
  (select count(cd_comentario)  from tb_comentario
  where pg.cd_postagem = tb_comentario.cd_postagem ) as qtdComentario,
  (SELECT nm_nickname  FROM tb_perfil WHERE cd_perfil = c.cd_perfil) as NicknameCompartilhou,
  c.cd_compartilhamento, datediff(CURRENT_DATE(), c.dt_compartilhamento) AS diasC,
  c.hr_compartilhamento as horasC , c.cd_postagem as IDPostagemCompartilhado, c.cd_perfil as cdCompartilhou,
  pg.cd_tipo_postagem, pg.dt_postagem , c.dt_compartilhamento
  FROM tb_postagem pg
  right join
  (SELECT per1.nm_nickname, per1.cd_perfil
    from tb_perfil as per1
    inner join tb_amigo as a
    on per1.cd_perfil = a.cd_de
    where a.cd_para = '$_SESSION[cdOutroPerfil]' or a.cd_de =  '$_SESSION[cdOutroPerfil]'
    union
    SELECT per2.nm_nickname, per2.cd_perfil
    from tb_perfil as per2
    inner join tb_amigo as a
    on per2.cd_perfil = a.cd_para
    where a.cd_de =  '$_SESSION[cdOutroPerfil]' or a.cd_para = '$_SESSION[cdOutroPerfil]'
    order by nm_nickname)  as a
    on a.cd_perfil = pg.cd_perfil
    left JOIN tb_perfil as p
    on p.cd_perfil = pg.cd_perfil
    LEFT JOIN tb_compartilhamento as c
    on pg.cd_postagem = c.cd_postagem
    where pg.cd_postagem is not  null
    ORDER BY dias ASC, horas DESC";

    $dados = $conn->query($sql);

    $result = $dados->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_PRETTY_PRINT);

  } catch (PDOException $exception) {
    echo "Erro: " . $exception->getMessage() . " - Código " . $exception->getCode();
  }
  /*

  */
  ?>
