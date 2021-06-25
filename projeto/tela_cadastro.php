<?php
   require_once('includes/conexao/connection.php');
   session_start();
?>
<!DOCTYPE html>
<html>
<head>
   <?php
        include ('header.php');
    ?>
    <title>Cadastro de usuario</title>
</head>
<body id="boryTelaCadastro">        
    <div class="container-float">
        <div class="row">
            <div class="col-md-12 mt-4">
                <?php
                   include ('paginas/formularios/formulario-telaCadastro.php');
                ?>
            </div>
        </div>
    </div>
</body>
</html>

<?php
        include ('footer.php');
?>
