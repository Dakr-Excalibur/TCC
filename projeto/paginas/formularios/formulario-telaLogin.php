<?php
 $dataAtual = date('Y-m-d');
?>
 <!-- container -->
 <div class="Containea">

 <!-- FORM DO LOGIN -->

 <header>
  <form class="box-login" action="index.html" method="post" name="form_telaLogin" id="form_telaLogin" onkeyup="validaLogin()">
	<a href="#" ><img src="Logo2.png" class="ImagemLogo"></a>
	<b>D<span>ARK EX</span><span>CALI</span>BUR</b>
	 <input type="text"  class="Email-login" placeholder="Email"  name="txtEmailLogin" id="txtEmailLogin" required />

	 <input class="InputSenha"  type="password"  placeholder="Senha" name="txtSenhaLogin" id="txtSenhaLogin" require/>

	 <input type="submit" name="" id="acessarLogin" value="Logar" class="botaologin"/>
  </form>
 </header>

 <!-- FIM -->

 <!-- Balão de conversa -->

 <div class="balao"><p id="linha"></p></div>

 <!-- Fim -->

 <!-- yoda -->
 <div class="wrap">
	<div class="capsule">
		<div class="capsule__bottom">
			<div class="panel"></div>
			<div class="light"></div>
			<div class="light2"></div>
		</div>
		<div class="capsule__top">
			<div class="panel"></div>
		</div>
		<div class="capsule__shadow"></div>
		<div class="left-circle"></div>
		<div class="right-circle"></div>
	</div>
	<div class="yoda-wrap">
		<div class="hair"></div>
		<div class="yoda">
			<div class="brow"></div>
			<div class="eye-left"></div>
			<div class="eye-right"></div>
		</div>
		<div class="ear-left">
			<div class="line"></div>
		</div>
		<div class="ear-right">
			<div class="line"></div>
		</div>
		<div class="pled1"></div>
		<div class="pled2"></div>
	</div>
	<div class="shadow"></div>
	<div class="blick2"></div>
	<div class="blick3"></div>
	<div class="blick4"></div>
 </div>

 <!-- Fim -->

 <!-- Play -->
 <!-- <div class="Video">
  <div class="toggle"><img src="fechar.png"></div>
  <a href="#" class="play" onclick="toggle();"> <img src="play.png" class="imagemplay"> <span>Apresentação</span></a>
  <div class="pitch"></div>
  <div class="trailer">
   <video src="pitch.mp4" class="Apresentacao" controls="true"></video>
   <img src="close.png" class="close" onclick="toggle();">
  </div>
 </div> -->
 <!-- Fim -->

 <!-- FORM CADASTRO -->


  <form  class="box-cadastro" id="form_telaCadastro">
	<span class="Titulocadastro">Entre para a força!!</span>
	 <span class="Subcadastro"> Lembre-se: seu foco determina a sua realidade. </span>

	<!-- Input de formulário -->

	<input type="text" name="Name" id="txtNicknameCadastro" class="Inputgeral" placeholder="Nickname" required onkeyup="validarNickname(this.id, 'mensagemErro', 'AcessarCadastro')"/>

	<input type="text" data-type="text" id="txtEmailCadastro" name="Email" class="Inputgeral"  placeholder="Email" required/>

	<input type="password" name="senha"  class="Inputsenhac" placeholder="Senha" id="txtSenhaCadastro" required/>

	<input type="password" class="InputConfsenhac" placeholder="Confirmar senha" name="txtConfSenhaCadastro" id="txtConfSenhaCadastro" required/>

	<!-- Fim -->

	<!-- Data cadastro -->
	<div class="DataCadastro">
	<span class="DataLabel">Data de nascimento</span>
	<input type="date" id="txtNascimentoCadastro" name="txtNascimentoCadastro" class="InputData" max="<?php echo $dataAtual ?>" required/>
	</div>
	<!-- Fim -->

	<!-- Gênero -->

	<div class="GeneroDiv">
	 <div class="NomeGenero">Gênero</div>
		  <input type="radio" class="GeneroInput" name="sex" value="1" checked id="M"/> <!-- só deixar checked q ja fica validado
      como nosso publico alvo é na maioria homem deixa masculino em primeiro e checked  -->
		  <label class="LabelGenero">Masculino</label>
      <input type="radio" class="GeneroInput" name="sex" value="2" id="F"/><!-- O valor deixa esses ou vai bugar
      no banco deixe esses values -->
      <label class="LabelGenero">Feminino</label>
		  <input type="radio" class="GeneroInput" name="sex" value="3" id="I"/>
		  <label class="LabelGenero">Não informar</label>
	</div>

	<!-- Fim -->

	<input type="submit" name="" id="AcessarCadastro" value="Cadastrar" class="botaocadastro" onclick="validaCadastro()">

  </form>
  <div id="mensagemErro"></div>
  <input type="text" id="vrf" hidden>
 </div>
