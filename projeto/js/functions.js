
function toggle(){
    var trailer = document.querySelector('.trailer');
    var Apresentacao = document.querySelector('.Apresentacao');
    trailer.classList.toggle('active');
    Apresentacao.currentTime = 0;
    Apresentacao.pause();
}

// Fim 

// Menu  

$(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});



// Fim


// Digitação do balão
var texto = "O lado negro não é mais poderoso, apenas mais rápido, mais fácil e mais sedutor.";
var result;

var count = 0;
function digitar() {
  result = document.getElementById("linha");
  window.setTimeout(function() { inserir(texto[count]) }, 80);
}

function inserir(letra) {
  result.innerHTML += letra;
  count++;
  if(count < texto.length)
    window.setTimeout(function() { inserir(texto[count]) }, 80);
}

// window.onload = digitar;


////////////////////////////////////   CADASTRO    //////////////////////////////////////////////////


function validaCadastro() {
event.preventDefault();
  var btn = document.getElementById("AcessarCadastro");
  var nick = document.getElementById("txtNicknameCadastro");
  var email = document.getElementById("txtEmailCadastro");
  var senha = document.getElementById("txtSenhaCadastro");
  var confSenha = document.getElementById("txtConfSenhaCadastro");
  var nasc = document.getElementById("txtNascimentoCadastro");
  var erro = document.getElementById("mensagemErro");

  erro.classList.remove('sucesso');
  erro.classList.add('erro');
  erro.style.color = 'red';

  // var dataN = nasc.value.replace(/-/g, "/");
  var arrayData = nasc.value.split('-');
  var dataN = new Date(arrayData[0], arrayData[1], arrayData[2]);
  var idade = new Date();
  idade = idade.getFullYear() - arrayData[0];

  if (nick.value.indexOf('*') != - 1 ||
  nick.value.indexOf('!') != - 1 ||
  nick.value.indexOf('=') != - 1 ||
  nick.value.indexOf('+') != - 1 ||
  nick.value.indexOf('#') != - 1 ||
  nick.value.indexOf('@') != - 1 ||
  nick.value.indexOf(' ') != - 1){
    erro.innerText = 'Caracter inválido no campo nickname';
  }else if(nick.value === ""){
      erro.innerText = 'Preencha o campo nome';
  }else if(nick.value.length < 3){
    erro.innerText = 'Digite no minimo 3 caracteres no campo nickname';
  }else if(nick.value.length > 45){
    erro.innerText = 'Digite no maximo 45 caracteres no campo nickname';
  }else if(email.value.indexOf('@') < 0 ||
          email.value.indexOf(' ') != -1 ||
          email.value.indexOf('.com') < 0) {
    erro.innerText = "email inválido";
  }else if(email.value.length < 10){
    erro.innerText = "Digite no minimo 10 caracteres no campo email";
  }else if(email.value.length > 85){
    erro.innerText = "Digite no maximo 85 caracteres no campo email";
  }else if(senha.value === ""){
      erro.innerText = "Preencha o campo senha";
  }else if(senha.value.length < 8){
    erro.innerText = "Digite no minimo 8 caracteres no campo senha";
  }else if(senha > 35){
    erro.innerText = "Digite no maximo 35 caracteres no campo senha";
  }else if(senha.value != confSenha.value){
    erro.innerText = "Os campos senha e confirmar senha estão diferentes";
  }else if(nasc.value === ""){
    erro.innerText = "Preencha o campo data de nascimento";
  }else if(idade < 10){
    erro.innerText = "Você é muito novo para se cadastrar";
  }else if(document.getElementById('vrf').value === 'valido'){
      erro.innerText = "";
      erro.classList.remove('erro');
      cadastrar();
  }
}

// Cadastro AJAX
  function cadastrar(){
    if(document.getElementById('M').checked){
      sexo = 1;
    }
    else if(document.getElementById('F').checked){
      sexo = 2;
    }
    else if(document.getElementById('I').checked){
      sexo = 3;
    }
    event.preventDefault();
    $.ajax(
    {

        type: "POST",
        url: "paginas/recursos/salvar-telaCadastro.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)

                txtNicknameCadastro: $("#txtNicknameCadastro").val(),
                txtNascimentoCadastro: $("#txtNascimentoCadastro").val(),
                txtSexoCadastro: sexo,
                txtEmailCadastro: $("#txtEmailCadastro").val(),
                txtSenhaCadastro: $("#txtSenhaCadastro").val(),
                txtConfSenhaCadastro: $("#txtConfSenhaCadastro").val()
            },
            success: function (result) {
              console.log(result);
                // smallCadastro.innerHTML = "";
                if (result == " Cadastrado") {
                    $("#txtNicknameCadastro").val('');
                    $("#txtNascimentoCadastro").val('');
                    $("#txtEmailCadastro").val('');
                    $("#txtSenhaCadastro").val('');
                    $("#txtConfSenhaCadastro").val('');
                  var erro =  document.getElementById('mensagemErro');
                  erro.innerText = "Cadastrado com sucesso";
                  erro.classList.add('sucesso');
                  erro.style.color = 'green';
                  }
            },
            error: function (result) {
                console.error(result);
            }
        });
}
////////////////////////////////////  Login   //////////////////////////////////////////////////
function validaLogin() {
    var buttonLogin = document.getElementById("acessarLogin");
    buttonLogin.disabled = true;

    var EmailLogin = document.getElementById("txtEmailLogin");
    var SenhaLogin = document.getElementById("txtSenhaLogin");

    // if(EmailLogin.value.indexOf('0') != - 1 ||
    //    EmailLogin.value.indexOf('1') != - 1 ||
    //    EmailLogin.value.indexOf('2') != - 1 ||
    //    EmailLogin.value.indexOf('3') != - 1 ||
    //    EmailLogin.value.indexOf('4') != - 1 ||
    //    EmailLogin.value.indexOf('5') != - 1 ||
    //    EmailLogin.value.indexOf('6') != - 1 ||
    //    EmailLogin.value.indexOf('7') != - 1 ||
    //    EmailLogin.value.indexOf('8') != - 1 ||
    //    EmailLogin.value.indexOf('9') != - 1)
    //    { EmailLogin.value = ""; }

    if (EmailLogin.value == "") { buttonLogin.disabled = true; return false; }

    if (SenhaLogin.value == "") { buttonLogin.disabled = true; return false; }

    buttonLogin.disabled = false;
}
function converterDataBanco(data)
{
	console.log(data);
}
//Login AJAX
$("#form_telaLogin").submit(function (event) {

    event.preventDefault();
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/salvar-telaLogin.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                txtEmailLogin: $("#txtEmailLogin").val(),
                txtSenhaLogin: $("#txtSenhaLogin").val(),
            },
            success: function (result) {

                if (result == " sucesso") {
                    location.href = "home.php";
                } else {
                    console.log(result);
                }
            },
            error: function (result) {
                console.error(result);
            }
        });
});
// Exibir mensagem

var cont = 0;
function exibirMensagem() {
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/exibir-mensagem.php",

        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                // nome: $("#txtnome").val(),
            },
            success: function (result) {

                resultado = JSON.parse(result);

                var nome = document.getElementById("nomeChat");


                $(".divChat").empty();
                $.each(resultado, function (i, contato) {
                    if (nome.value == resultado[i].nm_nickname) {
                        $(".divChat").append(
                            // + resultado[i].cd_postagem

                            "<div class='row flex-row-reverse  mt-3'>" +
                            "<div id="+resultado[i].cd_chat+" class='divDigitar col-auto' width='auto' >" + resultado[i].nm_nickname +
                            ": " + resultado[i].ds_mensagem + "</div>" +
                            // "<div class='col-5'></div>" +
                            "</div>"
                            );
                    } else {
                        $(".divChat").append(
                            // + resultado[i].cd_postagem
                            "<div class='row  mt-3'>" +
                            "<div id="+resultado[i].cd_chat+" class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname +
                            ": " + resultado[i].ds_mensagem + "</div>" + "</div>"

                            );
                    }

                });
                if (cont == 0) {
                    cont++;
                    var x = document.getElementById("divChat").offsetHeight;
                    document.getElementById("divChat").scrollTop = x * 10;
                }
                // setInterval(function(){ $.ajax; }, 3000);

            },
            error: function (result) {
                console.error(result);
            }

        });

}
var atualizarMensagem;



function repetir(e) {
  if(e == "null"){
    atualizarMensagem = setInterval(function (){ exibirMensagem(); }, 1000);
  }
  if(e == 'parar'){
    clearInterval(atualizarMensagem);
  }
}

//Enviar Mensagem
$("#btnEnviarChat").click(function (event) {

    event.preventDefault();
    document.getElementById('btnEnviarChat').disabled = true;
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/enviar-mensagem.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                mensagem: $("#txtMensagem").val(),

            },
            success: function (result) {

                document.getElementById('btnEnviarChat').disabled = false;
                // resultado = JSON.parse(result);

                var nome = document.getElementById("nomeChat").value;
                $(".divChat").empty();
                $("#txtMensagem").val(""),

                // $.each(resultado, function (i, contato) {
                //     if (nome == resultado[i].nm_nickname) {
                //         $(".divChat").append(
                //                 // + resultado[i].cd_postagem
                //
                //                 "<div class='row flex-row-reverse  mt-3'>" +
                //                 "<div class='divDigitar col-auto ' '>" + resultado[i].nm_nickname +
                //                 ": " + resultado[i].ds_mensagem + "</div>" +
                //                 // "<div class='col-5'></div>" +
                //                 "</div>"
                //                 );
                //     } else {
                //         $(".divChat").append(
                //                 // + resultado[i].cd_postagem
                //                 "<div class='row  mt-3'>" +
                //                 "<div class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname +
                //                 ": " + resultado[i].ds_mensagem + "</div>" + "</div>"
                //
                //                 );
                //     }
                //
                // });
                document.getElementById('btnEnviarChat').disabled = false;
                var x = document.getElementById("divChat").offsetHeight;
                document.getElementById("divChat").scrollTop = x * 1000;

            },
            error: function (result) {
                $("#txtMensagem").val(""),
                console.error(result);
                document.getElementById('btnEnviarChat').disabled = false;
            }
        });
});

//const h1WS = document.getElementsByClassName( h1WS');
//const h1WS = document.querySelector('h1')
//console.log h1WS);

// function write() {
//     const e = document.querySelector('h3.writeSlow');
//     const textoArray = e.innerHTML.split('');
//     e.innerHTML = '';
//     textoArray.forEach((letra, i) => {
//         setTimeout(() => e.innerHTML += letra, 75 * i);
//     });
// }
function buscarMensagemChat(mensagem){
  var mensagem = mensagem.value
  event.preventDefault;

  $.ajax({
      url: 'paginas/recursos/buscarMensagem.php',
      type: 'POST',
      data: {
              mensagem: mensagem,
          },
      success: function (result) {

          $("#txtBuscarMensagemChat").val('');
          var cd_chat

          resultado = JSON.parse(result);
              $.each(resultado, function (i, contato) {


          cd_chat = resultado[i].cd_chat;
          var m = "#" + cd_chat;

          location.href = m;
          document.getElementById(cd_chat).style.backgroundColor = "green"


        })


      }
  });
}



function exibirPostagemBasica(){
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/salvar-ExibirPostagem.php",
        data: {
            chave: 'valorizado demais esse AJAX!!', //key : value
            //caso envie dados ;)
        },
        success: function (result) {

            $("#postagem").empty()

            resultado = JSON.parse(result);
            $.each(resultado, function (i, contato) {

              verificarExtensao: {
              var extensao = "";
              if(resultado[i].cd_tipo_postagem == 1){extensao = "<img class='col-12' src=" + resultado[i].ds_imagem + ">"}
              if(resultado[i].cd_tipo_postagem == 2){
                extensao = "<video width='100%' height='100%' controls><source src="+resultado[i].ds_imagem+" type='video/mp4'></video>";
                while(extensao.indexOf("\"") != -1){
                extensao= extensao.replace(/"/g, '');

              }
              }
              if(resultado[i].cd_tipo_postagem == 3){
                extensao = "<audio width='100%' height='100%' controls> <source src="+resultado[i].ds_imagem+" type='audio/mpeg'> </audio>";
                while(extensao.indexOf("\"") != -1){
                extensao= extensao.replace(/"/g, '');
              }

              }
            }
              verificar_dia_da_postagem: {
                /*DATA->*/  if(resultado[i].dias == 0 ) { resultado[i].dias = "Hoje às "; }
                            if(resultado[i].dias == 1 ) { resultado[i].dias = "Ontem ás "; }
                            if(resultado[i].dias > 1 && resultado[i].dias < 7 ) { resultado[i].dias += " dias atrás ás "; }
                            if(resultado[i].dias >= 7  ) { resultado[i].dias = resultado[i].dt_postagem; }

                /*DATA->*/  if(resultado[i].diasC == 0) { resultado[i].diasC = "Hoje às ";}
                            if(resultado[i].diasC == 1) { resultado[i].diasC = "Ontem ás "; }
                            if(resultado[i].diasC > 1 && resultado[i].diasC < 7) { resultado[i].diasC += " dias atrás ás ";}
                            if(resultado[i].diasC > 7)  { resultado[i].diasC = resultado[i].dt_compartilhamento; }
              }
              verificar_se_a_imagem_é_nula: {
                if (resultado[i].ds_imagem == null) {
                    $("#postagem").append(

                        "<div class='divDividir '>" + "</div>" +
                        "<div class='espacoPostagem '>" +
                        "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" +
                        "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + " ás "+ resultado[i].hr_postagem + "</p>" +
                        "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" +

                        "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                        "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                        "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                        "</div>" +

                        " <hr class='linha'> "

                        );
                } else {
                    $("#postagem").append(

                        "<div class='divDividir'>" + "</div>" +
                        "<div class='espacoPostagem' >" +
                        //row informações da postagem
                        "<div class='row '>" +
                        "<span class='negrito col-md-11'>Postado por: " + resultado[i].nm_nickname + "</span>" +

                        "<div class='col-md-1'>" + // inicio da col menu
                        "<div class='dropdown show'>" +
                        "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" +
                        "<div class='opcoesPostagem dropdown-menu'>" +
                        "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" +
                        "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" +
                        "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" +
                        "</div>" + "</div>" +
                        "</div>" + // fim da col menu

                        "<span class='negrito col-md-11'>Data: " + resultado[i].dias + " ás "  + resultado[i].hr_postagem + "</span>" +
                        "<span class='negrito col-md-11'>Titulo: " + resultado[i].nm_titulo + "</span>" +
                        "</div>" +
                        extensao +
                        "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                        "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                        "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                        "</div>"+
                        " <hr class='linha'> "

                        );
                }
              }
            });
        },
        error: function (result) {
            console.error(result);
        }
    });
}

// Postar
$("#formulario-postagem").on('submit', function (event) {
    event.preventDefault();
    console.log('Tentando cadastra postagem');

    var data = new FormData();
    data.append('txttitulo', $("#txttitulo").val());
    data.append('txtdescricao', $("#txtdescricao").val());
    data.append('txtimagem', $('#txtimagem').prop('files')[0]);

    $.ajax({
        url: 'paginas/recursos/salvar-postagem.php',
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,


        success: function (result) {
            $("#txttitulo").val('')
            $("#txtdescricao").val('')
            $("#txtimagem").val('')
            exibirPostagem()

        }
    });

});

// Envia o comentario para o banco
function criarId(id) {
    var cd = id;
    event.preventDefault();
    console.log('Tentando enviar o formulário');
    $.ajax(
    {
        url: "paginas/recursos/salvar-comentario.php",
        type: "POST",
        data: {
            chave: 'valorizado demais esse AJAX!!',
            comentario: $("#" + cd).val(),
            id: $("#" + cd).attr('id'),

        },
        success: function (result) {

            $("#" + cd).val("")
                //  resultado = JSON.parse(result);
                //  $.each(resultado, function (i, contato) {


                //  });

                //          $( "#log-de-ceps").append('<p>' + result + '</p>' );
            },
            error: function (result) {
                console.error(result);
            }
        });
}

function exibirAmigosGrupoChat(){
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/exibir-amigo.php",
      data: {

          },
          success: function (result) {
                $("#divAmigo").empty();
              resultado = JSON.parse(result);
                $("#divAmigo").append(
                  "<div class='mx-2'>" +
                  "<h3>Amigos</h3> " +
                  "</div>" +
                  "<hr>"
                );
              $.each(resultado, function (i, contato) {
                  $("#divAmigo").append(

                    "<div id="+ 'amigo' + resultado[i].cd_perfil +" class='row amigo py-2 mt-1' onclick=exibirConversa(this.id,'amigo')>" +
                    "<div class='BarraFotoAmigo'>" +
                    "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                    "</div>" +
                    "<div>"+ resultado[i].nm_nickname + "</div>"+
                    "</div>" +
                    "<hr>"

                      );

              });

          },
          error: function (result) {
              console.error(result);
          }
      });

      $.ajax(
      {
          type: "POST",
          url: "paginas/recursos/exibir-grupos.php",
          data: {

              },
              success: function (result) {
                    $("#divGrupo").empty();
                  resultado = JSON.parse(result);
                    $("#divGrupo").append(
                      "<div class='mx-2'>" +
                      "<h3>Clã</h3> " +
                      "</div>" +
                      "<hr>"
                    );
                  $.each(resultado, function (i, contato) {

                        $("#divGrupo").append(

                          " <div id="+ 'grupo' + resultado[i].cd_grupo +" class='row grupo  py-2 mt-1'  onclick=exibirConversa(this.id,'grupo')  >" +                          "<div class='col-2  divFotoAmigo p-0 mx-3' >" +
                          "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo'>" +
                          "</div>" +
                          "<div>"+ resultado[i].nm_grupo + "</div>"+
                          "</div>" +
                          "<hr>"

                          );

                  });

              },
              error: function (result) {
                  console.error(result);
              }
          });
}
function exibirConversa(para, tipoChat){
  document.getElementById('btnEnviarChat').hidden = true;
  document.getElementById('btnEnviarChatAmigoGrupo').hidden = false;
  var bgWhite = document.getElementsByClassName('amigo');
  for(let i = 0; i < bgWhite.length; i++){
    bgWhite[i].style.backgroundColor = 'white';
  }
  var bgWhite = document.getElementsByClassName('grupo');
  for(let i = 0; i < bgWhite.length; i++){
    bgWhite[i].style.backgroundColor = 'white';
  }

  if(para.indexOf('amigo') != -1 || para.indexOf('grupo') != -1){
    var conversa = document.getElementById(para);
    conversa.style.backgroundColor = 'green';

  }else{
    var conversa = document.getElementById(tipoChat+para);
    conversa.style.backgroundColor = 'green';
  }

  repetir('parar')
  var cdPara = para.replace(tipoChat, "")
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/select-mensagemChat.php",
      data: {
          cdPara: cdPara,
          tipoChat: tipoChat
          },
          success: function (result) {
            $("#divChat").empty();
            document.getElementById('txtTipoChat').value = tipoChat;
            document.getElementById('txtPara').value = cdPara;
              resultado = JSON.parse(result);
              var cd = document.getElementById('txtCdPerfil').value
              $.each(resultado, function (i, contato) {
                  if (cd == resultado[i].cd_de) {
                      $(".divChat").append(
                          // + resultado[i].cd_postagem

                          "<div class='row flex-row-reverse  mt-3'>" +
                          "<div  class='divDigitar col-auto' width='auto' >" + resultado[i].nm_nickname +
                          ": " + resultado[i].ds_mensagem + "</div>" +
                          // "<div class='col-5'></div>" +
                          "</div>"
                          );
                  } else {
                      $(".divChat").append(
                          // + resultado[i].cd_postagem
                          "<div class='row  mt-3'>" +
                          "<div  class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname +
                          ": " + resultado[i].ds_mensagem + "</div>" + "</div>"

                          );
                  }

              });
                repetirChat();
                  var x = document.getElementById("divChat").offsetHeight;
                  document.getElementById("divChat").scrollTop = x * 10;


          },
          error: function (result) {
              console.error(result);
          }
      });

}
function repetirChat(){
  const tipoChat = document.getElementById('txtTipoChat').value;
  const para = document.getElementById('txtPara').value;
  setTimeout(function(){   exibirConversa(para, tipoChat); }, 5000);
}

function enviarMensagemChat(){
  event.preventDefault();
  var tipoChat = document.getElementById('txtTipoChat').value;
  var para = document.getElementById('txtPara').value;
  var btn = document.getElementById('btnEnviarChatAmigoGrupo');
  $.ajax(
    {
      type: "POST",
      url: "paginas/recursos/enviar-MensagemMinichat.php",
      data: {
        chave: 'valorizado demais esse AJAX!!', //key : value
        //caso envie dados ;)
        para:para,
        mensagem:$("#txtMensagem").val(),
        tipoChat:tipoChat
      },
      success: function (result) {
        $("#txtMensagem").val("");
        btn.disabled = false;
        exibirConversa(para, tipoChat);
      },
      error: function (result) {
        btn.disabled = false;
        console.error(result);
      }
    });
}
// Amigo
function exibirAmigo() {
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/exibir-amigo.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
            },
            success: function (result) {
                  $("#divAmigo").empty();
                resultado = JSON.parse(result);
                  $("#divAmigo").append(
                    "<div class='mx-2'>" +
                    "<h3>Amigos</h3> " +
                    "</div>" +
                    "<hr>"
                  );
                $.each(resultado, function (i, contato) {
                    $("#divAmigo").append(
                      "<div class=' mx-1 amigo mt-1'>"+
                      " <div class='row'>" +
                      "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" +
                      "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                      "</div>" +
                      "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" +
                      "<ul class='meuDropdown'>"  +
                        // "<span>" +
                        "<div class='row'>"+
                        "<span class='nickname col-6' onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>"+ resultado[i].nm_nickname  + "</span>"+
                        "<li class='col-6'><a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" +
                        "<ul class='text-left'>" +
                        // "<li onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>Perfil</li>" +
                        "<li onclick=aparecerMinichat('modalMinichat',"+resultado[i].cd_perfil+",\""+resultado[i].nm_nickname+"\",'amigo')>Conversar</li>" +
                        "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
                        resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +

                        "</ul>" +
                        "</li>" +
                        "</div>"+
                        "</ul> " +
                        // "</span>"  + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div> <hr >"

                        );

                });
                    $("#divAmigo").append(
                      "<div class='row  m-0  rounded align-items-center'>"+
                        "<div>"+
                            "<input class='inputAmigo'  id='txtNomeAmigo' placeholder='Buscar amigo'>"+
                        "</div>"+
                        "<div>"+
                          "<div >"+
                            "<input type='submit' class='BuscaAmigo' id='btnBuscarAmigo'  value='Buscar' onclick='buscarAmigo(txtNomeAmigo, this.id)'>"+
                          "</div>"+
                        "</div>"+
                      "</div>"
                    )
            },
            error: function (result) {
                console.error(result);
            }
        });
}

function buscarAmigo(nomeAmigo, button){
  var nomeAmigo = nomeAmigo.value
  var btn = document.getElementById(button);
  btn.disabled = true;
  event.preventDefault();
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/buscarAmigo.php",
      data: {
              chave: 'valorizado demais esse AJAX!!', //key : value
              //caso envie dados ;)
              nomeAmigo: nomeAmigo
          },
          success: function (result) {


              btn.disabled = false;
              resultado = JSON.parse(result);
              $("#divAmigo").empty();
            resultado = JSON.parse(result);
              $("#divAmigo").append(
                "<div class='mx-2'>" +
                "<h3>Amigos</h3> " +
                "</div>" +
                "<hr>"
              );
            $.each(resultado, function (i, contato) {
              $("#divAmigo").append(
                "<div class=' mx-1 amigo mt-1'>"+
                " <div class='row'>" +
                "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" +
                "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                "</div>" +
                "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" +
                "<ul class='meuDropdown'>"  +
                  // "<span>" +
                  "<div class='row'>"+
                  "<span class='nickname col-6' onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>"+ resultado[i].nm_nickname  + "</span>"+
                  "<li class='col-6'><a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" +
                  "<ul class='text-left'>" +
                  // "<li onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>Perfil</li>" +
                  "<li onclick=aparecerMinichat('modalMinichat',"+resultado[i].cd_perfil+",\""+resultado[i].nm_nickname+"\",'amigo')>Conversar</li>" +
                  "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
                  resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +

                  "</ul>" +
                  "</li>" +
                  "</div>"+
                  "</ul> " +
                  // "</span>"  + "</p>" +
                  "</div>" +
                  "</div>" +
                  "</div> <hr >"

                  );

            });
            $("#divAmigo").append(
              "<div class='row p-1 m-0  rounded align-items-center'>"+
                "<div class='col-12 col-xl-4'>"+
                  "<div class='text-center '>"+
                    "<input class='inputText' id='txtNomeAmigo' placeholder='Buscar amigo'>"+
                  "</div>"+
                "</div>"+
                "<div class='offset-xl-2  col-12 col-xl-5'>"+
                  "<div class='divButton2 ' >"+
                    "<div class='button ' id='btnBuscarAmigo' onclick='buscarAmigo(txtNomeAmigo, this.id)'>Buscar</div>"+
                  "</div>"+
                "</div>"+
              "</div>"


                )
                if(result == " []"){

                  exibirAmigo()
                }
          },
          error: function (result) {
              console.error(result);
          }
      });
}



function exibirGrupos(){
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/exibir-grupos.php",
      data: {
              chave: 'valorizado demais esse AJAX!!', //key : value
              //caso envie dados ;)
          },
          success: function (result) {

                $("#divGrupo").empty();
              resultado = JSON.parse(result);
                $("#divGrupo").append(
                  "<div class='mx-2'>" +
                  "<h3>Clã</h3> " +
                  "</div>" +
                  "<hr>"
                );
              $.each(resultado, function (i, contato) {

                var nm_grupo = resultado[i].nm_grupo;
                while(nm_grupo.indexOf(" ") != -1){
                  nm_grupo = nm_grupo.replace(" ", '/espaco');

                }
                  $("#divGrupo").append(

                    "<div class=' mx-1 amigo mt-1'>"+
                    " <div class='row'>" +
                    "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" +
                    "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                    "</div>" +
                    "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" +
                    "<ul class='meuDropdown'>"  +
                      // "<span>" +

                      "<li>" + "<span  class='NomeGrupo'>"+resultado[i].nm_grupo + "</span>" + 
                      "<ul class='text-left'>" +
                      "<li onclick=aparecerMinichat(\""+'modalMinichat' + '\",\"'+resultado[i].cd_grupo + '\",\"'+nm_grupo+"\",'grupo')>Abrir conversa</li>" +
                      "<li onclick='sairGrupo("+resultado[i].cd_grupo+")'>Sair do grupo</li>" +
                      "<li>Denunciar grupo</li>" +
                      // "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
                      // resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +

                      "</ul>" +
                      "</li>" +
                      "</ul> " +
                      // "</span>"  + "</p>" +
                      "</div>" +
                      "</div>" +
                      "</div> <hr >"

                      );

              });
              $("#divGrupo").append(
                "<div>"+
                "<input class='InputGrupo' id='txtNomeGrupo' placeholder='Buscar grupo'>"+
                "<input type='submit' class='BotaoGrupo' id='btnBuscarGrupo' onclick='buscarGrupo(txtNomeGrupo, this.id)' value='Buscar'>"+
                "<div>"
              )
          },
          error: function (result) {
              console.error(result);
          }
      });
}
function buscarGrupo(nomeGrupo, button){
  var nomeGrupo = nomeGrupo.value
  var btn = document.getElementById(button);
  btn.disabled = true;
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/buscarGrupo.php",
      data: {
              nomeGrupo: nomeGrupo
          },
          success: function (result) {
              btn.disabled = false;

                $("#divGrupo").empty();
              resultado = JSON.parse(result);
                $("#divGrupo").append(
                  "<div class='mx-2'>" +
                  "<h3>Grupos</h3> " +
                  "</div>" +
                  "<hr>"
                );
              $.each(resultado, function (i, contato) {

                var nm_grupo = resultado[i].nm_grupo;
                while(nm_grupo.indexOf(" ") != -1){
                  nm_grupo = nm_grupo.replace(" ", '/espaco');

                }
                  $("#divGrupo").append(

                    "<div class=' mx-1 amigo mt-1'>"+
                    " <div class='row'>" +
                    "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" +
                    "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                    "</div>" +
                    "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" +
                    "<ul class='meuDropdown'>"  +
                      // "<span>" +

                      "<li >" + resultado[i].nm_grupo +
                        "<a href'#'>" +
                          "<img  class='dropdownIcon' src='assets/img/icon/dropdown.png'>" +
                        "</a>" +

                      "<ul class='text-left'>" +
                      "<li onclick=aparecerMinichat(\""+'modalMinichat' + '\",\"'+resultado[i].cd_grupo + '\",\"'+nm_grupo+"\",'grupo')>Abrir conversa</li>" +
                      "<li onclick='sairGrupo("+resultado[i].cd_grupo+")'>Sair do grupo</li>" +
                      "<li>Denunciar grupo</li>" +
                      // "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
                      // resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +

                      "</ul>" +
                      "</li>" +
                      "</ul> " +
                      // "</span>"  + "</p>" +
                      "</div>" +
                      "</div>" +
                      "</div> <hr >"

                      );

              });
              $("#divGrupo").append(
                "<div id='txtNomeGrupo' class='text-center p-1'>"+
                "<input placeholder='Buscar grupo por nome'>"+
                "<button id='btnBuscarGrupo' onclick='buscarAmigo(txtNomeGrupo, this.id)'>Enviar</button>"+
                "<div>"
              )
          },
          error: function (result) {
              console.error(result);
          }
      });
}

function aparecerUsuarios() {
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/exibir-usuarios.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
            },
            success: function (result) {

                resultado = JSON.parse(result);

                var perfil = document.getElementById('txtCdPerfil').value
                $("#divUsuarios").empty()
                var vrf = [];
                  $.each(resultado, function (i) {
                    if(resultado[i].repetido > 1 && (resultado[i].cd_de == perfil || resultado[i].cd_para == perfil)){
                        vrf[i] = resultado[i].cd_perfil;
                    }
                  });

                $.each(resultado, function (i) {
                  if(vrf.includes(resultado[i].cd_perfil)){
                    if(resultado[i].cd_de == perfil ) { //
                        $("#divUsuarios").append(
                          "<div class='row p-5'>" +
                          "<div class='col-md-2 text-center' >" +
                          "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" +
                          "</div>" +
                          "<div class='col-12 col-md-6 offset-md-3'>" +
                          "<div class='col-md-12'>" +
                          "<p >" + resultado[i].nm_nickname + "</p>" +
                          "</div>" +
                          "<div class='col-md-12'>" +
                          "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='cancelarSolicitacao(this.id)'>Cancelar solicitação</button>" +
                          "</div>" +
                          "</div>" +
                          "<hr>"
                        )
                        }
                        else  if(resultado[i].cd_para == perfil ) { //
                            $("#divUsuarios").append(
                              "<div class='row p-5'>" +
                              "<div class='col-md-2 text-center' >" +
                              "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" +
                              "</div>" +
                              "<div class='col-12 col-md-6 offset-md-3'>" +
                              "<div class='col-md-12'>" +
                              "<p >" + resultado[i].nm_nickname + "</p>" +
                              "</div>" +
                              "<div class='col-md-12'>" +
                              // "<div id='' hidden></div>"+
                              "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='aceitarAmizade("+resultado[i].cd_de+", "+resultado[i].cd_para+")'>Aceitar solicitação</button>" +
                              "</div>" +
                              "</div>" +
                              "<hr>"
                            )

                            };
                  }else {
                    if (resultado[i].cd_de != perfil &&  resultado[i].cd_para != perfil) {//
                        $("#divUsuarios").append(

                            "<div class='row p-5 usuarioItens'>" +
                            "<div class='col-md-2 col-12' >" +
                            "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" +
                            "</div>" +
                            "<div class='col-12 col-md-6 offset-md-3 text-center'>" +
                            "<div class='col-md-12'>" +
                            "<p class='txtVisualizarPerfil' onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>" + resultado[i].nm_nickname + "</p>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='solicitarAmizade(this.id)'>Solicitar amizade</button>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "<hr>"


                            );
                    } else if(resultado[i].cd_de == perfil ) { //
                        $("#divUsuarios").append(
                            "<div class='row p-5 usuarioItens'>" +
                            "<div class='col-md-2 col-12' >" +
                          "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" +
                          "</div>" +
                          "<div class='col-12 col-md-6 offset-md-3 text-center'>" +
                          "<div class='col-md-12'>" +
                          "<p >" + resultado[i].nm_nickname + "</p>" +
                          "</div>" +
                          "<div class='col-md-12'>" +
                          "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='cancelarSolicitacao(this.id)'>Cancelar solicitação</button>" +
                          "</div>" +
                          "</div>" +
                          "</div>" +
                          "<hr>"
                        )
                        }
                        else  if(resultado[i].cd_para == perfil ) { //
                            $("#divUsuarios").append(
                              "<div class='row p-5'>" +
                              "<div class='col-md-2 text-center' >" +
                              "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" +
                              "</div>" +
                              "<div class='col-12 col-md-6 offset-md-3'>" +
                              "<div class='col-md-12'>" +
                              "<p >" + resultado[i].nm_nickname + "</p>" +
                              "</div>" +
                              "<div class='col-md-12'>" +
                              // "<div id='' hidden></div>"+
                              "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='aceitarAmizade("+resultado[i].cd_de+", "+resultado[i].cd_para+")'>Aceitar solicitação</button>" +
                              "</div>" +
                              "</div>" +
                              "<hr>"
                            )
                            };
                          }

                });
            },
            error: function (result) {
                console.error(result);
            }
        });
}

//Adiciona um amigo
function solicitarAmizade(e) {
    var id = e;
    var button = document.getElementById(id);
    button.disabled;
    event.preventDefault();
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/solicitar-amizade.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                cd_para: id
            },
            success: function (result) {

                button.disabled = false;
                // resultado = JSON.parse(result);
                aparecerUsuarios()
            },
            error: function (result) {
                console.error(result);
            }
        });
}

function cancelarSolicitacao(e) {
    var id = e;
    var button = document.getElementById(id);
    button.disabled;
    event.preventDefault();
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/apagar-solicitacao.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                cd_para: id

            },
            success: function (result) {

                button.disabled = false;
                // resultado = JSON.parse(result);
                $("#divUsuarios").empty()
                aparecerUsuarios()
            },
            error: function (result) {
                console.error(result);
            }
        });
}

//Pesquisar usuario na pagina buscar amigo
$("#btnBuscarAmigo").click(function (event) {

    event.preventDefault();


    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/pesquisar-amigo.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                nome: $("#txtBuscarAmigo").val(),

            },
            success: function (result) {
              console.log(result);
                resultado = JSON.parse(result);
                $("#divUsuarios").empty();

                var perfil = document.getElementById('txtCdPerfil').value
                $.each(resultado, function (i, contato) {
                    if (resultado[i].cd_de != perfil) {
                        $("#divUsuarios").append(

                            "<div class='row'>" +
                            "<div class='col-md-6'>" +
                            "<img class='imgUsuario ' src=" + resultado[i].ds_imagem + ">" +
                            "</div>" +
                            "<div class='row col-md-6'>" +
                            "<div class='col-md-12'>" +
                            "<p >" + resultado[i].nm_nickname + "</p>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='solicitarAmizade(this.id)'>Solicitar amizade</button>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +

                            "<hr>"


                            );
                    } else {
                        $("#divUsuarios").append(
                            "<div class='row'>" +
                            "<div class='col-md-6'>" +
                            "<img class='imgUsuario ' src=" + resultado[i].ds_imagem + ">" +
                            "</div>" +
                            "<div class='row col-md-6'>" +
                            "<div class='col-md-12'>" +
                            "<p >" + resultado[i].nm_nickname + "</p>" +
                            "</div>" +
                            "<div class='col-md-12'>" +
                            "<button class='botaoEnviarBP' id=" + resultado[i].cd_perfil + " onclick='cancelarSolicitacao(this.id)'>Cancelar solicitação</button>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +

                            "<hr>"
                            );
                    }


                });
                if ($("#txtBuscarAmigo").val() == "") {
                    aparecerUsuarios()
                }
                $("#txtBuscarAmigo").val("")
            },
            error: function (result) {

                console.error(result);

            }
        });
});


function filtrarNotificacao(e){
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/filtrarNotificacao.php",
      data: {
              chave: 'valorizado demais esse AJAX!!', //key : value
              //caso envie dados ;)
              campo: e.value

          },
          success: function (result) {
            $("#divNotificacao").empty();

              resultado = JSON.parse(result);
              $("#divNotificacao").append(
                "<ul class='meuDropdown text-center'>"  +
                  "<li>" + "filtrar" + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" +
                  "<ul class='w-100'>" +
                  "<li name='filtrarNotificacao' value='1' onclick='filtrarNotificacao(this)'>Mensagem</li>" +
                  "<li name='filtrarNotificacao' value='2' onclick='filtrarNotificacao(this)' >Postagem</li>" +
                  "<li name='filtrarNotificacao' value='3' onclick='filtrarNotificacao(this)' >Denuncia</li>" +
                  "<li name='filtrarNotificacao' value='4' onclick='filtrarNotificacao(this)' >Grupo</li>" +
                  "<li name='filtrarNotificacao' value='5' onclick='filtrarNotificacao(this)' >Curtida</li>" +
                  "<li name='filtrarNotificacao' value='6' onclick='filtrarNotificacao(this)' >Comentário</li>" +
                  "<li name='filtrarNotificacao' value='7' onclick='filtrarNotificacao(this)' >Solicitação de amizade</li>" +
                  "</ul>" +
                  "</li>" +
                  "</ul> " +
                  "<hr >"
              );
              // var perfil = document.getElementById('txtCdPerfil').value


              $.each(resultado, function (i, contato) {
                  if(resultado[i].nm_tipo_notificacao == "solicitação de amizade"){
                $("#divNotificacao").append(
                  "<div class='row'>"+
                  "<p class='text-center col-lg-12'>Convite de amizade</p>" +
                  "<p class='col-lg-12'><img id='imgPerfilNotificacao' src=" + resultado[i].ds_imagem + "><span class='mx-2'>" + resultado[i].nm_nickname + "</span></p>" +
                  "<div class='col-lg-12 'row p-0 m-0'>"+

                  "<button class='btnTrue  col-12' onclick='aceitarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >"+
                  "Aceitar"+
                  "</button>" +
                  "<p class=col-12></p>"+
                  "<button class='btnFalse col-12 ' onclick='recusarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >"+
                  "Recusar"+
                  "</button>"+
                  "</div>"+
                  "</div>"+
                  "<hr>"
                );
  }else{
        $("#divNotificacao").append(
          "<div class='row'>"+
          "<div class='col-12 text-center'>" +
          "<h4>" +resultado[i].nm_tipo_notificacao + "</h4> "+
          "</div>"+
            "<hr>"+
          "<div class='col-2'>"+
            "<img class='w-50' src=" + resultado[i].ds_imagem + ">"+
          "</div>"+
          "<div class='col-10'>"+
           resultado[i].nm_titulo   +
        "</div>"+
          "<div class='col-12'>"+
        "de:" +  resultado[i].nome   +
        "</div>"+
        "</div>"+
        "<hr>"
        )
  }

              });

          },
          error: function (result) {
              console.error(result);
          }
      });
}


function notificar() {
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/exibir-notificacao.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)


            },
            success: function (result){

                resultado = JSON.parse(result);
                $("#divNotificacao").empty()
                // var perfil = document.getElementById('txtCdPerfil').value
                $("#divNotificacao").append(
                  "<ul class='meuDropdown text-center'>"  +
                    // "<span>" +

                    "<li>" + "filtrar" + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" +
                    "<ul class='w-100'>" +
                    "<li name='filtrarNotificacao' value='1' onclick='filtrarNotificacao(this)'>Mensagem</li>" +
                    "<li name='filtrarNotificacao' value='2' onclick='filtrarNotificacao(this)' >Postagem</li>" +
                    "<li name='filtrarNotificacao' value='3' onclick='filtrarNotificacao(this)' >Denuncia</li>" +
                    "<li name='filtrarNotificacao' value='4' onclick='filtrarNotificacao(this)' >Grupo</li>" +
                    "<li name='filtrarNotificacao' value='5' onclick='filtrarNotificacao(this)' >Curtida</li>" +
                    "<li name='filtrarNotificacao' value='6' onclick='filtrarNotificacao(this)' >Comentário</li>" +
                    "<li name='filtrarNotificacao' value='7' onclick='filtrarNotificacao(this)' >Solicitação de amizade</li>" +

                    "</ul>" +
                    "</li>" +
                    "</ul> " +

                    "<hr >"

                );

                $.each(resultado, function (i, contato) {
                  if(resultado[i].cd_tipo_notificacao == 7){
                    $("#divNotificacao").append(
                      "<div class='row'>"+
                      "<p class='text-center col-lg-12'>Convite de amizade</p>" +
                      "<p class='col-lg-12'><img id='imgPerfilNotificacao' src=" + resultado[i].ds_imagem + "><span class='mx-2'>" + resultado[i].nome + "</span></p>" +
                      "<div class='col-lg-12 'row p-0 m-0'>"+
                      "<button class='btnTrue  col-12' onclick='aceitarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >"+
                      "Aceitar"+
                      "</button>" +
                      "<p class=col-12></p>"+
                      "<button class='btnFalse col-12 ' onclick='recusarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >"+
                      "Recusar"+
                      "</button>"+
                      "</div>"+
                      "</div>"+
                      "<hr>"
                    );
                  }else{
                    $("#divNotificacao").append(
                      "<div class='row'>"+
                      "<div class='col-12 text-center'>" +
                      "<h4>" +resultado[i].nm_tipo_notificacao + "</h4> "+
                      "</div>"+
                      "<hr>"+
                      "<div class='col-2'>"+
                      "<img class='w-50' src=" + resultado[i].ds_imagem + ">"+
                      "</div>"+
                      "<div class='col-10'>"+
                      resultado[i].nm_titulo   +
                      "</div>"+
                      "<div class='col-10 text-center'>"+
                      "de: " +  resultado[i].nome   +
                      "</div>"+
                      "<div class='col-10 text-center'>"+
                      "<button class='btnTrue' onclick='apagarNotificacao("+resultado[i].cd_notificacao+"),notificar()'>ok</button>" +
                      "</div>"+
                      "</div>"+
                      "<hr>"
                    )
                  }

                });
            },
            error: function (result) {
                console.error(result);
            }
        });

    // Aparecer quantidade de notificações
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/exibir-qtNotificacao.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)


            },
            success: function (result) {

                resultado = JSON.parse(result);
                $("#qtNotificacao").empty()
                // var perfil = document.getElementById('txtCdPerfil').value
                $.each(resultado, function (i, contato) {
                    if (resultado[i].qt > 1) {
                        $("#qtNotificacao").append(


                            "<span class='text-danger '>" + resultado[i].qt + " </span>" + "Notificações"



                            );
                    } else if (resultado[i].qt == 1) {
                        $("#qtNotificacao").append(


                            "<span class='text-danger '>" + resultado[i].qt + " </span>" + "Notificação"
                            );
                    }
                    else if (resultado[i].qt == 0) {
                        $("#qtNotificacao").append(

                            "<span class='text-light'>" + resultado[i].qt + " </span>" + "Notificações"
                            );
                    }


                });
            },
            error: function (result) {
                console.error(result);
            }
        });
}
function apagarNotificacao(cd_notificacao){
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/apagarNotificacao.php",
      data: {
              chave: 'valorizado demais esse AJAX!!',
              cdNotificacao: cd_notificacao
          },
          success: function (result) {
              if (result == ' sucesso') {

                  notificar();
              } else {
                  console.log('ops! houve um erro ao apagar a notificacao');
              }
          },
          error: function (result) {
              console.error(result);
          }
      });
}


function aceitarAmizade(id, value) {
    var de = id;
    var para = value;
    var url = window.location.href;

    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/aceitar-amizade.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                // $("#txtBuscarAmigo").val(),
                de: de,
                para: para
                // para:

            },
            success: function (result) {

                if (result == ' sucesso') {
                    console.log('Amigo adicionado com sucesso')
                    notificar();
                    exibirAmigo();
                    if(url == 'http://localhost/tcc%20(6)/buscarAmigo.php'){
                       aparecerUsuarios();
                    }
                } else {
                    console.log('Não foi possivel adiciona-lo');
                }
            },
            error: function (result) {
                console.error(result);
            }
        });
}

function recusarAmizade(id, value) {
    var de = id;
    var para = value;
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/recusar-amizade.php",
        data: {
                chave: 'valorizado demais esse AJAX!!', //key : value
                //caso envie dados ;)
                // $("#txtBuscarAmigo").val(),
                de: de,
                para: para
                // para:

            },
            success: function (result) {
                if (result == ' sucesso') {
                    console.log('Solicitação recusada com sucesso')
                    notificar();
                } else {
                    console.log('Não foi possivel recusar');
                }
            },
            error: function (result) {
                console.error(result);
            }
        });
}

function aparecerModal(id) {
    // var modal = document.getElementsByClassName("myModal");
    // var modal = document.querySelectorAll(".myModal");
    var widthTela = window.innerWidth;
    var modal = document.getElementById(id);
    var container = document.querySelector(".container-fluid");
    if (modal.hidden == true ) {
        modal.hidden = false;
        // body.style.backgroundColor = 'black';
        if(id != 'modalMinichat'){
          container.style.opacity = '0.3';
        }
    } else {
        modal.hidden = true;
        container.style.opacity = '1.0';
    }
}

function alterarImagem() {

    var data = new FormData();
    // data.append('txttitulo', $("#txttitulo").val());
    // data.append('txtdescricao', $("#txtdescricao").val());
    data.append('txtimagem', $('#fileAlterarImagem').prop('files')[0]);

    $.ajax({
        url: 'paginas/recursos/alterar-imagem.php',
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,


        success: function (result) {
          console.log(result);
            // $("#fileAlterarImagem").val('')

            $("#divFotoPerfil").empty()
            // $("#divFotoPerfil").append(
            //     "<img id='imgPerfil' class='fotoPerfil' src=" + result + " >" +
            //     " <figcaption>Alterar foto</figcaption>"
            //     )
            location.href = "perfil.php"
        }
    });
}

function validarNickname(id, small, btn) {
    var txtNickname = document.getElementById(id);
    var txtSmall = document.getElementById(small);
    var button = document.getElementById(btn);
    button.classList.add("disabled");
    button.disabled;
    if (txtNickname.value.length < 6) {
        txtSmall.innerHTML = "Digite no minimo 6 caracteres";
        campoInvalido(id, small);
        return false;
    } else {
        campoValido(id, small);
        txtSmall.innerHTML = "";

    }


    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/selecionar-todos-nicknames.php",
        data: {
            chave: 'valorizado demais esse AJAX!!',

        },
        success: function (result) {

                resultado = JSON.parse(result)
                $.each(resultado, function (i, contato) {
                    if (resultado[i].nm_nickname == txtNickname.value) {
                        txtSmall.innerHTML = "O nickname " + resultado[i].nm_nickname + " ja está sendo usado";
                        campoInvalido(id, small);
                        if(window.location.href == "http://localhost/dtcc/"){
                          document.getElementById('vrf').value = 'invalido';
                        }
                        return false
                    } else {
                        campoValido(id, small);
                        txtSmall.innerHTML = "Nickname válido";
                        button.classList.remove("disabled");
                        if(window.location.href == "http://localhost/dtcc/"){
                          document.getElementById('vrf').value = 'valido';
                        }
                    }


                });
            },
            error: function (result) {
                console.error(result);
            }
        });
    button.disabled = false;
}

function campoInvalido(id, small) {
    var campo = document.getElementById(id);
    var small = document.getElementById(small);
    campo.classList.remove("inputTextValid");
    campo.classList.add("inputTextInvalid");
    small.style.color = "red";
}

function campoValido(id, small) {
    var campo = document.getElementById(id);
    var small = document.getElementById(small);
    campo.classList.remove("inputTextInvalid");
    campo.classList.add("inputTextValid");
    small.style.color = "#00c800";
}

function alterarNickname(id, small){
    var txtNickname = document.getElementById(id).value;
    // var txtSmall = document.getElementById(small)
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/alterar-nickname.php",
        data: {
            nickname: txtNickname
        },
        success: function (result) {
            txtSmall.innerHTML = "Nickname Alterado com sucesso";

            $("#txtNickname").val("");
            $(".labelNickname").empty();
            $(".labelNickname").append(
                "<p>"+ txtNickname +" </p>"
                )
                // resultado = JSON.parse(result)
                // $.each(resultado, function (i, contato) {



                // });
            },
            error: function (result) {
                console.error(result);
            }
        });
}

// function dropdownAmigo(){
//
// }

function pegarNickname(nickname, campo){
    var nick = nickname;
    var campo = document.getElementById(campo);
    campo.innerHTML = campo.innerHTML + "\"" + nick + "\"";
}

function pegarId(id, campo){
    var id = id;
    var campo = document.getElementById(campo);
    campo.value = id ;
}

function removerAmigo(){
    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/remover-amigo.php",
        data: {
            chave: 'valorizado demais esse AJAX!!', //key : value
            //caso envie dados ;)
            id: $("#txtId").val()


        },
        success: function (result) {

            if(result = ' sucesso'){
                window.location.reload()
            }


        },
        error: function (result) {
            console.error(result);
        }
    });
}
function exibirMinhasPostagensBasica(e){

  var url = "";
  var campo = "";
  var vrf = "";
  if(e == null){
    url = "paginas/recursos/exibirMinhasPostagens.php";
  }else{
    url = "paginas/recursos/filtrarPostagem.php";
    campo = e.value;
    vrf = e.name;

  }
  $.ajax(
  {
   type: "POST",
   url: url,
   data: {
             campo: campo,
             vrf: vrf
         },
         success: function (result) {

             var cont = 0;
             $("#minhasPostagens").empty()
             resultado = JSON.parse(result);
             var cd = document.getElementById('txtCdPerfil').value;
             $.each(resultado, function (i, contato) {
               var extensao = "";
               if(resultado[i].cd_tipo_postagem == 1){extensao = "<img class='col-12' src=" + resultado[i].ds_imagem + ">"}

               if(resultado[i].cd_tipo_postagem == 2){
                 extensao = "<video width='100%' height='100%' controls><source src="+resultado[i].ds_imagem+" type='video/mp4'></video>";
                 while(extensao.indexOf("\"") != -1){extensao= extensao.replace(/"/g, '');}
               }
               if(resultado[i].cd_tipo_postagem == 3){
                 extensao = "<audio width='100%' height='100%' controls> <source src="+resultado[i].ds_imagem+" type='audio/mpeg'> </audio>";
                 while(extensao.indexOf("\"") != -1){extensao= extensao.replace(/"/g, '');}
               }
             if (resultado[i].ds_imagem == null) {

                 $("#minhasPostagens").append(
                     "<div class='divDividir '>" + "</div>" +
                     "<div class='espacoPostagem '>" +
                     "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" +
                     "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" +
                     "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" +
                     // "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                     // "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                     // "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                     "</div>" +
                     " <hr class='linha'> "

                     );
                   } else {
                 $("#minhasPostagens").append(
                     "<div class='divDividir'>" + "</div>" +
                     "<div class='espacoPostagem' >" +
                     "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" +
                     "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" +
                     "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" +
                     "<p>" + extensao + "</p>" +
                     // "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                     // "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                     // "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                     // "</div>" +
                     " <hr class='linha'> "

                     );
             }


     });
         },
         error: function (result) {
           console.error(result);
       }
   });
}
function vizualizarPerfil(id){
    location.href = 'visualizarPerfil.php';

    var cd_perfil = document.getElementById('txtOutroPerfil').value = id

    $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/salvar-id-outroPerfil.php",
        data: {
            id: cd_perfil
        },
        success: function (result) {
        },
        error: function (result) {
            console.error(result);
        }
    });
}
function exibirDadosPerfil(){
  var cd_perfil = document.getElementById('txtOutroPerfil').value;
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/select-dadosOutroPerfil.php",
      data: {
          id: cd_perfil
      },
      success: function (result) {

          resultado = JSON.parse(result);
        var data = converterData(resultado[0].dt_nasc)

        $("#nicknameOutroPerfil").append(
          resultado[0].nm_nickname
        )
        $("#dataNascOutroPerfil").append(
          // resultado[0].dt_nasc
          data
        )
        if(resultado[0].ds_sexo == "M"){
        $("#sexoOutroPerfil").append(
          "<img class='iconSexo' src='assets/img/icon/M.png'>"
        )
      }else if(resultado[0].ds_sexo == "F"){
        $("#sexoOutroPerfil").append(
          "<img class='iconSexo' src='assets/img/icon/F.png'>"
        )
      }
      },
      error: function (result) {
          console.error(result);
      }
  });
}
function converterData(data)
{
	return data.split('-').reverse().join('/');
}
function postagemOutroPerfil(){
  var cd_perfil = document.getElementById('txtOutroPerfil').value;
  $.ajax(
    {
      type: "POST",
      url: "paginas/recursos/exibirPostagemOutroPerfil.php",
      data: {
        chave: 'valorizado demais esse AJAX!!', //key : value
        //caso envie dados ;)
        id: cd_perfil
      },
      success: function (result) {
        var a = 0;

        $("#minhasPostagens").empty()
        resultado = JSON.parse(result);
        var cd = cd_perfil;

        $.each(resultado, function (i, contato) {

          if (resultado[i].cdPerfil === cd){
            a++;
            if(a > 0  && a < 2){
              $("#minhasPostagens").empty()
              $("#minhasPostagens").append(
                "<h3>Minhas Postagens</h3>"
              )

            }
            if (resultado[i].ds_imagem == null) {

              $("#minhasPostagens").append(
                "<div class='divDividir '>" + "</div>" +
                "<div class='espacoPostagem '>" +
                "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" +
                "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" +
                "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" +
                "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                "</div>" 

              );
            } else {

              $("#minhasPostagens").append(
                "<div class='divDividir'>" + "</div>" +
                "<div class='espacoPostagem' >" +
                "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" +
                "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" +
                "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" +
                "<p>" + "<img class='col-12 imgPostagem' src=" + resultado[i].ds_imagem + ">" + "</p>" +
                "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" +
                "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" +
                "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" +
                "</div>" 
              );

            }
          }else if(a == 0) {
              $("#minhasPostagens").empty()
            $("#minhasPostagens").append(
              "<h3>Nenhuma Postagem Feita</h3>"
            );
            // var divMinhasPostagens = document.getElementById('minhasPostagens');
            // divMinhasPostagens.style.backgroundColor = "transparent";
            //   divMinhasPostagens.style.color = "transparent";
          }

        });
      },
      error: function (result) {
        console.error(result);
      }
    });
  }
function amigosOutroPerfil(){
    var cd = document.getElementById('txtOutroPerfil').value;
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/exibirAmigoOutroPerfil.php",
      data: {
              chave: 'valorizado demais esse AJAX!!', //key : value
              //caso envie dados ;)
          },
          success: function (result) {

              resultado = JSON.parse(result);
              $("#divAmigo").append(
                "<div class='mx-2'>" +
                "<h3>Amigos</h3> " +
                "</div>" +
                "<hr>"
              );
              $.each(resultado, function (i, contato) {
                if (resultado[i].cd_perfil != cd){
                  $("#divAmigo").append(

                    "<div class=' mx-1'>"+
                    " <div class='row '>" +
                    "<div class='col-md-1 col-lg-2  divFotoAmigo p-0 mx-3 '>" +
                    "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" +
                    "</div>" +
                    "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" +
                    "<ul class='meuDropdown'>"  +
                      // "<span>" +

                      "<li>" + resultado[i].nm_nickname + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" +
                      "<ul class='text-left'>" +
                      "<li onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>Perfil</li>" +
                      // "<li>Conversar</li>" +
                      "</ul>" +
                      "</li>" +
                      "</ul> " +
                      // "</span>"  + "</p>" +
                      "</div>" +
                      "</div>" +
                      "</div>"

                      );
}
              });
          },
          error: function (result) {
              console.error(result);
          }
      });
}

function aparecerMinichat(id, para, nickname, tipoChat) {
    // var modal = document.getElementsByClassName("myModal");
    // var modal = document.querySelectorAll(".myModal");
    var nick = nickname;
    document.getElementById('btnTipoChat').value = tipoChat;
    while(nick.indexOf("/espaco") != -1){
       nick = nick.replace("/espaco", " ");

    }

    var widthTela = window.innerWidth;
    var modal = document.getElementById(id);
    // document.getElementById('modalMinichat').value = tipoChat;


    var container = document.querySelector(".container-fluid");

    var btn = document.getElementById('btnMinichat');
    // console.log(modal.hidden);
    if (modal.hidden === true && widthTela >1200) {
        modal.hidden = false;
        document.querySelector('.nickMinichat').innerHTML =  nick;
        // body.style.backgroundColor = 'black';

        var time = setTimeout(function(){exibirMensagemMinichat(para,tipoChat); }, 100);
        var x = document.getElementById("divTextoMinichat").offsetHeight;
        btn.value = para;

        document.getElementById("divTextoMinichat").scrollTop = x * 10 ;
    } else {
        clearTimeout(time);
        modal.hidden = true;
        container.style.opacity = '1.0';
    }
}

function exibirMensagemMinichat(para, tipoChat){
  var de   = document.getElementById('txtCdPerfil').value;
  var para = para;
  // var para =
  var tipoChat = tipoChat;
  console.log('tipoChat: ',tipoChat);

  $.ajax(
    {
      type: "POST",
      url: "paginas/recursos/exibir-MensagemMinichat.php",
      data: {
        chave: 'valorizado demais esse AJAX!!', //key : value
        //caso envie dados ;)

        para: para,
        tipoChat: tipoChat
      },
      success: function (result) {
        resultado = JSON.parse(result);
        $("#divTextoMinichat").empty()
        if(tipoChat == "amigo"){
        $.each(resultado, function (i, contato) {
          if(resultado[i].cd_de == de && resultado[i].cd_para == para){
            $("#divTextoMinichat").append(
              "<div class='divEnviarMinichat'>" +
              "<p>"+resultado[i].ds_mensagem+"</p>" +
              "</div>"+
              "<br>"+
              "<br>"
            );
          }
          if(resultado[i].cd_de == para && resultado[i].cd_para == de){
            $("#divTextoMinichat").append(
              "<div class='row  mt-3'>" +
              "<div  class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname +
              ": " + resultado[i].ds_mensagem + "</div>" + "</div>"
            );
          }
        });
      }else if(tipoChat == "grupo"){

        $.each(resultado, function (i, contato) {
          if(resultado[i].cd_de == de){
            $("#divTextoMinichat").append(
              "<div class='divEnviarMinichat'>" +
              "<p>"+resultado[i].ds_mensagem+"</p>" +
              "</div>"+
              "<br>"+
              "<br>"+
              "<br>"
            );
          }
          else {
            $("#divTextoMinichat").append(
              "<div class='divReceberMinichat' id='divReceberMinichat'>" +
              "<p>" + resultado[i].nm_nickname +
              ": " +resultado[i].ds_mensagem+"</p>" +
              "</div>"+
              "<br>"+
              "<br>"+
              "<br>"
            );
          }
        });
      }
              var x = document.getElementById("divTextoMinichat").offsetHeight;
              document.getElementById("divTextoMinichat").scrollTop = x * 100;

      },
      error: function (result) {
        console.error(result);
      }
    });
  }



function enviarMensagemMinichat(){
  var btn = document.getElementById('btnMinichat');
  btn.disabled = true;
  var para = btn.value;
  var tipoChat = document.getElementById('btnTipoChat').value;
  $.ajax(
    {
      type: "POST",
      url: "paginas/recursos/enviar-MensagemMinichat.php",
      data: {
        chave: 'valorizado demais esse AJAX!!', //key : value
        //caso envie dados ;)
        para:btn.value,
        mensagem:$("#txtMinichat").val(),
        tipoChat:tipoChat
      },
      success: function (result) {
        $("#txtMinichat").val("");
        btn.disabled = false;
        // resultado = JSON.parse(result);

        exibirMensagemMinichat(para, tipoChat)//Passar o parametro;
      },
      error: function (result) {
        btn.disabled = false;
        console.error(result);
      }
    });
}



function abrirModalSucesso(texto){
  var modalSucesso = document.getElementById('modalSucesso');
  modalSucesso.innerHTML = ("<h3>" + texto + "</h3>" +
    "<button class='button' onclick='fecharModalSucesso()''>Ok</button>"
  );
  modalSucesso.hidden = false;
}

function fecharModalSucesso(){
  var modalSucesso = document.getElementById('modalSucesso');
  modalSucesso.hidden = true;
}

function adicionarAmigosGrupo(){
  event.preventDefault();
  $.ajax(
  {
      type: "POST",
      url: "paginas/recursos/exibir-amigo.php",
      data: {
              chave: 'valorizado demais esse AJAX!!', //key : value
              //caso envie dados ;)
          },
          success: function (result) {

              resultado = JSON.parse(result);
                $("#divAmigoGrupo").empty()

              $.each(resultado, function (i, contato) {
                var marginTop = 0;
                if(i <= 2){
                  marginTop = 3;
                }else {
                  marginTop = 0;
                }
                $("#divAmigoGrupo").append(
                  "<div class=\"col-md-4 text-center  mt-"+marginTop+"\">"+
                  // "<div class='col-md-12 '>"+
                  // "<input hidden class='inputAdiconarAmigoGrupo' type='checkbox'  name="+resultado[i].nm_nickname+" id="+resultado[i].cd_perfil+1+" value="+resultado[i].cd_perfil+">"+
                  "<label class='col-md-12 labelImgAdiconarAmigoGrupo'  for="+resultado[i].cd_perfil+1+" >"+
                  "<img class='imgAdiconarAmigoGrupo'  src="+resultado[i].ds_imagem+">"+
                  "</label>"+
                   // "</div>" +

                  // "<div class='col-md-12'>" +
                  "<input hidden class='inputAdiconarAmigoGrupo' type='checkbox' id="+resultado[i].cd_perfil+1+"  name='amigos' value="+resultado[i].cd_perfil+"  >"+
                  "<label class='col-md-12 ' for="+resultado[i].cd_perfil+1+" >"+
                  "<p class='txtAdiconarAmigoGrupo'>"+resultado[i].nm_nickname+"</p>"+
                  "</label>" +
                  // "</div>" +
                  "</div>"
                );


              });
          },
          error: function (result) {
              console.error(result);
          }
      });
  }


  function criarGrupo(idModal){
    event.preventDefault();
    console.log('Criando o grupo...');
    var data = new FormData();
    data.append('nmGrupo', $('#txtNomedoGrupo').val());
    data.append('dsGrupo', $('#txtDescricaoGrupo').val());
    data.append('imGrupo', $('#fileImagemGrupo').prop('files')[0]);

    var amigo = [];
        $.each($("input[name='amigos']:checked"), function(){
            amigo.push($(this).val());
        });

        data.append('amigo[]',amigo);

//   for (var val of data.entries()) {
//     console.log(val);
// }
    $.ajax(
      {
        url: 'paginas/recursos/criarGrupo.php',
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,

        success: function(result){

          if(result == " sucesso"){
          abrirModalSucesso('Grupo criado com sucesso');
          aparecerModal(nmModal);

        }
          location.href = "perfil.php";
        },
        error: function(result){
          console.error(result);
        }
      })
  }

function sairGrupo(cd_grupo){
  var cdGrupo = cd_grupo;
  event.preventDefault();

  $.ajax(
     {
       url: "paginas/recursos/sairGrupo.php",
        type: "POST",
        data: {
           chave: 'valorizado demais esse AJAX!!',
           cd_grupo: cdGrupo
        },
        success: function (result) {

          $("#divGrupo").empty()

           exibirGrupos()
         },
        error: function (result) {
           console.error(result);
        }
     });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                    //INICIO ALISU

// lembretes = { idUserLogado }
function exibirPostagem(){
   $.ajax(
    {
        type: "POST",
        url: "paginas/recursos/salvar-ExibirPostagem.php",
        data: {
            chave:'valorizado demais esse AJAX!!',
            },
        success: function( result ) {

        resultado = JSON.parse(result);

        $("#postagem").empty();
        $.each(resultado, function (i, contato){
         /*DATA->*/  if(resultado[i].dias == 0 ) { resultado[i].dias = " Hoje às "; }
                     if(resultado[i].dias == 1 ) { resultado[i].dias = " Ontem ás "; }
                     if(resultado[i].dias > 1 && resultado[i].dias < 7 ) { resultado[i].dias += " Dias atrás ás "; }
                     if(resultado[i].dias >= 7  ) { resultado[i].dias = " A uma semana atrás ás "; }

         /*DATA->*/  if(resultado[i].diasC == 0) { resultado[i].diasC = " Hoje às ";}
                     if(resultado[i].diasC == 1) { resultado[i].diasC = " Ontem ás "; }
                     if(resultado[i].diasC > 1 && resultado[i].diasC < 7) { resultado[i].diasC += " Dias atrás ás ";}
                     if(resultado[i].diasC > 7)  { resultado[i].diasC = " A uma semana atrás ás "; }

                     // talves if(resultado[i].qtdComentario == 0){
                     // talves    document.getElementById("btnLermais"+resultado[i].cd_postagem).disabled = true;
                     // talves }

                     $("#textareaComentar textarea").bind("input", function(e) {
                        if( $(this).outerHeight() < this.scrollHeight +
                                                       parseFloat($(this).css("borderTopWidth")) +
                                                       parseFloat($(this).css("borderBottomWidth"))
                               && $(this).height() < 70 // Altura máxima
                        ) {
                            $(this).height($(this).height()+1); // aumentar em +1
                        }else{
                           $(this).height($(this).height()-1); // diminuir em -1
                        };
                     });


    $("#postagem").append(
       "<div class='divDividir '>" + "</div>" +
       "<div class='espacoPostagem '>" +
       "<div class='row'>" + // inicio da row
       "<div id='telaPerfil"+resultado[i].cd_postagem+"' class='col-sm-11'>" + // inicio da col nickname
       "</div>" + // Fim da col do nickname
       "<div class='col-sm-1'>" + // inicio da col menu
       "<div class='dropdown'>" +
       "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" +
       "<div class='opcoesPostagem dropdown-menu'>" +
       "<div id='opcoesDePermissao"+resultado[i].cd_postagem+"'>" +
       "</div>" +
       "</div>" + "</div>" +
       "</div>" + // fim da col menu
       "</div>" + // fim row
       "<p>" + "<span class='p_relogio'> "+resultado[i].dias + resultado[i].hr_postagem+"</span>" + "</p>" +
       "<div id='telaDeConteudo"+resultado[i].cd_postagem+"'>" + // INICIO DA TELA DE CONTEUDO
       "</div>" + // FIM DA TELA DE CONTEUDO
       "<div class='row'>" +  // inicio row qauntidade
       "<ul class='QtdLDC'>" +
       "<li class='QTDL'  id='qtdLike"+resultado[i].cd_postagem+"' value="+resultado[i].qtdLike+">Like: "+resultado[i].qtdLike+"</li>  " +     // Quantidade de likes
       "<li class='QTDD'  id='qtdDeslike"+resultado[i].cd_postagem+"' value="+resultado[i].qtdDeslike+">Deslike: "+resultado[i].qtdLike+"</li>  " +   // Quantidade de Deslikes
       "<li class='QTDC'  value="+resultado[i].qtdComentario+">Compartilhamento: "+resultado[i].qtdLike+"</li>" +
       "</ul>" +// Quantidade de comentarios
       "</div>" +
       "<div class='row'>" + // inicio row btnsss
       "<div class='col-md-4'>" + 
       
       "<button type='submit'  value="+resultado[i].cd_postagem+" class='btnlikes' value= '32' id='btnLikePostagem"+resultado[i].cd_postagem+"'  onclick='LikePostagem(this.value)'> <img src='assets/img/icon/Like2.png' width='40' height='45'> </button>"

        + "</div>" +
      
       "<div class='col-md-4'>" + "<button type='button' value="+resultado[i].cd_postagem+" id='btnDeslikePostagem"+resultado[i].cd_postagem+"' class='btnlikes' onclick='DeslikePostagem(this.value)'> <img src='assets/img/icon/Dlike.png' width='40' height='45'></button>" + "</div>" +
       "<div class='col-md-4'>" + "<button type='button' value="+resultado[i].cd_postagem+" class='btn btn-link' id='btnLermais"+resultado[i].cd_postagem+"' style='float:right; padding: 2px;  text-decoration: none; ' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Cometários</button>" + "</div>" +
       "</div>" +  // fim row btnss
       "<br>" +
       "<div class='row'>" + // inicio row comentario
       "<div class='AC'>" + //inicio col-sm-12
       "<div id='areaComentario"+resultado[i].cd_postagem+"' class='Areacomentario'>" + // inicio da exibicao dos comentario
       "<div id='comentarioPostagem"+resultado[i].cd_postagem+"' class='comentario''>  <div>" + // aqui irá aparecer os comentários
       "<div id='rodapeComentario"+resultado[i].cd_postagem+"'> </div>" + //  rodape do Comentario
       "</div>" + // fim da exibicao dos comentario
       "</div>" + //fim de col-sm-12
       "</div>" + //fim row comentario
       "<div class='row'>" + // inicio row input comentar
       "<div class='col-lg-12'>" +// inicio de col-lg-12


       "<div class='input-group'>" +  // inicio da div input-group
       "<div class='col-10'>" +
       "<div id='textareaComentar'> <textarea id="+resultado[i].cd_postagem+" class='ComentarioPostagem' placeholder='Comentar'"+resultado[i].cd_postagem+ "onkeypress='ComentarClickEnter(this.id)'></textarea>  </div>" +
       "</div>" +
       "<span class='input-group-btn'>" + // inicio do span do btn emojin
       "<button type='button' class='EmojiBotao' value="+resultado[i].cd_postagem+" onclick='abrirTableEmojin(this.value)'> <img src='assets/img/icon/home/emojin2.png' alt=''  height='30px';> </button>" +
       "</span>" +// fim do span do btn emojin

       "<span class='input-group-btn col-1'>" + // inicio do span do btn enviar comentario
       "<button type='button' id='btnComentar"+resultado[i].cd_postagem+"' class='EnviarComentario' value="+resultado[i].cd_postagem+" onclick='ComentarPostagem(this.value)'><img class='w-100' src='assets/img/icon/envia.png' alt=''  ></button>" +
       // "<img class='ml-1 pointer imgBtnComentar'  value="+resultado[i].cd_postagem+"  id='btnComentar"+resultado[i].cd_postagem+"' onclick='ComentarPostagem(this.value)' src='assets/img/icon/enviar.png'  >" +
       "</span>" +// FIM do span do btn enviar comentario

       "</div>" + // fim da div input-group


       "</div>" + //fim de col-lg-12
       "</div>" + //fim row input comentar
       "<div class='row' id='tbEmojinPostagem"+resultado[i].cd_postagem+"' style='display:none;'>" + //inicio row da table emojin
       "</div>" + // fim da table emojin
       "</div>"
       );

 /////////////////////////////////////////////////////////////////  verificando opcoes de Permissao  ////////////////////////////////////////////////

   if(resultado[i].cdPerfil == 1){ // idUserLogado
      $('#opcoesDePermissao'+resultado[i].cd_postagem).append(
      "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" +
      "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" +
      "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluirPostagem' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>"
      );
   }else{
      $('#opcoesDePermissao'+resultado[i].cd_postagem).append(
      "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" +
      "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_postagem+" onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>"
      );
   }

    ///////////////////////////////////////////////////////////////// FIM DE verificando opcoes de Permissao  ////////////////////////////////////////////////


///////////////////////////////////////////////////////////// INICIO  verificando TELA DE CONTEUDO  ///////////////////////////////////////////////////////////////////

if(resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado){
   $('#telaPerfil'+resultado[i].cd_postagem).append(
   "<p><a onclick='visualizarPerfil("+resultado[i].cdPerfil+")' >" + "<img class='imgPerfilPostagem' src="+resultado[i].imgPerfil+">" + "<span> "+resultado[i].nm_nickname+" </span>" + "</a>" +
   "Compartilhou a postagem de " + "<a onclick='visualizarPerfil("+resultado[i].cdCompartilhou+")' >" +resultado[i].NicknameCompartilhou+ "</a>" + "</p>"
   );

   $('#telaDeConteudo'+resultado[i].cd_postagem).append(
    "<div class='telaCompartilhar'>" + // INICIO DE TELA DE COMPARTILHAMENTO
    "<a onclick='visualizarPerfil("+resultado[i].cdCompartilhou+")' >" + "<img class='imgPerfilPostagem' src="+resultado[i].imgPerfil+">" + "<span> "+resultado[i].NicknameCompartilhou+" </span>" + "</a>" +
    "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>"+resultado[i].diasC + resultado[i].horasC+"</span>" + "</p>" +

    "<div id='ConteudoPostagem"+resultado[i].cd_postagem+"'>" +  //   Conteudo da Postagem
    "</div>" + // FIM Conteudo da Postagem

    "</div>"  // FIM DE TELA DE COMPARTILHAMENTO
    );
}else{
   $('#telaPerfil'+resultado[i].cd_postagem).append(
       "<p><a onclick='visualizarPerfil("+resultado[i].cdPerfil+")' >" + "<img class='imgPerfilPostagem' src="+resultado[i].imgPerfil+">" + "<span> "+resultado[i].nm_nickname+" </span>" + "</a></p>"
      );

   $('#telaDeConteudo'+resultado[i].cd_postagem).append(
      "<div id='ConteudoPostagem"+resultado[i].cd_postagem+"'>" +  //   Conteudo da Postagem
      "</div>"  // FIM Conteudo da Postagem
      );
}

///////////////////////////////////////////////////////////// INICIO  verificando TELA DE CONTEUDO  ///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////  verificando media  ///////////////////////////////////////////////////////////////////

   var midia = "";

   if(resultado[i].ds_imagem != null && resultado[i].cd_tipo_postagem == 1){
      midia = "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">";   }

   if(resultado[i].ds_imagem != null && resultado[i].cd_tipo_postagem == 2){
      midia =  "<video width='100%' controls><source src="+resultado[i].ds_imagem+" type='video/mp4'></video>";
      while(midia.indexOf("\"") != -1){
      midia = midia.replace(/"/g, '');
      }
}

   if(resultado[i].ds_imagem != null && resultado[i].cd_tipo_postagem == 3){
      midia = "<audio style='width: 100%;' controls> <source src="+resultado[i].ds_imagem+" type='audio/mpeg'> </audio>" ;
      while(midia.indexOf("\"") != -1){
        midia = midia.replace(/"/g, '');
   }

}

   if(resultado[i].ds_imagem != null){

    var ConteudoPostagem =  $('#ConteudoPostagem'+resultado[i].cd_postagem);

    if(resultado[i].nm_titulo != null){
         $(ConteudoPostagem).append(
            "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // tiutlo
            "<p class='MidiaPostagem'>" + midia + "</p>"  //Midia
           );
      }else{
         $(ConteudoPostagem).append(
            "<p class='MidiaPostagem'>" + midia + "</p>"  //Midia
         );
      }

   }else{

      var ConteudoPostagem =  $('#ConteudoPostagem'+resultado[i].cd_postagem);

      $(ConteudoPostagem).append(
         "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>"  // tiutlo
      );
   }

   });
},
      error: function (result){
         console.error(result);
      }
});
}
//////////////////////////////////////////////////// FIM DE  verificando media  ///////////////////////////////////////////////////////////////////



 // /////////////////////////////////////////////////////////      INICIO  SISTEMA DE EMOJIN        //////////////////////////////////////////////////////////////////

function abrirTableEmojin(cd){
   var id = cd;
   var table =  document.getElementById('tbEmojinPostagem'+id);
   if(table.style.display == 'none'){

      table.style.display = 'block';
      table.style.overflowY = 'scroll';
      table.style.height = '150px';
      table.style.marginRight = '0px';
      table.style.marginLeft = '0px';
      $("#tbEmojinPostagem"+id).empty();
      $("#tbEmojinPostagem"+id).append(
          "<div class='tabelaEmojinCaracter'>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128540;"'+",this.value)' value="+id+" id='' >&#128540;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128561;"'+",this.value)' value="+id+" id='' >&#128561;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128514;"'+",this.value)' value="+id+" id='' >&#128514;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128517;"'+",this.value)' value="+id+" id='' >&#128517;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128519;"'+",this.value)' value="+id+" id='' >&#128519;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128513;"'+",this.value)' value="+id+" id='' >&#128513;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129488;"'+",this.value)' value="+id+" id='' >&#129488;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129314;"'+",this.value)' value="+id+" id='' >&#129314;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128520;"'+",this.value)' value="+id+" id='' >&#128520;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128525;"'+",this.value)' value="+id+" id='' >&#128525;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128533;"'+",this.value)' value="+id+" id='' >&#128533;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128529;"'+",this.value)' value="+id+" id='' >&#128529;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128522;"'+",this.value)' value="+id+" id='' >&#128522;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128524;"'+",this.value)' value="+id+" id='' >&#128524;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129326;"'+",this.value)' value="+id+" id='' >&#129326;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129316;"'+",this.value)' value="+id+" id='' >&#129316;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128526;"'+",this.value)' value="+id+" id='' >&#128526;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128536;"'+",this.value)' value="+id+" id='' >&#128536;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128548;"'+",this.value)' value="+id+" id='' >&#128548;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128557;"'+",this.value)' value="+id+" id='' >&#128557;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128564;"'+",this.value)' value="+id+" id='' >&#128564;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128527;"'+",this.value)' value="+id+" id='' >&#128527;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129303;"'+",this.value)' value="+id+" id='' >&#129303;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129300;"'+",this.value)' value="+id+" id='' >&#129300;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128580;"'+",this.value)' value="+id+" id='' >&#128580;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128579;"'+",this.value)' value="+id+" id='' >&#128579;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129324;"'+",this.value)' value="+id+" id='' >&#129324;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128523;"'+",this.value)' value="+id+" id='' >&#128523;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128521;"'+",this.value)' value="+id+" id='' >&#128521;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128532;"'+",this.value)' value="+id+" id='' >&#128532;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129296;"'+",this.value)' value="+id+" id='' >&#129296;</button>" +//
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129301;"'+",this.value)' value="+id+" id='' >&#129301;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128534;"'+",this.value)' value="+id+" id='' >&#128534;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128535;"'+",this.value)' value="+id+" id='' >&#128535;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128538;"'+",this.value)' value="+id+" id='' >&#128538;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128539;"'+",this.value)' value="+id+" id='' >&#128539;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128542;"'+",this.value)' value="+id+" id='' >&#128542;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128543;"'+",this.value)' value="+id+" id='' >&#128543;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129325;"'+",this.value)' value="+id+" id='' >&#129325;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128567;"'+",this.value)' value="+id+" id='' >&#128567;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128544;"'+",this.value)' value="+id+" id='' >&#128544;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128546;"'+",this.value)' value="+id+" id='' >&#128546;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128553;"'+",this.value)' value="+id+" id='' >&#128553;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128552;"'+",this.value)' value="+id+" id='' >&#128552;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128554;"'+",this.value)' value="+id+" id='' >&#128554;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128558;"'+",this.value)' value="+id+" id='' >&#128558;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129320;"'+",this.value)' value="+id+" id='' >&#129320;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129299;"'+",this.value)' value="+id+" id='' >&#129299;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128556;"'+",this.value)' value="+id+" id='' >&#128556;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128562;"'+",this.value)' value="+id+" id='' >&#128562;</button>" +
            "</div>" +
            "<div class='tabelaEmojinMao'>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129304;"'+",this.value)' value="+id+" id='' >&#129304;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129305;"'+",this.value)' value="+id+" id='' >&#129305;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129306;"'+",this.value)' value="+id+" id='' >&#129306;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129307;"'+",this.value)' value="+id+" id='' >&#129307;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129308;"'+",this.value)' value="+id+" id='' >&#129308;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129309;"'+",this.value)' value="+id+" id='' >&#129309;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129310;"'+",this.value)' value="+id+" id='' >&#129310;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#129311;"'+",this.value)' value="+id+" id='' >&#129311;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128070;"'+",this.value)' value="+id+" id='' >&#128070;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128071;"'+",this.value)' value="+id+" id='' >&#128071;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128072;"'+",this.value)' value="+id+" id='' >&#128072;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128073;"'+",this.value)' value="+id+" id='' >&#128073;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128074;"'+",this.value)' value="+id+" id='' >&#128074;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128075;"'+",this.value)' value="+id+" id='' >&#128075;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128076;"'+",this.value)' value="+id+" id='' >&#128076;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128077;"'+",this.value)' value="+id+" id='' >&#128077;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128078;"'+",this.value)' value="+id+" id='' >&#128078;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128079;"'+",this.value)' value="+id+" id='' >&#128079;</button>" +
            "<button class='btn btn-link' onclick='emojinPostagem("+'"&#128080;"'+",this.value)' value="+id+" id='' >&#128080;</button>" +
            "</div>"
        );
}else{
   $("#tbEmojinPostagem"+id).empty();
   table.style.display = 'none';
   }

 }

 function emojinPostagem(emo, id) {
    var valor = $(".inputComentarioPostagem"+id).val();
    var x = $(".inputComentarioPostagem"+id).val(valor + emo);
 }
 // /////////////////////////////////////////////////////////      FIM  SISTEMA DE EMOJIN        //////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////        MODAL DA DENUNCIA        //////////////////////////////////////////////////////////////////
function modalDenunciaPostagem(id){
   document.getElementById('denunciaModal').innerHTML = "";
   document.getElementById('txt1').checked = null;
   document.getElementById('txt2').checked = null;
   document.getElementById('txt3').checked = null;
   document.getElementById('outroDenuncia').innerHTML = "";

  var cd = id;
  event.preventDefault();
  $.ajax(
     {
        url: "paginas/recursos/salvar-modal_denuncia.php",
        type: "POST",
        data: {
           chave: 'valorizado demais esse AJAX!!',
           id: cd,
        },
        success: function (result) {
          resultado = JSON.parse(result);
          $.each(resultado, function (i, contato){
           $("#denunciaModal").append(
               "<div class='textoDenuncia'>"  +
               "<p> Deseja denunciar essa postagem efeituada por <a href''>"+resultado[i].nm_nickname+" </a> pelo seguite motivo: </p>" +
               "</div>"
           );
         });
      },
        error: function (result) {
           console.error(result);
        }
   });
}

function desabilitar(){
   //document.getElementById('outroDenuncia').innerHTML = '';
   var selecionar =  document.getElementById('outroDenuncia');
   var txt1 = document.getElementById('txt1');
   var txt2 = document.getElementById('txt2');
   var txt3 = document.getElementById('txt3');

   if(selecionar.disabled == true ){
    selecionar.disabled = false;
    txt1.disabled = true; txt1.checked = false;
    txt2.disabled = true; txt2.checked = false;
    txt3.disabled = true; txt3.checked = false;
  }else{
    selecionar.disabled = true;
    txt1.disabled = false;
    txt2.disabled = false;
    txt3.disabled = false;

  }
 }
// /////////////////////////////////////////////////////////       FIM MODAL DA DENUNCIA        //////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////       INICIO MODAL EXCLUIR POSTAGEM       //////////////////////////////////////////////////////////////////
function chamadaModalExcluirPosatgem(id){
   $("#excluirModal").empty();
   $("#excluirModal").append(
      "<div class='row'>" +
      "<p class='textoConfirmarExcluir'> Deseja realmente excluir esta postagem? </p>" +
      "</div>" +
      "<br>" +
      "<div class='row'>" +
         "<div class='col-sm-6'>" +
         "<p> <button class='btnOpcoes btn btn-success' onclick='modalExcluirPostagemFechar()'> Cancelar </button> </p>" +
         "</div>" +
               "<div class='col-sm-6'>" +
               "<p> <button class='btnOpcoes btn btn-success' value="+id+" onclick='modalExcluirPostagem(this.value)'> Continuar </button> </p>" +
         "</div>" +
      "</div>"
   );
}
function modalDenunciaFechar(){
   $('#modalDenuncia').modal('hide');
}
function modalExcluirPostagemFechar(){
   $('#modalExcluirPostagem').modal('hide');
}

function modalExcluirPostagem(id){
   var cd = id;
   event.preventDefault();
   $.ajax(
      {
         url: "paginas/recursos/salvar-modal_excluirPostagem.php",
         type: "POST",
         data: {
            chave: 'valorizado demais esse AJAX!!',
            id: cd,
         },
         success: function (result) {
           setTimeout(function(){this.exibirPostagem();
            $("#modalExcluirPostagem").modal('hide');
           }, 400);
       },
         error: function (result) {
            console.error(result);
         }
    });
}
// /////////////////////////////////////////////////////////       FIM MODAL EXCLUIR POSTAGEM       //////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////       INICIO ABA DE COMENTARIOS        //////////////////////////////////////////////////////////////////

function abriComentarioAuxiliar(id){
   var cd = id;
   var area = document.getElementById('areaComentario'+cd);
   if(area.style.display == 'none'){
    area.style.display = 'block';
    setTimeout(function(){this.exibirComentario(id); }, 200);
   }else{
   area.style.height = 'auto';
   area.style.maxHeight = '300px';
   area.style.paddingTop = '5px';
   area.style.paddingLeft = '15px';
   area.style.paddingRight = '30px';
   area.style.overflowY = 'scroll';
   area.style.position = 'relative';
   area.style.backgroundColor= '#F5FFFA';
   area.style.borderRadius = '12px';
   setTimeout(function(){this.exibirComentario(id); }, 200);
   }
}

function abriComentario(id){
   var cd = id;
   var area = document.getElementById('areaComentario'+cd);
   if(area.style.display == 'block'){
    area.style.display = 'none';
   $("#tbEmojinPostagem"+cd).hide();
}else{
   area.style.display = 'block';
   area.style.height = 'auto';
   area.style.maxHeight = '300px';
   area.style.paddingTop = '5px';
   area.style.paddingLeft = '15px';
   area.style.paddingRight = '30px';
   area.style.overflowY = 'scroll';
   area.style.position = 'relative';
   area.style.backgroundColor= '#F5FFFA';
   area.style.borderRadius = '12px';
   setTimeout(function(){this.exibirComentario(id); }, 200);
   }
}

function exibirComentario(id) {
  var cd = id;
  $('.inputComentarioPostagem'+cd).focus();
  $.ajax(
   {
      url: "paginas/recursos/salvar-ExibirComentario.php",
      type: "POST",
      data: {
         chave: 'valorizado demais esse AJAX!!',
         id: cd,
      },
      success: function (result) {
        resultado = JSON.parse(result);
        cdLogin = document.getElementById('txtCdPerfil').value;
        $("#comentarioPostagem"+cd).empty();
        $.each(resultado, function (i, contato){
         if(resultado[i].cd_perfil == 1){ // idUserLogado
         $("#comentarioPostagem"+cd).append(
            "<div class='row rowComentario'>" + // inicio rowComentario
            "<div class='dropdown comentario'>" + // inicio dropdown

            "<a>"+ resultado[i].nm_nickname +": </a>" + "<span>"+resultado[i].ds_comentario+"</span>" +
            "<button class='btn btn-link dropdown-toggle' type='button' id='dropdownMenuComentario' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' >" + "<img src='assets/img/icon/home/menuPontos.png' height='18px' alt=''>" +  "</button>" +
            "<div class='dropdown-menu' aria-labelledby='dropdownMenuComentario'>" + // inico dropdown-menu
            "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_comentario+"  data-toggle='modal' data-target='#modalExcluirComentario' data-toggle='tooltip' data-placement='top' title='Excluir Comentário' onclick='ModalexcluirComentario(this.value,"+cd+")'>Excluir...</button><br>" +
            "<button class='btnOpcoes btn btn-default' value="+resultado[i].cd_comentario+"  data-toggle='modal' data-target='#modalAlterarComentario' data-toggle='tooltip' data-placement='top' title='Alterar Comentário' onclick='alterarComentarioModal(this.value)'>Altera...</button><br>" +
            "</div>" + // fim dropdown-menu
            "</div>" + // inicio dropdown
            "</div>" // fim rowComentario
         );
         }else{
            $("#comentarioPostagem"+cd).append(
               "<div class='row rowComentario'>"+
               "<p class='comentario'>" + "<a onclick='opcaoComentario("+resultado[i].cd_comentario+")' >"+ resultado[i].nm_nickname +": </a>" + "<span>"+resultado[i].ds_comentario+"</span>" + "</p>" +
               "</div>"
            );
         }
          var area = document.getElementById('areaComentario'+cd);
          area.scrollTop = area.scrollHeight;
      });
      },
      error: function (result) {
         console.error(result);
      }
   });
}

// /////////////////////////////////////////////////////////       INICIO MODAL EXCLUIR COMENTARIO      //////////////////////////////////////////////////////////////////

function ModalexcluirComentario(id, id2){ //id do comentario
   $('#excluirComentarioModal').empty();
   $('#excluirComentarioModal').append(
      "<p class='textoConfirmarExcluir'> Deseja realmente excluir o comentário selecionado? </p>" +
      "<br>" +
      "<div class='row'>" +
      "<div class='col-sm-6'>" +
      "<p> <button class='btnOpcoes btn btn-success' onclick='modalExcluirComentarioFechar()'> Cancelar </button> </p>" +
      "</div>" +
            "<div class='col-sm-6'>" +
            "<p> <button class='btnOpcoes btn btn-success' value="+id+" onclick='excluirComentario(this.value,"+id2+")'> Continuar </button> </p>" +
      "</div>"
   );
}
function modalExcluirComentarioFechar(){
   $('#modalExcluirComentario').modal('hide');
}

function alterarComentarioModal(idComentario){
   event.preventDefault();
   $.ajax(
      {
         url: "paginas/recursos/salvar-inforAlterarComentario.php",
         type: "POST",
         data: {
            chave: 'valorizado demais esse AJAX!!',
            id: idComentario,
         },
         success: function (result) {
           resultado = JSON.parse(result);
           $.each(resultado, function (i, contato){
            var cdPostagem = resultado[i].cd_postagem;
            var comentario = resultado[i].ds_comentario;

            var input =  $('.inputComentarioPostagem'+cdPostagem); //aqui
            $("#btnComentar"+cdPostagem).attr('onclick', 'alterarComentario('+resultado[i].cd_comentario+','+cdPostagem+')');
            input.val(comentario);
            input.select();
         });
         },
         error: function (result) {
            console.error(result);
     }
  });
}
// /////////////////////////////////////////////////////////       INICIO MODAL EXCLUIR COMENTARIO       //////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////       FIM ABA DE COMENTARIOS        //////////////////////////////////////////////////////////////////

 //////////////////////////////////////////      INICIO DE  LIKE | DESLIKE | COMENTAR | COMPARTILHAR | DENUNCIAR   | excluirComentario |  alterarComentario        ////////////////////////////////////////
function LikePostagem(id){
    var cd = id;
    event.preventDefault();
    $.ajax(
       {
          url: "paginas/recursos/salvar-like.php",
          type: "POST",
          data: {
             chave: 'valorizado demais esse AJAX!!',
             id: cd,
          },
          success: function (result) {
            $("#"+cd).val("");

          var qtdLike = $("#qtdLike"+cd).val();
          var qtdDeslike = $("#qtdDeslike"+cd).val();
         if(result == true){
            $("#qtdLike"+cd).val(qtdLike + 1);
            $("#qtdLike"+cd).html("Like: "+(qtdLike + 1))// + "<img src='assets/img/icon/likeDislike/likeNormal.png' class='iconLike'> ");
            document.getElementById("btnLikePostagem"+cd).style.color = 'blue';

         }

         if(result == false) {
          $("#qtdLike"+cd).val(qtdLike - 1);
          $("#qtdLike"+cd).html("Like: "+(qtdLike - 1))// +"<img src='assets/img/icon/likeDislike/likeNormal.png' class='iconLike'>");
          document.getElementById("btnLikePostagem"+cd).style.color = 'black';
         }

         if(result == ' outro') {
            $("#qtdLike"+cd).val(qtdLike + 1);
            $("#qtdLike"+cd).html("Like: "+(qtdLike + 1)) // + "<img src='assets/img/icon/likeDislike/likeNormal.png' class='iconLike'>");
            $("#qtdDeslike"+cd).val(qtdDeslike - 1);
            $("#qtdDeslike"+cd).html("Deslike: "+ (qtdDeslike - 1));
            document.getElementById("btnLikePostagem"+cd).style.color = 'blue';
            document.getElementById("btnDeslikePostagem"+cd).style.color = 'black';
         }
          },
          error: function (result) {
             console.error(result);
      }
   });
}

function DeslikePostagem(id){
    var cd = id;
    event.preventDefault();
    $.ajax(
       {
          url: "paginas/recursos/salvar-deslike.php",
          type: "POST",
          data: {
             chave: 'valorizado demais esse AJAX!!',
             id: cd,
          },
          success: function (result) {

            $("#"+cd).val("");

         var qtdDeslike = $("#qtdDeslike"+cd).val();
         var qtdLike = $("#qtdLike"+cd).val();
         if(result == true){
            $("#qtdDeslike"+cd).val(qtdDeslike + 1);
              $("#qtdDeslike"+cd).html("Deslike: " +(qtdDeslike + 1));
            document.getElementById("btnDeslikePostagem"+cd).style.color = 'blue';
         }

         if(result == false) {
            $("#qtdDeslike"+cd).val(qtdDeslike - 1);
            $("#qtdDeslike"+cd).html("Deslike: "+ (qtdDeslike - 1));
            document.getElementById("btnDeslikePostagem"+cd).style.color = 'black';
         }

         if(result == ' outro') {
            $("#qtdDeslike"+cd).val(qtdDeslike + 1);
            $("#qtdDeslike"+cd).html("Deslike: " + (qtdDeslike + 1));
            $("#qtdLike"+cd).val(qtdLike - 1);
            $("#qtdLike"+cd).html("Like: "+ (qtdLike - 1));
            document.getElementById("btnDeslikePostagem"+cd).style.color = 'blue';
            document.getElementById("btnLikePostagem"+cd).style.color = 'black';
         }
           },
          error: function (result) {
             console.error(result);
          }
       });
}

function ComentarPostagem(id){ //id da postagem
   var cd = id;
   event.preventDefault();
   $.ajax(
      {
         url: "paginas/recursos/salvar-comentario.php",
         type: "POST",
         data: {
            chave: 'valorizado demais esse AJAX!!',
            comentario: $("#"+cd).val(),
            id: $("#"+cd).attr('id'),
         },
         success: function (result) {

          setTimeout(function(){this.abriComentarioAuxiliar(id); }, 200);

          $("#"+cd).val("")
         },
         error: function (result) {
            console.error(result);
         }
      });
}

function conpartilharPostagem(id){
  var cd = id;
  event.preventDefault();
  $.ajax(
     {
        url: "paginas/recursos/salvar-conpartilhar.php",
        type: "POST",
        data: {
           chave: 'valorizado demais esse AJAX!!',
           id: cd,
        },
        success: function (result) {

          setTimeout(function(){this.exibirPostagem(); }, 800);

         },
        error: function (result) {
           console.error(result);
        }
     });
}
function excluirComentario(id, id2){ //id2 é o id da postagem
   var cd = id;
   event.preventDefault();
   $.ajax(
      {
         url: "paginas/recursos/salvar-excluirComentario.php",
         type: "POST",
         data: {
            chave: 'valorizado demais esse AJAX!!',
            id: cd,
         },
         success: function (result) {

           $('#modalExcluirComentario').modal('hide');
           setTimeout(function(){this.exibirComentario(id2); }, 500);
          },
         error: function (result) {
            console.error(result);
         }
      });
}

function alterarComentario(idComentario, idPostagem){
   var cd = idComentario;
   event.preventDefault(); // aqui
   var input =  $('.inputComentarioPostagem'+idPostagem);
   $.ajax(
      {
         url: "paginas/recursos/salvar-alterarComentario.php",
         type: "POST",
         data: {
            chave: 'valorizado demais esse AJAX!!',
            id: cd,
            novoComentario: $(input).val(),
         },
         success: function (result) {
            setTimeout(function(){this.exibirComentario(idPostagem); }, 300);
            $("#btnComentar"+idPostagem).attr('onclick', 'ComentarPostagem(this.value)');
            $('.inputComentarioPostagem'+idPostagem).val("");
         },
         error: function (result) {
            console.error(result);
         }
      });
}
// //////////////////////////////////////        FIM DE LIKE | DESLIKE | COMENTAR | COMPARTILHAR | DENUNCIAR  | excluirComentario  |  alterarComentario     ////////////////////////////////////////


// /////////////////////////////////////////////////////////   Formulario Postar     //////////////////////////////////////////////////////////
$( "#formulario-postagem").on('submit', function( event ){
   event.preventDefault();
   var data = new FormData();
   data.append('txtTitulo', $("#txtTitulo").val());
   data.append('txtMidia', $('#txtMidia').prop('files')[0]);
   $.ajax({
       url: 'paginas/recursos/salvar-postagem.php',
       type: 'POST',
       data: data,
       cache: false,
       contentType: false,
       processData: false,

       success: function(result)
       {
           $("#txttitulo").val(''),
           $("#txtMidia").val('')

          // location.href = "home.php";
       }
   });
});

$( "#formulario-denuncia").submit(function( event ) {
   event.preventDefault();
   $.ajax(
      {
         type: "POST",
         url: "paginas/recursos/salvar-denuncia.php",
         data: {
         chave:'valorizado demais esse AJAX!!',
         txt1: $("input[name='txt1']:checked").val(),
         txt2: $("input[name='txt2']:checked").val(),
         txt3: $("input[name='txt3']:checked").val(),
         txt4: $("input[name='txt4']:checked").val(),
         outroDenuncia: $("#outroDenuncia").val(),
         },
         success: function( result ) {

             if(result == true){
               $('#modalDenuncia').modal('hide');
             }
         },
         error: function (result){
            console.error(result);
      }
   });
});

////////////////////////////////////////////////////////////  Fim Formulario Postar     ///////////////////////////////////////////////////////


function ComentarClickEnter(id){
   if(event.keyCode == 13){
       $("#btnComentar"+id).click();
   }
}
