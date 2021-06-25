<?php
$dataAtual = date('Y-m-d');
 ?>


<form action="" method="" name="form_telaCadastro" id="form_telaCadastro" onkeyup="validaCadastro()">

    <div class="divTelaCadastro">
    <h3 class="mb-3">Cadastro</h3>
    <p> <input class="inputCL" type="text" name="txtNicknameCadastro" id="txtNicknameCadastro" placeholder="NickName de Usuário"> </p>
    <!-- <p> <input class="inputCL" type="text" name="txtNascimentoCadastro" id="txtNascimentoCadastro" placeholder="Data de nascimento"> </p> -->
    <p> <input class="inputCL" type="date" name="txtNascimentoCadastro" id="txtNascimentoCadastro" placeholder="Data de nascimento" max="<?php echo $dataAtual ?>"> </p>
    <p>
        <select class="inputCL" name="txtSexoCadastro" id="txtSexoCadastro">
            <option value=1>Homem</option>
            <option value=2>Feminino</option>
            <option value=3>Não informar</option>
        </select>
    </p>
    <p> <input class="inputCL" type="email" name="txtEmailCadastro" id="txtEmailCadastro" placeholder="E-mail de usuário"> </p>
    <p> <input class="inputCL" type="password" name="txtSenhaCadastro" id="txtSenhaCadastro" placeholder="Senha de usuário"> </p>
    <p> <input class="inputCL" type="password" name="txtConfSenhaCadastro" id="txtConfSenhaCadastro" placeholder="Confirmação de senha"> </p>
    <p> <small id="smallCadastro"></small> </p>
    <p> <input class="inputButtonCL" type="submit" id="AcessarCadastro" value="Cadastrar" disabled> </p>
    <p> <a class="volta" href="index.php">Tela de login </a> <p>
    </div>


</form>
