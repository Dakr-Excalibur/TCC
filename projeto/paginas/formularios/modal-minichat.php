<div class="divMinichat" id="modalMinichat"  hidden>
  <div class="barraDeMenu ">
    <p class="nickMinichat">Nome</p>
    <!-- <img  src="assets/img/icon/minimizar.png" onclick="minimizarMinichat('modalMinichat')" > -->
    <img class="Botãofechar" src="assets/img/icon/Fechar.png" onclick="aparecerModal('modalMinichat')" > 

  </div>
  <!-- <small id="smallNickname"></small><br> -->
  <div class="divTextoMinichat" id="divTextoMinichat">

  </div>
  <div class="camposMinichat">
    <input type='text' id="txtMinichat" class="inputText"  placeholder='Digite sua mensagem' >
    <button type="submit" class="buttonChat"   id='btnMinichat' onclick="enviarMensagemMinichat()">Enviar</button>
    <button type="submit" value="Enviar" id="btnTipoChat" hidden></button>
  </div>
</div>
