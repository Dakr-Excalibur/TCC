<div class="myModalP" hidden id="modalAlterarImagem">
    <img  class="fecharmodal" src="assets/img/icon/Fechar.png" onclick="aparecerModal('modalAlterarImagem')">
    <div class="text-center">
    <h2 class="TituloModal">Alterar Imagem</h2>
    <p>Selecione a imagem</p>
    <label for="fileAlterarImagem">
        <div class="divInputLabel">
            <p>Escolher foto</p>
        </div>
    </label> <br>
    <input class="inputFile" type="file" id="fileAlterarImagem"><br>
    <input type="submit" class="buttonALI" onclick='alterarImagem()' value="Alterar" >
  </div>
</div>
