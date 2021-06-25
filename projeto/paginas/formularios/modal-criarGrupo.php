<div class="myModalG" id="modalCriarGrupo" hidden>
  <img  class="fecharmodal" src="assets/img/icon/Fechar.png" onclick="aparecerModal('modalCriarGrupo')">

  <h2 class="TituloModalG">Novo grupo</h2><br>
  <form id="formCriarGrupo">
    <fieldset>
      <div class="row pl-2 ">
        <div class="col-md-7 row ">
          <div class="col-md-9">
            <input class="inputTextG" type="text" id="txtNomedoGrupo" autocomplete="off" placeholder="Nickname">
          </div>
          <div class="col-md-9">
            <input class="inputTextG" type="text" id="txtDescricaoGrupo"  autocomplete="off" placeholder="Descrição">
          </div>
          <div class="col-md-9">
            <label for="fileImagemGrupo">
              <div class="divInputLabel ">
                <p>Escolher foto</p>
              </div>
            </label>
            <input class="inputFile" type="file" id="fileImagemGrupo">
          </div>
        </div>
        <div class="col-md-5  id="modalAmigos" class="modalAmigos"">
          <!-- <div  > -->
            <form class="text-center p-2" >

                <h2 class="ModalAmigoLabel">Adicionar:</h2>
                <!-- <p class="ModalP"></p> -->
                <div id="divAmigoGrupo" class="modalAmigo">

                </div>
                <!-- <button class="button mt-1">Enviar</button> -->
            </form>
          <!-- </div> -->
        </div>
      </div>

      <div class="text-center">
        <!-- <button class="button" onclick="adicionarAmigosGrupo(),aparecerModal('modalAmigos')">Adicionar amigos ao grupo</button><br> -->
        <input type="submit" class="BotaomudarG" value="Criar Grupo" onclick="aparecerModal('modalCriarGrupo'),criarGrupo('modalCriarGrupo')">
        <input id="txtId" type="text" hidden>
      </div>
    </fieldset>
  </form>
</div>
