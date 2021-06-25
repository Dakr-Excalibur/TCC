<div class="myModalAln" id="modalAlteraNickname" hidden>
    <img class="fecharmodal" src="assets/img/icon/Fechar.png" onclick="aparecerModal('modalAlteraNickname')">
        <div class="text-center">
    <h2 class="TituloModal">Alterar Nickname</h2>
    <p>Digite o novo nickname</p>
    <input class="mudarnome" type="text" id="txtNickname" onkeyup="validarNickname(this.id, 'smallNickname', 'btnEnviarNickname')"><br>
    <small id="smallNickname"></small><br>
    <input type="submit" class="BotaomudarN disabled" onclick="alterarNickname('txtNickname', 'smallNickname')" id="btnEnviarNickname" disabled value="Mudar">
  </div>
</div>
