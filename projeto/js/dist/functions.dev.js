"use strict";

// Gabriel aqui //  
// login e cadastro 
jQuery(document).ready(function ($) {
  var $form_modal = $('.cd-user-modal'),
      $form_login = $form_modal.find('#cd-login'),
      $form_signup = $form_modal.find('#cd-signup'),
      $form_forgot_password = $form_modal.find('#cd-reset-password'),
      $form_modal_tab = $('.cd-switcher'),
      $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
      $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
      $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
      $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
      $main_nav = $('.main-nav'); //aberto modal

  $main_nav.on('click', function (event) {
    if ($(event.target).is($main_nav)) {
      // no celular abra o submenu
      $(this).children('ul').toggleClass('is-visible');
    } else {
      // no submenu fechar móvel
      $main_nav.children('ul').removeClass('is-visible'); //mostre a camada modal

      $form_modal.addClass('is-visible'); //mostra o formulário selecionado

      $(event.target).is('.cd-signup') ? signup_selected() : login_selected();
    }
  }); //fechar modal

  $('.cd-user-modal').on('click', function (event) {
    if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
      $form_modal.removeClass('is-visible');
    }
  }); // fecha modal ao clicar no botão do teclado esc

  $(document).keyup(function (event) {
    if (event.which == '27') {
      $form_modal.removeClass('is-visible');
    }
  }); // alterna de uma guia para outra

  $form_modal_tab.on('click', function (event) {
    event.preventDefault();
    $(event.target).is($tab_login) ? login_selected() : signup_selected();
  }); // oculta ou mostra a senha

  $('.hide-password').on('click', function () {
    var $this = $(this),
        $password_field = $this.prev('input');
    'password' == $password_field.attr('type') ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    'Hide' == $this.text() ? $this.text('Show') : $this.text('Hide'); // focaliza e move o cursor para o final do campo de entrada

    $password_field.putCursorAtEnd();
  }); // mostra o formulário de senha esquecida 

  $forgot_password_link.on('click', function (event) {
    event.preventDefault();
    forgot_password_selected();
  }); // volta ao login a partir do formulário de senha esquecida

  $back_to_login_link.on('click', function (event) {
    event.preventDefault();
    login_selected();
  });

  function login_selected() {
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.addClass('selected');
    $tab_signup.removeClass('selected');
  }

  function signup_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
    $tab_signup.addClass('selected');
  }

  function forgot_password_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.addClass('is-selected');
  }

  if (!Modernizr.input.placeholder) {
    $('[placeholder]').focus(function () {
      var input = $(this);

      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    }).blur(function () {
      var input = $(this);

      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);

        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      });
    });
  }
});

jQuery.fn.putCursorAtEnd = function () {
  return this.each(function () {
    // Se esta função existir ...
    if (this.setSelectionRange) {
      // ... então use-o (não funciona no IE)
      // Dobra o comprimento, porque o Opera é inconsistente quanto ao fato de um retorno de carro ter um ou dois caracteres. Suspiro.var len = $(this).val().length * 2;
      this.setSelectionRange(len, len);
    } else {
      // ... caso contrário, substitua o conteúdo por si próprio
      // (não funciona no Google Chrome)
      $(this).val($(this).val());
    }
  });
}; //
// Estrelas 


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var starDensity = .956;
var speedCoeff = .10;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '255, 255, 255';
var starColor = '255, 0, 0';
var cometColor = '255, 221, 157';
var canva = document.getElementById('universe');
var stars = [];
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
createUniverse();

function createUniverse() {
  universe = canva.getContext('2d');

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);
  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {
  this.reset = function () {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 8);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx = getRandInterval(speedCoeff, 7 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(60, 120) + speedCoeff * 2;
    this.dy = -getRandInterval(speedCoeff, 7 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(60, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this["do"] = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
  };

  this.fadeIn = function () {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this["do"];
    }
  };

  this.fadeOut = function () {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this["do"] / 2;

      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function () {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false); //Cometa

      for (var i = 0; i < 30; i++) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - this.opacity / 20 * i) + ')';
        universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
        universe.fill();
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.fadingOut === false) {
      this.reset();
    }

    if (this.x > width - width / 4 || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function () {
    setTimeout(function () {
      first = false;
    }, 50);
  })();
}

function getProbability(percents) {
  return Math.floor(Math.random() * 10000) + 10 < percents * 30;
}

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = width > height ? height / 2 : width / 2;
  circleCenter = {
    x: width / 2,
    y: height / 2
  };
  canva.setAttribute('width', width);
  canva.setAttribute('height', height);
} // 
////////////////////////////////////   CADASTRO    //////////////////////////////////////////////////


function validaCadastro() {
  var buttonCadastro = document.getElementById("AcessarCadastro");
  buttonCadastro.disabled = true;
  var NicknameCadastro = document.getElementById("txtNicknameCadastro");
  var NascimentoCadastro = document.getElementById("txtNascimentoCadastro");
  var EmailCadastro = document.getElementById("txtEmailCadastro");
  var SenhaCadastro = document.getElementById("txtSenhaCadastro");
  var ConfSenhaCadastro = document.getElementById("txtConfSenhaCadastro"); // if (NicknameCadastro.value.indexOf('*') != - 1 ||
  //     NicknameCadastro.value.indexOf('!') != - 1 ||
  //     NicknameCadastro.value.indexOf('=') != - 1 ||
  //     NicknameCadastro.value.indexOf('+') != - 1 ||
  //     NicknameCadastro.value.indexOf('#') != - 1 ||
  //     NicknameCadastro.value.indexOf('@') != - 1 ||
  //     NicknameCadastro.value.indexOf('0') != - 1 ||
  //     NicknameCadastro.value.indexOf('1') != - 1 ||
  //     NicknameCadastro.value.indexOf('2') != - 1 ||
  //     NicknameCadastro.value.indexOf('3') != - 1 ||
  //     NicknameCadastro.value.indexOf('4') != - 1 ||
  //     NicknameCadastro.value.indexOf('5') != - 1 ||
  //     NicknameCadastro.value.indexOf('6') != - 1 ||
  //     NicknameCadastro.value.indexOf('7') != - 1 ||
  //     NicknameCadastro.value.indexOf('8') != - 1 ||
  //     NicknameCadastro.value.indexOf('9') != - 1) { NicknameCadastro.value = ""; }

  if (NicknameCadastro.value == "" || NicknameCadastro.value.length < 2) {
    buttonCadastro.disabled = true;
    return false;
  }

  if (NascimentoCadastro.value == "" || NascimentoCadastro.value.length != 10) {
    buttonCadastro.disabled = true;
    return false;
  }

  if (EmailCadastro.value == "" || NascimentoCadastro.value.length != 10) {
    buttonCadastro.disabled = true;
    return false;
  }

  if (SenhaCadastro.value == "" || SenhaCadastro.value.length < 8) {
    buttonCadastro.disabled = true;
    return false;
  }

  if (ConfSenhaCadastro.value == "") {
    buttonCadastro.disabled = true;
    return false;
  } // var data = new Date();
  // if(nascimento > data){ button.disabled = true;  return false; }


  buttonCadastro.disabled = false;
} // $(document).ready(function () {
//     var $NascimentoCadastroMask = $("#txtNascimentoCadastro");
//     $NascimentoCadastroMask.mask('0000/00/00', { reverse: true });
// });
//Cadastro AJAX


$("#form_telaCadastro").submit(function (event) {
  event.preventDefault();
  console.log('Tentando Cadastrar usuario ');
  $.ajax({
    type: "POST",
    url: "paginas/recursos/salvar-telaCadastro.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      txtNicknameCadastro: $("#txtNicknameCadastro").val(),
      txtNascimentoCadastro: $("#txtNascimentoCadastro").val(),
      txtSexoCadastro: $("#txtSexoCadastro").val(),
      txtEmailCadastro: $("#txtEmailCadastro").val(),
      txtSenhaCadastro: $("#txtSenhaCadastro").val(),
      txtConfSenhaCadastro: $("#txtConfSenhaCadastro").val()
    },
    success: function success(result) {
      console.log(result); //  $( "#log-de-ceps").append('<p>' + result + '</p>' );

      var smallCadastro = document.getElementById("smallCadastro");
      smallCadastro.innerHTML = "";

      if (result == " Cadastrado") {
        var intervaloDESmall = function intervaloDESmall() {
          smallCadastro.innerHTML = "";
        };

        smallCadastro.style.color = "white";
        smallCadastro.innerHTML = "Cadastro realizado com sucesso!";
        $("#txtNicknameCadastro").val(''), $("#txtNascimentoCadastro").val(''), $("#txtEmailCadastro").val(''), $("#txtSenhaCadastro").val(''), $("#txtConfSenhaCadastro").val('');
        window.location.href = "index.php";
        intervaloDESmall.window.setTimeout('intervaloDESmall', 1000);
      } else {
        smallCadastro.style.color = "red";
        smallCadastro.innerHTML = "Campo incorreto!";
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}); ////////////////////////////////////  Login   //////////////////////////////////////////////////

function validaLogin() {
  var buttonLogin = document.getElementById("acessarLogin");
  buttonLogin.disabled = true;
  var EmailLogin = document.getElementById("txtEmailLogin");
  var SenhaLogin = document.getElementById("txtSenhaLogin"); // if(EmailLogin.value.indexOf('0') != - 1 ||
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

  if (EmailLogin.value == "") {
    buttonLogin.disabled = true;
    return false;
  }

  if (SenhaLogin.value == "") {
    buttonLogin.disabled = true;
    return false;
  }

  buttonLogin.disabled = false;
}

function converterDataBanco(data) {
  console.log(data);
} //Login AJAX


$("#form_telaLogin").submit(function (event) {
  event.preventDefault();
  console.log('Tentando Logar');
  $.ajax({
    type: "POST",
    url: "paginas/recursos/salvar-telaLogin.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      txtEmailLogin: $("#txtEmailLogin").val(),
      txtSenhaLogin: $("#txtSenhaLogin").val()
    },
    success: function success(result) {
      if (result == " sucesso") {
        location.href = "home.php";
      } else {
        var smallLogin = document.getElementById("smallLogin");
        smallLogin.style.color = 'red';
        smallLogin.innerHTML = "E-mail ou senha incorretas!";
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}); // Exibir mensagem

var cont = 0;

var exibirMensagem = function exibirMensagem() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-mensagem.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)
      // nome: $("#txtnome").val(),

    },
    success: function success(result) {
      resultado = JSON.parse(result);
      var nome = document.getElementById("nomeChat");
      $(".divChat").empty();
      $.each(resultado, function (i, contato) {
        if (nome.value == resultado[i].nm_nickname) {
          $(".divChat").append( // + resultado[i].cd_postagem
          "<div class='row flex-row-reverse  mt-3'>" + "<div id=" + resultado[i].cd_chat + " class='divDigitar col-auto' width='auto' >" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</div>" + // "<div class='col-5'></div>" +
          "</div>");
        } else {
          $(".divChat").append( // + resultado[i].cd_postagem
          "<div class='row  mt-3'>" + "<div id=" + resultado[i].cd_chat + " class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</div>" + "</div>");
        }
      });

      if (cont == 0) {
        cont++;
        var x = document.getElementById("divChat").offsetHeight;
        document.getElementById("divChat").scrollTop = x * 10;
      } // setInterval(function(){ $.ajax; }, 3000);

    },
    error: function error(result) {
      console.error(result);
    }
  });
};

var atualizarMensagem;

function repetir(e) {
  if (e == "null") {
    atualizarMensagem = setInterval(function () {
      this.exibirMensagem();
    }, 1000);
  }

  if (e == 'parar') {
    clearInterval(atualizarMensagem);
  }
} //Enviar Mensagem


$("#formChat").submit(function (event) {
  event.preventDefault();
  console.log('Tentando Logar');
  document.getElementById('btnEnviarChat').disabled = true;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/enviar-mensagem.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      mensagem: $("#txtMensagem").val()
    },
    success: function success(result) {
      document.getElementById('btnEnviarChat').disabled = false; // resultado = JSON.parse(result);

      var nome = document.getElementById("nomeChat").value;
      $(".divChat").empty();
      $("#txtMensagem").val(""), // $.each(resultado, function (i, contato) {
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
    error: function error(result) {
      $("#txtMensagem").val(""), console.error(result);
      document.getElementById('btnEnviarChat').disabled = false;
    }
  });
}); //const h1WS = document.getElementsByClassName( h1WS');
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

function buscarMensagemChat(mensagem) {
  var mensagem = mensagem.value;
  event.preventDefault;
  $.ajax({
    url: 'paginas/recursos/buscarMensagem.php',
    type: 'POST',
    data: {
      mensagem: mensagem
    },
    success: function success(result) {
      $("#txtBuscarMensagemChat").val('');
      var cd_chat;
      resultado = JSON.parse(result);
      $.each(resultado, function (i, contato) {
        cd_chat = resultado[i].cd_chat;
        var m = "#" + cd_chat;
        location.href = m;
        document.getElementById(cd_chat).style.backgroundColor = "green";
      });
    }
  });
}

function exibirPostagemBasica() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/salvar-ExibirPostagem.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      $("#postagem").empty();
      resultado = JSON.parse(result);
      $.each(resultado, function (i, contato) {
        verificarExtensao: {
          var extensao = "";

          if (resultado[i].cd_tipo_postagem == 1) {
            extensao = "<img class='col-12' src=" + resultado[i].ds_imagem + ">";
          }

          if (resultado[i].cd_tipo_postagem == 2) {
            extensao = "<video width='100%' height='100%' controls><source src=" + resultado[i].ds_imagem + " type='video/mp4'></video>";

            while (extensao.indexOf("\"") != -1) {
              extensao = extensao.replace(/"/g, '');
              console.log(extensao);
            }
          }

          if (resultado[i].cd_tipo_postagem == 3) {
            extensao = "<audio width='100%' height='100%' controls> <source src=" + resultado[i].ds_imagem + " type='audio/mpeg'> </audio>";
            console.log(extensao);

            while (extensao.indexOf("\"") != -1) {
              extensao = extensao.replace(/"/g, '');
              console.log(extensao);
            }
          }
        }

        verificar_dia_da_postagem: {
          /*DATA->*/
          if (resultado[i].dias == 0) {
            resultado[i].dias = "Hoje às ";
          }

          if (resultado[i].dias == 1) {
            resultado[i].dias = "Ontem ás ";
          }

          if (resultado[i].dias > 1 && resultado[i].dias < 7) {
            resultado[i].dias += " dias atrás ás ";
          }

          if (resultado[i].dias >= 7) {
            resultado[i].dias = resultado[i].dt_postagem;
          }
          /*DATA->*/


          if (resultado[i].diasC == 0) {
            resultado[i].diasC = "Hoje às ";
          }

          if (resultado[i].diasC == 1) {
            resultado[i].diasC = "Ontem ás ";
          }

          if (resultado[i].diasC > 1 && resultado[i].diasC < 7) {
            resultado[i].diasC += " dias atrás ás ";
          }

          if (resultado[i].diasC > 7) {
            resultado[i].diasC = resultado[i].dt_compartilhamento;
          }
        }

        verificar_se_a_imagem_é_nula: {
          if (resultado[i].ds_imagem == null) {
            $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" + "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + " ás " + resultado[i].hr_postagem + "</p>" + "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
          } else {
            $("#postagem").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem' >" + //row informações da postagem
            "<div class='row '>" + "<span class='negrito col-md-11'>Postado por: " + resultado[i].nm_nickname + "</span>" + "<div class='col-md-1'>" + // inicio da col menu
            "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
            "<span class='negrito col-md-11'>Data: " + resultado[i].dias + " ás " + resultado[i].hr_postagem + "</span>" + "<span class='negrito col-md-11'>Titulo: " + resultado[i].nm_titulo + "</span>" + "</div>" + extensao + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
          }
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // Postar


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
    success: function success(result) {
      $("#txttitulo").val('');
      $("#txtdescricao").val('');
      $("#txtimagem").val('');
      exibirPostagem();
    }
  });
}); // Envia o comentario para o banco

function criarId(id) {
  // console.log(id);
  var cd = id;
  event.preventDefault();
  console.log('Tentando enviar o formulário');
  $.ajax({
    url: "paginas/recursos/salvar-comentario.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      comentario: $("#" + cd).val(),
      id: $("#" + cd).attr('id')
    },
    success: function success(result) {
      $("#" + cd).val(""); //  resultado = JSON.parse(result);
      //  $.each(resultado, function (i, contato) {
      //  });
      //          $( "#log-de-ceps").append('<p>' + result + '</p>' );
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirAmigosGrupoChat() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-amigo.php",
    data: {},
    success: function success(result) {
      $("#divAmigo").empty();
      resultado = JSON.parse(result);
      $("#divAmigo").append("<div class='mx-2'>" + "<h3>Amigos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        $("#divAmigo").append("<div id=" + 'amigo' + resultado[i].cd_perfil + " class='row amigo py-2 mt-1' onclick=exibirConversa(this,'amigo')>" + "<div class='col-2    divFotoAmigo p-0 mx-3'>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div>" + resultado[i].nm_nickname + "</div>" + "</div>" + "<hr>");
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-grupos.php",
    data: {},
    success: function success(result) {
      $("#divGrupo").empty();
      resultado = JSON.parse(result);
      $("#divGrupo").append("<div class='mx-2'>" + "<h3>Grupos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        $("#divGrupo").append(" <div id=" + 'grupo' + resultado[i].cd_grupo + " class='row grupo  py-2 mt-1'  onclick=exibirConversa(this,'grupo')  >" + "<div class='col-2  divFotoAmigo p-0 mx-3' >" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo'>" + "</div>" + "<div>" + resultado[i].nm_grupo + "</div>" + "</div>" + "<hr>");
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirConversa(e, tipoChat) {
  var bgWhite = document.getElementsByClassName('amigo');

  for (var i = 0; i < bgWhite.length; i++) {
    bgWhite[i].style.backgroundColor = 'white';
  }

  var bgWhite = document.getElementsByClassName('grupo');

  for (var _i = 0; _i < bgWhite.length; _i++) {
    bgWhite[_i].style.backgroundColor = 'white';
  }

  var conversa = document.getElementById(e.id);
  conversa.style.backgroundColor = 'green';
  repetir('parar');
  var idConversa = e.id.replace(tipoChat, "");
  $.ajax({
    type: "POST",
    url: "paginas/recursos/select-mensagemChat.php",
    data: {
      id: idConversa,
      tipoChat: tipoChat
    },
    success: function success(result) {
      $("#divChat").empty();
      resultado = JSON.parse(result);
      var cd = document.getElementById('txtCdPerfil').value;
      $.each(resultado, function (i, contato) {
        if (cd == resultado[i].cd_perfil) {
          $(".divChat").append( // + resultado[i].cd_postagem
          "<div class='row flex-row-reverse  mt-3'>" + "<div  class='divDigitar col-auto' width='auto' >" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</div>" + // "<div class='col-5'></div>" +
          "</div>");
        } else {
          $(".divChat").append( // + resultado[i].cd_postagem
          "<div class='row  mt-3'>" + "<div  class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</div>" + "</div>");
        }
      });

      if (cont == 0) {
        cont++;
        var x = document.getElementById("divChat").offsetHeight;
        document.getElementById("divChat").scrollTop = x * 10;
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // Amigo


function exibirAmigo() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-amigo.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      $("#divAmigo").empty();
      resultado = JSON.parse(result);
      $("#divAmigo").append("<div class='mx-2'>" + "<h3>Amigos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        $("#divAmigo").append("<div class=' mx-1 amigo mt-1'>" + " <div class='row'>" + "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" + "<ul class='meuDropdown'>" + // "<span>" +
        "<div class='row'>" + "<span class='nickname col-6' onclick=vizualizarPerfil(" + resultado[i].cd_perfil + ")>" + resultado[i].nm_nickname + "</span>" + "<li class='col-6'><a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" + "<ul class='text-left'>" + // "<li onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>Perfil</li>" +
        "<li onclick=aparecerMinichat('modalMinichat'," + resultado[i].cd_perfil + ",\"" + resultado[i].nm_nickname + "\",'amigo')>Conversar</li>" + "<li id=" + resultado[i].cd_perfil + " onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'" + resultado[i].nm_nickname + "\','txtExcluirAmigo'),pegarId(" + resultado[i].cd_perfil + ",'txtId')>Remover Amigo</li>" + "</ul>" + "</li>" + "</div>" + "</ul> " + // "</span>"  + "</p>" +
        "</div>" + "</div>" + "</div> <hr >");
      });
      $("#divAmigo").append("<div class='row  m-0  rounded align-items-center'>" + "<div class='col-12 col-xl-7'>" + "<input class='inputText ' id='txtNomeAmigo' placeholder='Buscar amigo'>" + "</div>" + "<div class='col-12 col-xl-5'>" + "<div class='divButton2 ' >" + "<div class='button ' id='btnBuscarAmigo' onclick='buscarAmigo(txtNomeAmigo, this.id)'>Buscar</div>" + "</div>" + "</div>" + "</div>");
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function buscarAmigo(nomeAmigo, button) {
  var nomeAmigo = nomeAmigo.value;
  var btn = document.getElementById(button);
  btn.disabled = true;
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "paginas/recursos/buscarAmigo.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      nomeAmigo: nomeAmigo
    },
    success: function success(result) {
      btn.disabled = false;
      resultado = JSON.parse(result);
      $("#divAmigo").empty();
      resultado = JSON.parse(result);
      $("#divAmigo").append("<div class='mx-2'>" + "<h3>Amigos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        $("#divAmigo").append("<div class=' mx-1 amigo mt-1'>" + " <div class='row'>" + "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" + "<ul class='meuDropdown'>" + // "<span>" +
        "<div class='row'>" + "<span class='nickname col-6' onclick=vizualizarPerfil(" + resultado[i].cd_perfil + ")>" + resultado[i].nm_nickname + "</span>" + "<li class='col-6'><a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" + "<ul class='text-left'>" + // "<li onclick=vizualizarPerfil("+resultado[i].cd_perfil+")>Perfil</li>" +
        "<li onclick=aparecerMinichat('modalMinichat'," + resultado[i].cd_perfil + ",\"" + resultado[i].nm_nickname + "\",'amigo')>Conversar</li>" + "<li id=" + resultado[i].cd_perfil + " onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'" + resultado[i].nm_nickname + "\','txtExcluirAmigo'),pegarId(" + resultado[i].cd_perfil + ",'txtId')>Remover Amigo</li>" + "</ul>" + "</li>" + "</div>" + "</ul> " + // "</span>"  + "</p>" +
        "</div>" + "</div>" + "</div> <hr >");
      });
      $("#divAmigo").append("<div class='row p-1 m-0  rounded align-items-center'>" + "<div class='col-12 col-xl-4'>" + "<div class='text-center '>" + "<input class='inputText ' id='txtNomeAmigo' placeholder='Buscar amigo por nome'>" + "</div>" + "</div>" + "<div class='offset-xl-2  col-12 col-xl-5'>" + "<div class='divButton2 ' >" + "<div class='button ' id='btnBuscarAmigo' onclick='buscarAmigo(txtNomeAmigo, this.id)'>Buscar</div>" + "</div>" + "</div>" + "</div>");

      if (result == " []") {
        exibirAmigo();
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirGrupos() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-grupos.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      $("#divGrupo").empty();
      resultado = JSON.parse(result);
      $("#divGrupo").append("<div class='mx-2'>" + "<h3>Grupos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        var nm_grupo = resultado[i].nm_grupo;

        while (nm_grupo.indexOf(" ") != -1) {
          nm_grupo = nm_grupo.replace(" ", '/espaco');
        }

        $("#divGrupo").append("<div class=' mx-1 amigo mt-1'>" + " <div class='row'>" + "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" + "<ul class='meuDropdown'>" + // "<span>" +
        "<li >" + resultado[i].nm_grupo + "<a href'#'>" + "<img  class='dropdownIcon' src='assets/img/icon/dropdown.png'>" + "</a>" + "<ul class='text-left'>" + "<li onclick=aparecerMinichat(\"" + 'modalMinichat' + '\",\"' + resultado[i].cd_grupo + '\",\"' + nm_grupo + "\",'grupo')>Abrir conversa</li>" + "<li onclick='sairGrupo(" + resultado[i].cd_grupo + ")'>Sair do grupo</li>" + "<li>Denunciar grupo</li>" + // "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
        // resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +
        "</ul>" + "</li>" + "</ul> " + // "</span>"  + "</p>" +
        "</div>" + "</div>" + "</div> <hr >");
      });
      $("#divGrupo").append("<div  class='text-center p-1'>" + "<input id='txtNomeGrupo' placeholder='Buscar grupo por nome'>" + "<button id='btnBuscarGrupo' onclick='buscarGrupo(txtNomeGrupo, this.id)'>Enviar</button>" + "<div>");
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function buscarGrupo(nomeGrupo, button) {
  var nomeGrupo = nomeGrupo.value;
  var btn = document.getElementById(button);
  btn.disabled = true;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/buscarGrupo.php",
    data: {
      nomeGrupo: nomeGrupo
    },
    success: function success(result) {
      btn.disabled = false;
      $("#divGrupo").empty();
      resultado = JSON.parse(result);
      $("#divGrupo").append("<div class='mx-2'>" + "<h3>Grupos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        var nm_grupo = resultado[i].nm_grupo;

        while (nm_grupo.indexOf(" ") != -1) {
          nm_grupo = nm_grupo.replace(" ", '/espaco');
        }

        $("#divGrupo").append("<div class=' mx-1 amigo mt-1'>" + " <div class='row'>" + "<div class='col-md-1 col-lg-2   divFotoAmigo p-0 mx-3'>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" + "<ul class='meuDropdown'>" + // "<span>" +
        "<li >" + resultado[i].nm_grupo + "<a href'#'>" + "<img  class='dropdownIcon' src='assets/img/icon/dropdown.png'>" + "</a>" + "<ul class='text-left'>" + "<li onclick=aparecerMinichat(\"" + 'modalMinichat' + '\",\"' + resultado[i].cd_grupo + '\",\"' + nm_grupo + "\",'grupo')>Abrir conversa</li>" + "<li onclick='sairGrupo(" + resultado[i].cd_grupo + ")'>Sair do grupo</li>" + "<li>Denunciar grupo</li>" + // "<li id="+resultado[i].cd_perfil+" onclick=aparecerModal('modalRemoverAmigo'),pegarNickname(\'"+
        // resultado[i].nm_nickname+"\','txtExcluirAmigo'),pegarId("+resultado[i].cd_perfil+",'txtId')>Remover Amigo</li>" +
        "</ul>" + "</li>" + "</ul> " + // "</span>"  + "</p>" +
        "</div>" + "</div>" + "</div> <hr >");
      });
      $("#divGrupo").append("<div id='txtNomeGrupo' class='text-center p-1'>" + "<input placeholder='Buscar grupo por nome'>" + "<button id='btnBuscarGrupo' onclick='buscarAmigo(txtNomeGrupo, this.id)'>Enviar</button>" + "<div>");
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function aparecerUsuarios() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-usuarios.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      resultado = JSON.parse(result);
      var perfil = document.getElementById('txtCdPerfil').value;
      $("#divUsuarios").empty();
      $.each(resultado, function (i, contato) {
        if (resultado[i].cd_de != perfil && resultado[i].ic_status != 0) {
          $("#divUsuarios").append("<div class='row p-5 usuarioItens'>" + "<div class='col-md-2 col-12' >" + "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='col-12 col-md-6 offset-md-3 text-center'>" + "<div class='col-md-12'>" + "<p class='txtVisualizarPerfil' onclick=vizualizarPerfil(" + resultado[i].cd_perfil + ")>" + resultado[i].nm_nickname + "</p>" + "</div>" + "<div class='col-md-12'>" + "<button id=" + resultado[i].cd_perfil + " onclick='solicitarAmizade(this.id)'>Solicitar amizade</button>" + "</div>" + "</div>" + "</div>" + "<hr>");
        } else {
          $("#divUsuarios").append("<div class='row p-5'>" + "<div class='col-md-2 text-center' >" + "<img class='imgUsuario divImagemBuscarUsuario' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='col-12 col-md-6 offset-md-3'>" + "<div class='col-md-12'>" + "<p >" + resultado[i].nm_nickname + "</p>" + "</div>" + "<div class='col-md-12'>" + "<button id=" + resultado[i].cd_perfil + " onclick='cancelarSolicitacao(this.id)'>Cancelar solicitação</button>" + "</div>" + "</div>" + "<hr>");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
} //Adiciona um amigo


function solicitarAmizade(e) {
  var id = e;
  var button = document.getElementById(id);
  button.disabled;
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "paginas/recursos/solicitar-amizade.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      cd_para: id
    },
    success: function success(result) {
      button.disabled = false; // resultado = JSON.parse(result);

      aparecerUsuarios();
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function cancelarSolicitacao(e) {
  var id = e;
  var button = document.getElementById(id);
  button.disabled;
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "paginas/recursos/apagar-solicitacao.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      cd_para: id
    },
    success: function success(result) {
      button.disabled = false; // resultado = JSON.parse(result);

      $("#divUsuarios").empty();
      aparecerUsuarios();
    },
    error: function error(result) {
      console.error(result);
    }
  });
} //Pesquisar usuario na pagina buscar amigo


$("#btnBuscarAmigo").click(function (event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "paginas/recursos/pesquisar-amigo.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      nome: $("#txtBuscarAmigo").val()
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#divUsuarios").empty();
      var perfil = document.getElementById('txtCdPerfil').value;
      $.each(resultado, function (i, contato) {
        if (resultado[i].cd_de != perfil) {
          $("#divUsuarios").append("<div class='row'>" + "<div class='col-md-6'>" + "<img class='imgUsuario ' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='row col-md-6'>" + "<div class='col-md-12'>" + "<p >" + resultado[i].nm_nickname + "</p>" + "</div>" + "<div class='col-md-12'>" + "<button id=" + resultado[i].cd_perfil + " onclick='solicitarAmizade(this.id)'>Solicitar amizade</button>" + "</div>" + "</div>" + "</div>" + "<hr>");
        } else {
          $("#divUsuarios").append("<div class='row'>" + "<div class='col-md-6'>" + "<img class='imgUsuario ' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='row col-md-6'>" + "<div class='col-md-12'>" + "<p >" + resultado[i].nm_nickname + "</p>" + "</div>" + "<div class='col-md-12'>" + "<button id=" + resultado[i].cd_perfil + " onclick='cancelarSolicitacao(this.id)'>Cancelar solicitação</button>" + "</div>" + "</div>" + "</div>" + "<hr>");
        }
      });

      if ($("#txtBuscarAmigo").val() == "") {
        aparecerUsuarios();
      }

      $("#txtBuscarAmigo").val("");
    },
    error: function error(result) {
      console.error(result);
    }
  });
});

function filtrarNotificacao(e) {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/filtrarNotificacao.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      campo: e.value
    },
    success: function success(result) {
      $("#divNotificacao").empty();
      resultado = JSON.parse(result);
      $("#divNotificacao").append("<ul class='meuDropdown text-center'>" + "<li>" + "filtrar" + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" + "<ul class='w-100'>" + "<li name='filtrarNotificacao' value='1' onclick='filtrarNotificacao(this)'>Mensagem</li>" + "<li name='filtrarNotificacao' value='2' onclick='filtrarNotificacao(this)' >Postagem</li>" + "<li name='filtrarNotificacao' value='3' onclick='filtrarNotificacao(this)' >Denuncia</li>" + "<li name='filtrarNotificacao' value='4' onclick='filtrarNotificacao(this)' >Grupo</li>" + "<li name='filtrarNotificacao' value='5' onclick='filtrarNotificacao(this)' >Curtida</li>" + "<li name='filtrarNotificacao' value='6' onclick='filtrarNotificacao(this)' >Comentário</li>" + "<li name='filtrarNotificacao' value='7' onclick='filtrarNotificacao(this)' >Solicitação de amizade</li>" + "</ul>" + "</li>" + "</ul> " + "<hr >"); // var perfil = document.getElementById('txtCdPerfil').value

      $.each(resultado, function (i, contato) {
        if (resultado[i].nm_tipo_notificacao == "solicitação de amizade") {
          $("#divNotificacao").append("<div class='row'>" + "<p class='text-center col-lg-12'>Convite de amizade</p>" + "<p class='col-lg-12'><img id='imgPerfilNotificacao' src=" + resultado[i].ds_imagem + "><span class='mx-2'>" + resultado[i].nm_nickname + "</span></p>" + "<div class='col-lg-12 'row p-0 m-0'>" + "<button class='btnTrue  col-12' onclick='aceitarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >" + "Aceitar" + "</button>" + "<p class=col-12></p>" + "<button class='btnFalse col-12 ' onclick='recusarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >" + "Recusar" + "</button>" + "</div>" + "</div>" + "<hr>");
        } else {
          $("#divNotificacao").append("<div class='row'>" + "<div class='col-12 text-center'>" + "<h4>" + resultado[i].nm_tipo_notificacao + "</h4> " + "</div>" + "<hr>" + "<div class='col-2'>" + "<img class='w-50' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='col-10'>" + resultado[i].nm_titulo + "</div>" + "<div class='col-12'>" + "de:" + resultado[i].nome + "</div>" + "</div>" + "<hr>");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function notificar() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-notificacao.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      // console.log(result);
      resultado = JSON.parse(result); // $("#divNotificacao").empty()
      // var perfil = document.getElementById('txtCdPerfil').value

      $("#divNotificacao").append("<ul class='meuDropdown text-center'>" + // "<span>" +
      "<li>" + "filtrar" + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" + "<ul class='w-100'>" + "<li name='filtrarNotificacao' value='1' onclick='filtrarNotificacao(this)'>Mensagem</li>" + "<li name='filtrarNotificacao' value='2' onclick='filtrarNotificacao(this)' >Postagem</li>" + "<li name='filtrarNotificacao' value='3' onclick='filtrarNotificacao(this)' >Denuncia</li>" + "<li name='filtrarNotificacao' value='4' onclick='filtrarNotificacao(this)' >Grupo</li>" + "<li name='filtrarNotificacao' value='5' onclick='filtrarNotificacao(this)' >Curtida</li>" + "<li name='filtrarNotificacao' value='6' onclick='filtrarNotificacao(this)' >Comentário</li>" + "<li name='filtrarNotificacao' value='7' onclick='filtrarNotificacao(this)' >Solicitação de amizade</li>" + "</ul>" + "</li>" + "</ul> " + "<hr >");
      $.each(resultado, function (i, contato) {
        if (resultado[i].cd_tipo_notificacao == 7) {
          $("#divNotificacao").append("<div class='row'>" + "<p class='text-center col-lg-12'>Convite de amizade</p>" + "<p class='col-lg-12'><img id='imgPerfilNotificacao' src=" + resultado[i].ds_imagem + "><span class='mx-2'>" + resultado[i].nome + "</span></p>" + "<div class='col-lg-12 'row p-0 m-0'>" + "<button class='btnTrue  col-12' onclick='aceitarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >" + "Aceitar" + "</button>" + "<p class=col-12></p>" + "<button class='btnFalse col-12 ' onclick='recusarAmizade(this.id, this.value)' id=" + resultado[i].cd_de + " value=" + resultado[i].cd_para + " >" + "Recusar" + "</button>" + "</div>" + "</div>" + "<hr>");
        } else {
          $("#divNotificacao").append("<div class='row'>" + "<div class='col-12 text-center'>" + "<h4>" + resultado[i].nm_tipo_notificacao + "</h4> " + "</div>" + "<hr>" + "<div class='col-2'>" + "<img class='w-50' src=" + resultado[i].ds_imagem + ">" + "</div>" + "<div class='col-10'>" + resultado[i].nm_titulo + "</div>" + "<div class='col-10 text-center'>" + "de: " + resultado[i].nome + "</div>" + "<div class='col-10 text-center'>" + "<button class='btnTrue' onclick='apagarNotificacao(" + resultado[i].cd_notificacao + ");'>ok</button>" + "</div>" + "</div>" + "<hr>");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  }); // Aparecer quantidade de notificações

  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-qtNotificacao.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#qtNotificacao").empty(); // var perfil = document.getElementById('txtCdPerfil').value

      $.each(resultado, function (i, contato) {
        if (resultado[i].qt > 1) {
          $("#qtNotificacao").append("<span class='text-danger '>" + resultado[i].qt + " </span>" + "Notificações");
        } else if (resultado[i].qt == 1) {
          $("#qtNotificacao").append("<span class='text-danger '>" + resultado[i].qt + " </span>" + "Notificação");
        } else if (resultado[i].qt == 0) {
          $("#qtNotificacao").append("<span class='text-light'>" + resultado[i].qt + " </span>" + "Notificações");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function apagarNotificacao(cd_notificacao) {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/apagarNotificacao.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      cdNotificacao: cd_notificacao
    },
    success: function success(result) {
      if (result == ' sucesso') {
        notificar();
      } else {
        console.log('ops! houve um erro ao apagar a notificacao');
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function aceitarAmizade(id, value) {
  var de = id;
  var para = value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/aceitar-amizade.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      // $("#txtBuscarAmigo").val(),
      de: de,
      para: para // para:

    },
    success: function success(result) {
      console.log(result);

      if (result == ' sucesso') {
        console.log('Amigo adicionado com sucesso');
        notificar();
      } else {
        console.log('Não foi possivel adiciona-lo');
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function recusarAmizade(id, value) {
  var de = id;
  var para = value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/recusar-amizade.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      // $("#txtBuscarAmigo").val(),
      de: de,
      para: para // para:

    },
    success: function success(result) {
      if (result == ' sucesso') {
        console.log('Solicitação recusada com sucesso');
        notificar();
      } else {
        console.log('Não foi possivel recusar');
      }
    },
    error: function error(result) {
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

  if (modal.hidden == true) {
    modal.hidden = false; // body.style.backgroundColor = 'black';

    if (id != 'modalMinichat') {
      container.style.opacity = '0.3';
    }
  } else {
    modal.hidden = true;
    container.style.opacity = '1.0';
  }
}

function alterarImagem() {
  var data = new FormData(); // data.append('txttitulo', $("#txttitulo").val());
  // data.append('txtdescricao', $("#txtdescricao").val());

  data.append('txtimagem', $('#fileAlterarImagem').prop('files')[0]);
  $.ajax({
    url: 'paginas/recursos/alterar-imagem.php',
    type: 'POST',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(result) {
      // $("#fileAlterarImagem").val('')
      $("#divFotoPerfil").empty();
      $("#divFotoPerfil").append("<img id='imgPerfil' class='fotoPerfil' src=" + result + " >" + " <figcaption>Alterar foto</figcaption>");
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

  $.ajax({
    type: "POST",
    url: "paginas/recursos/selecionar-todos-nicknames.php",
    data: {
      chave: 'valorizado demais esse AJAX!!'
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $.each(resultado, function (i, contato) {
        if (resultado[i].nm_nickname == txtNickname.value) {
          txtSmall.innerHTML = "O nickname " + resultado[i].nm_nickname + " ja está sendo usado";
          campoInvalido(id, small);
          return false;
        } else {
          campoValido(id, small);
          txtSmall.innerHTML = "Nickname válido";
          button.classList.remove("disabled");
        }
      });
    },
    error: function error(result) {
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

function alterarNickname(id, small) {
  var txtNickname = document.getElementById(id).value;
  var txtSmall = document.getElementById(small);
  $.ajax({
    type: "POST",
    url: "paginas/recursos/alterar-nickname.php",
    data: {
      nickname: txtNickname
    },
    success: function success(result) {
      txtSmall.innerHTML = "Nickname Alterado com sucesso";
      $("#txtNickname").val("");
      $(".labelNickname").empty();
      $(".labelNickname").append("<p>" + txtNickname + " </p>"); // resultado = JSON.parse(result)
      // $.each(resultado, function (i, contato) {
      // });
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // function dropdownAmigo(){
//
// }


function pegarNickname(nickname, campo) {
  var nick = nickname;
  var campo = document.getElementById(campo);
  campo.innerHTML = campo.innerHTML + "\"" + nick + "\"";
}

function pegarId(id, campo) {
  var id = id;
  var campo = document.getElementById(campo);
  campo.value = id;
}

function removerAmigo() {
  $.ajax({
    type: "POST",
    url: "paginas/recursos/remover-amigo.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      id: $("#txtId").val()
    },
    success: function success(result) {
      if (result = ' sucesso') {
        window.location.reload();
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirMinhasPostagensBasica(e) {
  var url = "";
  var campo = "";
  var vrf = "";

  if (e == null) {
    url = "paginas/recursos/exibirMinhasPostagens.php";
  } else {
    url = "paginas/recursos/filtrarPostagem.php";
    campo = e.value;
    vrf = e.name;
  }

  $.ajax({
    type: "POST",
    url: url,
    data: {
      campo: campo,
      vrf: vrf
    },
    success: function success(result) {
      var cont = 0;
      $("#minhasPostagens").empty();
      resultado = JSON.parse(result);
      var cd = document.getElementById('txtCdPerfil').value;
      $.each(resultado, function (i, contato) {
        var extensao = "";

        if (resultado[i].cd_tipo_postagem == 1) {
          extensao = "<img class='col-12' src=" + resultado[i].ds_imagem + ">";
        }

        if (resultado[i].cd_tipo_postagem == 2) {
          extensao = "<video width='100%' height='100%' controls><source src=" + resultado[i].ds_imagem + " type='video/mp4'></video>";

          while (extensao.indexOf("\"") != -1) {
            extensao = extensao.replace(/"/g, '');
          }
        }

        if (resultado[i].cd_tipo_postagem == 3) {
          extensao = "<audio width='100%' height='100%' controls> <source src=" + resultado[i].ds_imagem + " type='audio/mpeg'> </audio>";

          while (extensao.indexOf("\"") != -1) {
            extensao = extensao.replace(/"/g, '');
          }
        }

        if (resultado[i].ds_imagem == null) {
          $("#minhasPostagens").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" + "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" + "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
        } else {
          $("#minhasPostagens").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem' >" + "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" + "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" + "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" + "<p>" + extensao + "</p>" + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function vizualizarPerfil(id) {
  location.href = 'visualizarPerfil.php';
  var cd_perfil = document.getElementById('txtOutroPerfil').value = id;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/salvar-id-outroPerfil.php",
    data: {
      id: cd_perfil
    },
    success: function success(result) {},
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirDadosPerfil() {
  var cd_perfil = document.getElementById('txtOutroPerfil').value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/select-dadosOutroPerfil.php",
    data: {
      id: cd_perfil
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      var data = converterData(resultado[0].dt_nasc);
      $("#nicknameOutroPerfil").append(resultado[0].nm_nickname);
      $("#dataNascOutroPerfil").append( // resultado[0].dt_nasc
      data);

      if (resultado[0].ds_sexo == "M") {
        $("#sexoOutroPerfil").append("<img class='iconSexo' src='assets/img/icon/M.png'>");
      } else if (resultado[0].ds_sexo == "F") {
        $("#sexoOutroPerfil").append("<img class='iconSexo' src='assets/img/icon/F.png'>");
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function converterData(data) {
  return data.split('-').reverse().join('/');
}

function postagemOutroPerfil() {
  var cd_perfil = document.getElementById('txtOutroPerfil').value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibirPostagemOutroPerfil.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      id: cd_perfil
    },
    success: function success(result) {
      var a = 0;
      $("#minhasPostagens").empty();
      resultado = JSON.parse(result);
      var cd = cd_perfil;
      $.each(resultado, function (i, contato) {
        if (resultado[i].cdPerfil === cd) {
          a++;

          if (a > 0 && a < 2) {
            $("#minhasPostagens").empty();
            $("#minhasPostagens").append("<h3>Minhas Postagens</h3>");
          }

          if (resultado[i].ds_imagem == null) {
            $("#minhasPostagens").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" + "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" + "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
          } else {
            $("#minhasPostagens").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem' >" + "<p>" + "<span class='negrito'>Postado por: </span>" + resultado[i].nm_nickname + "</p>" + "<p>" + "<span class='negrito'>Data: </span>" + resultado[i].dias + "  dias atrás   " + "   ás   " + resultado[i].hr_postagem + "</p>" + "<p>" + "<span class='negrito'>Titulo: </span>" + resultado[i].nm_titulo + "</p>" + "<p>" + "<img class='col-12 imgPostagem' src=" + resultado[i].ds_imagem + ">" + "</p>" + "<input id=" + resultado[i].cd_postagem + " class='col-8 form'>" + "<button type='button'  class='offset-1 col-3 px-0 mx-0 btnComentar'" + "  value=" + resultado[i].cd_postagem + " onclick='criarId(this.value)'>Comentar</button>" + "</div>" + " <hr class='linha'> ");
          }
        } else if (a == 0) {
          $("#minhasPostagens").empty();
          $("#minhasPostagens").append("<h3>Nenhuma Postagem Feita</h3>"); // var divMinhasPostagens = document.getElementById('minhasPostagens');
          // divMinhasPostagens.style.backgroundColor = "transparent";
          //   divMinhasPostagens.style.color = "transparent";
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function amigosOutroPerfil() {
  var cd = document.getElementById('txtOutroPerfil').value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibirAmigoOutroPerfil.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#divAmigo").append("<div class='mx-2'>" + "<h3>Amigos</h3> " + "</div>" + "<hr>");
      $.each(resultado, function (i, contato) {
        if (resultado[i].cd_perfil != cd) {
          $("#divAmigo").append("<div class=' mx-1'>" + " <div class='row '>" + "<div class='col-md-1 col-lg-2  divFotoAmigo p-0 mx-3 '>" + "<img src=" + resultado[i].ds_imagem + " class='fotoAmigo '>" + "</div>" + "<div class='col-md-2 col-lg-8  pr-0 mx-0 nomeAmigo'>" + "<ul class='meuDropdown'>" + // "<span>" +
          "<li>" + resultado[i].nm_nickname + "<a href'#'> <img  class='dropdownIcon' src='assets/img/icon/dropdown.png'> </a>" + "<ul class='text-left'>" + "<li onclick=vizualizarPerfil(" + resultado[i].cd_perfil + ")>Perfil</li>" + // "<li>Conversar</li>" +
          "</ul>" + "</li>" + "</ul> " + // "</span>"  + "</p>" +
          "</div>" + "</div>" + "</div> <hr >");
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function aparecerMinichat(id, para, nickname, tipoChat) {
  // var modal = document.getElementsByClassName("myModal");
  // var modal = document.querySelectorAll(".myModal");
  var nick = nickname;
  console.log(tipoChat);

  while (nick.indexOf("/espaco") != -1) {
    nick = nick.replace("/espaco", " ");
  }

  console.log("para:", para);
  var widthTela = window.innerWidth;
  var modal = document.getElementById(id); // document.getElementById('modalMinichat').value = tipoChat;

  var container = document.querySelector(".container-fluid");
  var btn = document.getElementById('btnMinichat'); // console.log(modal.hidden);

  if (modal.hidden === true && widthTela > 1200) {
    modal.hidden = false;
    document.querySelector('.nickMinichat').innerHTML = nick; // body.style.backgroundColor = 'black';

    var time = setTimeout(function () {
      exibirMensagemMinichat(para, tipoChat);
    }, 100);
    var x = document.getElementById("divTextoMinichat").offsetHeight;
    btn.value = para;
    document.getElementById("divTextoMinichat").scrollTop = x * 10;
  } else {
    clearTimeout(time);
    modal.hidden = true;
    container.style.opacity = '1.0';
  }
}

function exibirMensagemMinichat(para, tipoChat) {
  var de = document.getElementById('txtCdPerfil').value;
  var para = para; // var para =

  var tipoChat = tipoChat;
  console.log(tipoChat);
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-MensagemMinichat.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      para: para,
      tipoChat: tipoChat
    },
    success: function success(result) {
      console.log(result);
      resultado = JSON.parse(result);
      $("#divTextoMinichat").empty();

      if (tipoChat == "amigo") {
        $.each(resultado, function (i, contato) {
          if (resultado[i].cd_de == de && resultado[i].cd_para == para) {
            $("#divTextoMinichat").append("<div class='divEnviarMinichat'>" + "<p>" + resultado[i].ds_mensagem + "</p>" + "</div>" + "<br>" + "<br>");
          }

          if (resultado[i].cd_de == para && resultado[i].cd_para == de) {
            $("#divTextoMinichat").append("<div class='row  mt-3'>" + "<div  class='divReceber col-auto' width='auto'>" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</div>" + "</div>");
          }
        });
      } else if (tipoChat == "grupo") {
        $.each(resultado, function (i, contato) {
          if (resultado[i].cd_de == de) {
            $("#divTextoMinichat").append("<div class='divEnviarMinichat'>" + "<p>" + resultado[i].ds_mensagem + "</p>" + "</div>" + "<br>" + "<br>" + "<br>");
          } else {
            $("#divTextoMinichat").append("<div class='divReceberMinichat' id='divReceberMinichat'>" + "<p>" + resultado[i].nm_nickname + ": " + resultado[i].ds_mensagem + "</p>" + "</div>" + "<br>" + "<br>" + "<br>");
          }
        });
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function enviarMensagemMinichat() {
  var btn = document.getElementById('btnMinichat');
  btn.disabled = true;
  var para = btn.value;
  $.ajax({
    type: "POST",
    url: "paginas/recursos/enviar-MensagemMinichat.php",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      //key : value
      //caso envie dados ;)
      para: btn.value,
      mensagem: $("#txtMinichat").val()
    },
    success: function success(result) {
      btn.disabled = false; // resultado = JSON.parse(result);

      exibirMensagemMinichat(para); //Passar o parametro;
    },
    error: function error(result) {
      btn.disabled = false;
      console.error(result);
    }
  });
}

function abrirModalSucesso(texto) {
  var modalSucesso = document.getElementById('modalSucesso');
  modalSucesso.innerHTML = "<h3>" + texto + "</h3>" + "<button class='button' onclick='fecharModalSucesso()''>Ok</button>";
  modalSucesso.hidden = false;
}

function fecharModalSucesso() {
  var modalSucesso = document.getElementById('modalSucesso');
  modalSucesso.hidden = true;
}

function adicionarAmigosGrupo() {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "paginas/recursos/exibir-amigo.php",
    data: {
      chave: 'valorizado demais esse AJAX!!' //key : value
      //caso envie dados ;)

    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#divAmigoGrupo").empty();
      $.each(resultado, function (i, contato) {
        var marginTop = 0;

        if (i <= 2) {
          marginTop = 3;
        } else {
          marginTop = 0;
        }

        $("#divAmigoGrupo").append("<div class=\"col-md-4 text-center  mt-" + marginTop + "\">" + // "<div class='col-md-12 '>"+
        // "<input hidden class='inputAdiconarAmigoGrupo' type='checkbox'  name="+resultado[i].nm_nickname+" id="+resultado[i].cd_perfil+1+" value="+resultado[i].cd_perfil+">"+
        "<label class='col-md-12 labelImgAdiconarAmigoGrupo'  for=" + resultado[i].cd_perfil + 1 + " >" + "<img class='imgAdiconarAmigoGrupo'  src=" + resultado[i].ds_imagem + ">" + "</label>" + // "</div>" +
        // "<div class='col-md-12'>" +
        "<input hidden class='inputAdiconarAmigoGrupo' type='checkbox' id=" + resultado[i].cd_perfil + 1 + "  name='amigos' value=" + resultado[i].cd_perfil + "  >" + "<label class='col-md-12 ' for=" + resultado[i].cd_perfil + 1 + " >" + "<p class='txtAdiconarAmigoGrupo'>" + resultado[i].nm_nickname + "</p>" + "</label>" + // "</div>" +
        "</div>");
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function criarGrupo(idModal) {
  event.preventDefault();
  console.log('Criando o grupo...');
  var data = new FormData();
  data.append('nmGrupo', $('#txtNomeGrupo').val());
  data.append('dsGrupo', $('#txtDescricaoGrupo').val());
  data.append('imGrupo', $('#fileImagemGrupo').prop('files')[0]);
  var amigo = [];
  $.each($("input[name='amigos']:checked"), function () {
    amigo.push($(this).val());
  });
  data.append('amigo[]', amigo); //   for (var val of data.entries()) {
  //     console.log(val);
  // }

  $.ajax({
    url: 'paginas/recursos/criarGrupo.php',
    type: 'POST',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(result) {
      if (result == " sucesso") {
        abrirModalSucesso('Grupo criado com sucesso');
        aparecerModal(nmModal);
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // function emojinPostagem(emo, id) {
//     console.log(id);
//     console.log(emo);
//     var valor = $(".inputComentarioPostagem"+id).val();
//     var x = $(".inputComentarioPostagem"+id).val(valor + emo);
//     console.log(x);
//  }
// /////////////////////////////////////////////////////////      FIM  SISTEMA DE EMOJIN        //////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////        MODAL DA DENUNCIA        //////////////////////////////////////////////////////////////////


function modalDenunciaPostagem(id) {
  document.getElementById('denunciaModal').innerHTML = "";
  document.getElementById('txt1').checked = null;
  document.getElementById('txt2').checked = null;
  document.getElementById('txt3').checked = null;
  document.getElementById('outroDenuncia').innerHTML = "";
  var cd = id;
  event.preventDefault();
  console.log('Tentando abrir modal de denuncia');
  $.ajax({
    url: "paginas/recursos/salvar-modal_denuncia.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $.each(resultado, function (i, contato) {
        $("#denunciaModal").append("<div class='textoDenuncia'>" + "<p> Deseja denunciar essa postagem efeituada por <a href''>" + resultado[i].nm_nickname + " </a> pelo seguite motivo: </p>" + "</div>");
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function desabilitar() {
  //document.getElementById('outroDenuncia').innerHTML = '';
  var selecionar = document.getElementById('outroDenuncia');
  var txt1 = document.getElementById('txt1');
  var txt2 = document.getElementById('txt2');
  var txt3 = document.getElementById('txt3');

  if (selecionar.disabled == true) {
    selecionar.disabled = false;
    txt1.disabled = true;
    txt1.checked = false;
    txt2.disabled = true;
    txt2.checked = false;
    txt3.disabled = true;
    txt3.checked = false;
  } else {
    selecionar.disabled = true;
    txt1.disabled = false;
    txt2.disabled = false;
    txt3.disabled = false;
  }
} // /////////////////////////////////////////////////////////       FIM MODAL DA DENUNCIA        //////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////       INICIO MODAL EXCLUIR        //////////////////////////////////////////////////////////////////


function chamadaModalExcluirPosatgem(id) {
  $("#excluirModal").empty();
  $("#excluirModal").append("<div class='row'>" + "<p class='textoConfirmarExcluir'> Deseja realmente excluir esta postagem? </p>" + "</div>" + "<br>" + "<div class='row'>" + "<div class='col-sm-6'>" + "<p> <button class='btnOpcoes btn btn-success' onclick='modalExcluirPostagemFechar()'> Cancelar </button> </p>" + "</div>" + "<div class='col-sm-6'>" + "<p> <button class='btnOpcoes btn btn-success' value=" + id + " onclick='modalExcluirPostagem(this.value)'> Continuar </button> </p>" + "</div>" + "</div>");
}

function modalExcluirPostagemFechar() {
  $("#modalExcluir").modal('hide');
}

function modalExcluirPostagem(id) {
  var cd = id;
  event.preventDefault();
  console.log('Tentando abrir modal de excluir');
  $.ajax({
    url: "paginas/recursos/salvar-modal_excluir.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      console.log("Postagem (" + cd + ") excluida com sucesso!");
      setTimeout(function () {
        this.exibirPostagem();
        $("#modalExcluir").modal('hide');
      }, 400);
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // /////////////////////////////////////////////////////////       FIM MODAL EXCLUIR        ///////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////       INICIO ABA DE COMENTARIOS        //////////////////////////////////////////////////////////////////


function abriComentarioAuxiliar(id) {
  var cd = id;
  var area = document.getElementById('areaComentario' + cd);

  if (area.style.display == 'none') {
    area.style.display = 'block';
    setTimeout(function () {
      this.exibirComentario(id);
    }, 200);
  } else {
    area.style.height = '300px';
    area.style.paddingTop = '5px';
    area.style.paddingLeft = '5px';
    area.style.paddingRight = '10px';
    area.style.overflowY = 'scroll';
    area.style.position = 'relative';
    area.style.backgroundColor = '#F5FFFA';
    area.style.borderRadius = '12px';
    setTimeout(function () {
      this.exibirComentario(id);
    }, 200);
  }
}

function abriComentario(id) {
  var cd = id;
  var area = document.getElementById('areaComentario' + cd);

  if (area.style.display == 'block') {
    area.style.display = 'none';
    $("#tbEmojinPostagem" + cd).hide();
  } else {
    area.style.display = 'block';
    area.style.height = '300px';
    area.style.paddingTop = '5px';
    area.style.paddingLeft = '5px';
    area.style.paddingRight = '10px';
    area.style.overflowY = 'scroll';
    area.style.position = 'relative';
    area.style.backgroundColor = '#F5FFFA';
    area.style.borderRadius = '12px';
    setTimeout(function () {
      this.exibirComentario(id);
    }, 200);
  }
}

function exibirComentario(id) {
  var cd = id;
  $('.inputComentarioPostagem' + cd).focus();
  var rowComentario = $('.inputComentarioPostagem' + cd);
  $.ajax({
    url: "paginas/recursos/salvar-ExibirComentario.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#comentarioPostagem" + cd).empty();
      $.each(resultado, function (i, contato) {
        $("#comentarioPostagem" + cd).append("<div class='row rowComentario'>" + "<p class='comentario'>" + "<a onclick='opcaoComentario(" + resultado[i].cd_comentario + ")' >" + resultado[i].nm_nickname + ": </a>" + "<span>" + resultado[i].ds_comentario + "</span>" + "</p>" + "</div>");
        var area = document.getElementById('areaComentario' + cd);
        area.scrollTop = area.scrollHeight;
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // /////////////////////////////////////////////////////////       FIM ABA DE COMENTARIOS        //////////////////////////////////////////////////////////////////


function opcaoComentario(id) {
  // id do comentario
  event.preventDefault();
  console.log('Tentando abrir menu comentario');
  $.ajax({
    url: "paginas/recursos/salvar-menuComentario.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      idComentario: id
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $.each(resultado, function (i, contato) {
        var cd = resultado[i].cd_postagem;
        $("#menuComentario").append("<div>" + "<button type='button' class='btn btn-link' onclick=''>" + "EXCLUIR</button>" + "<button type='button' class='btn btn-link' onclick=''>" + "EXCLUIR</button>" + "</div>");
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // //////////////////////////////////////////      INICIO DE  LIKE | DESLIKE | COMENTAR | COMPARTILHAR | DENUNCIAR          ////////////////////////////////////////


function LikePostagem(id) {
  var cd = id;
  event.preventDefault();
  console.log('Tentando enviar like');
  $.ajax({
    url: "paginas/recursos/salvar-like.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      $("#" + cd).val("");
      setTimeout(function () {
        this.exibirPostagem();
      }, 300);
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function DeslikePostagem(id) {
  var cd = id;
  event.preventDefault();
  console.log('Tentando enviar deslike');
  $.ajax({
    url: "paginas/recursos/salvar-deslike.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      $("#" + cd).val("");
      setTimeout(function () {
        this.exibirPostagem();
      }, 300);
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function ComentarPostagem(id) {
  var cd = id;
  event.preventDefault();
  console.log('Tentando enviar comentario');
  $.ajax({
    url: "paginas/recursos/salvar-comentario.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      comentario: $("#" + cd).val(),
      id: $("#" + cd).attr('id')
    },
    success: function success(result) {
      setTimeout(function () {
        this.abriComentarioAuxiliar(id);
      }, 200);
      $("#" + cd).val("");
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function conpartilharPostagem(id) {
  var cd = id;
  event.preventDefault();
  console.log('Tentando conpartilhar');
  $.ajax({
    url: "paginas/recursos/salvar-conpartilhar.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      id: cd
    },
    success: function success(result) {
      setTimeout(function () {
        this.exibirPostagem();
      }, 800);
    },
    error: function error(result) {
      console.error(result);
    }
  });
} // //////////////////////////////////////////        FIM DE LIKE | DESLIKE | COMENTAR | COMPARTILHAR | DENUNCIAR         ////////////////////////////////////////
// /////////////////////////////////////////////////////////   Formulario Postar     //////////////////////////////////////////////////////////
// $("#formulario-postagem").on('submit', function(event){
//    event.preventDefault();
//   //     console.log('Tentando cadastra postagem');
//    var data = new FormData();
//    data.append('txttitulo', $("#txttitulo").val());
//    data.append('txtimagem', $('#txtimagem').prop('files')[0]);
//    $.ajax({
//        url: 'paginas/recursos/salvar-postagem.php',
//        type: 'POST',
//        data: data,
//        cache: false,
//        contentType: false,
//        processData: false,
//
//        success: function(result)
//        {
//            $("#txttitulo").val(''),
//            $("#txtdescricao").val(''),
//            $("#txtimagem").val('')
//
//            location.href = "home.php";
//        }
//    });
// });


$("#formulario-denuncia").submit(function (event) {
  event.preventDefault();
  console.log('Tentando denunciar postagem');
  $.ajax({
    url: "paginas/recursos/salvar-denuncia.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      txt1: $("input[name='txt1']:checked").val(),
      txt2: $("input[name='txt2']:checked").val(),
      txt3: $("input[name='txt3']:checked").val(),
      txt4: $("input[name='txt4']:checked").val(),
      outroDenuncia: $("#outroDenuncia").val()
    },
    success: function success(result) {
      if (result == true) {
        $('#modalDenuncia').modal('hide');
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}); // function modalExcluirPostagemFechar(){
//    $('#modalDenuncia').modal('hide');
// }
////////////////////////////////////////////////////////////  Fim Formulario Postar     ///////////////////////////////////////////////////////

function sairGrupo(cd_grupo) {
  var cdGrupo = cd_grupo;
  event.preventDefault();
  $.ajax({
    url: "paginas/recursos/sairGrupo.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      cd_grupo: cdGrupo
    },
    success: function success(result) {
      $("#divGrupo").empty();
      exibirGrupos();
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function filtrarPostagem(e) {
  event.preventDefault();
  $.ajax({
    url: "paginas/recursos/filtrarPostagem.php",
    type: "POST",
    data: {
      chave: 'valorizado demais esse AJAX!!',
      campo: e.value,
      vrf: e.name
    },
    success: function success(result) {
      console.log(result);

      if (e.name == "selectPostagemCompartilhamento" && e.value == 1) {
        exibirPostagem();
      } else {
        if (e.name == "selectTipoDenuncia") {
          exibirMinhasPostagensBasica(selectTipoDenuncia);
        } else {
          exibirPostagem("paginas/recursos/filtrarPostagem.php", e.value, e.name);
        }
      }
    },
    error: function error(result) {
      console.error(result);
    }
  });
}

function exibirPostagem(e, nomeAmigo, verificar) {
  var url = "";
  var campo = "";
  var vrf = "";

  if (e == null) {
    url = "paginas/recursos/salvar-ExibirPostagem.php";
  } else {
    url = e;
    campo = nomeAmigo;
    vrf = verificar;
  }

  $.ajax({
    type: "POST",
    url: url,
    data: {
      campo: campo,
      vrf: vrf
    },
    success: function success(result) {
      resultado = JSON.parse(result);
      $("#postagem").empty();
      $.each(resultado, function (i, contato) {
        verificarExtensao: {
          var extensao = "";

          if (resultado[i].cd_tipo_postagem == 1) {
            extensao = "<img class='col-12' src=" + resultado[i].ds_imagem + ">";
          }

          if (resultado[i].cd_tipo_postagem == 2) {
            extensao = "<video width='100%' height='100%' controls><source src=" + resultado[i].ds_imagem + " type='video/mp4'></video>";

            while (extensao.indexOf("\"") != -1) {
              extensao = extensao.replace(/"/g, '');
            }
          }

          if (resultado[i].cd_tipo_postagem == 3) {
            extensao = "<audio width='100%' height='100%' controls> <source src=" + resultado[i].ds_imagem + " type='audio/mpeg'> </audio>";

            while (extensao.indexOf("\"") != -1) {
              extensao = extensao.replace(/"/g, '');
            }
          }
        }

        verificar_dia_da_postagem: {
          /*DATA->*/
          if (resultado[i].dias == 0) {
            resultado[i].dias = "Hoje às ";
          }

          if (resultado[i].dias == 1) {
            resultado[i].dias = "Ontem ás ";
          }

          if (resultado[i].dias > 1 && resultado[i].dias < 7) {
            resultado[i].dias += " dias atrás ás ";
          }

          if (resultado[i].dias >= 7) {
            resultado[i].dias = resultado[i].dt_postagem;
          }
          /*DATA->*/


          if (resultado[i].diasC == 0) {
            resultado[i].diasC = "Hoje às ";
          }

          if (resultado[i].diasC == 1) {
            resultado[i].diasC = "Ontem ás ";
          }

          if (resultado[i].diasC > 1 && resultado[i].diasC < 7) {
            resultado[i].diasC += " dias atrás ás ";
          }

          if (resultado[i].diasC > 7) {
            resultado[i].diasC = resultado[i].dt_compartilhamento;
          }
        } // talves if(resultado[i].qtdComentario == 0){
        // talves    document.getElementById("btnLermais"+resultado[i].cd_postagem).disabled = true;
        // talves }
        // if(resultado[i].cd_tipo_postagem == 4){}
        ////////////////////////////////////////////
        ///////////////////////////////// Postagens de quem está logado atualmente //////////////////////////////////////
        ////////////////////////////////////////////


        if (resultado[i].cdPerfil == 1) {
          // idUserLogado
          //////////////// Postagem SOMENTE com TITULO //////////////////////////
          if (resultado[i].ds_imagem == null && resultado[i].nm_titulo != null) {
            if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
              $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
              "<div class='col-sm-11'>" + // inicio da col nickname
              "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + "Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
              "<div class='col-sm-1'>" + // inicio da col menu
              "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
              "</div>" + // fim row
              "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
              "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
              "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
              "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
              "</div>" + // fim row quantidade
              "<div class='row'>" + // inicio row btnsss
              "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
              "<br>" + "<div class='row'>" + // inicio row comentario
              "<div class='col-sm-12'>" + //inicio col-sm-12
              "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
              "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
              "</div>" + // fim da exibicao dos comentario
              "</div>" + //fim de col-sm-12
              "</div>" + //fim row comentario
              "<div class='row'>" + // inicio row input comentar
              "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
              "</div>" + //fim row input comentar
              "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
              "</div>" + // fim da table emojin
              "</div>");
            } else {
              $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
              "<div class='col-sm-11'>" + // inicio da col nickname
              "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
              "<div class='col-sm-1'>" + // inicio da col menu
              "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
              "</div>" + // fim row
              "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
              "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // tiutlo
              "<div class='row'>" + // inicio row qauntidade
              "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
              "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
              "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
              "</div>" + // fim row quantidade
              "<div class='row'>" + // inicio row btnsss
              "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
              "<br>" + "<div class='row'>" + // inicio row comentario
              "<div class='col-sm-12'>" + //inicio col-sm-12
              "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
              "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
              "</div>" + // fim da exibicao dos comentario
              "</div>" + //fim de col-sm-12
              "</div>" + //fim row comentario
              "<div class='row'>" + // inicio row input comentar
              "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
              "</div>" + //fim row input comentar
              "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
              "</div>" + // fim da table emojin
              "</div>");
            }
          } else {
            //////////////// Postagem SOMENTE com IMAGEM /////////////////////////
            if (resultado[i].nm_titulo == null && resultado[i].ds_imagem != null) {
              if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
                $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + " Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")'>" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" +
                "<p>" + extensao + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              } else {
                $("#postagem").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
                // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" + //imagem
                "<p>" + extensao + "</p>" + //imagem
                "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              }
            } else {
              ////////////////// Postagem COM TITULO e IMAGEM  /////////////////////////////////
              if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
                $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + " Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")'>" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + "<p>" + extensao + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              } else {
                $("#postagem").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='chamadaModalExcluirPosatgem(this.value)' data-toggle='modal' data-target='#modalExcluir' data-toggle='tooltip' data-placement='top' title='Excluir'>Excluir postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row menu
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
                "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // tiutlo
                // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" + //imagem
                "<p>" + extensao + "</p>" + //imagem
                "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              }
            }
          } ////////////////////////////////////////////
          //////////////////////////////////////// Restantes das postagem ////////////////////////////////////////////

        } else {
          ////////////////////////////////////////////
          //////////////// Postagem SOMENTE com TITULO //////////////////////////
          if (resultado[i].ds_imagem == null && resultado[i].nm_titulo != null) {
            if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
              $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
              "<div class='col-sm-11'>" + // inicio da col nickname
              "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + "Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
              "<div class='col-sm-1'>" + // inicio da col menu
              "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
              "</div>" + // fim row
              "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
              "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
              "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
              "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
              "</div>" + // fim row quantidade
              "<div class='row'>" + // inicio row btnsss
              "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
              "<br>" + "<div class='row'>" + // inicio row comentario
              "<div class='col-sm-12'>" + //inicio col-sm-12
              "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
              "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
              "</div>" + // fim da exibicao dos comentario
              "</div>" + //fim de col-sm-12
              "</div>" + //fim row comentario
              "<div class='row'>" + // inicio row input comentar
              "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
              "</div>" + //fim row input comentar
              "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
              "</div>" + // fim da table emojin
              "</div>");
            } else {
              $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
              "<div class='col-sm-11'>" + // inicio da col nickname
              "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
              "<div class='col-sm-1'>" + // inicio da col menu
              "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
              "</div>" + // fim row
              "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
              "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // tiutlo
              "<div class='row'>" + // inicio row qauntidade
              "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
              "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
              "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
              "</div>" + // fim row quantidade
              "<div class='row'>" + // inicio row btnsss
              "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
              "<br>" + "<div class='row'>" + // inicio row comentario
              "<div class='col-sm-12'>" + //inicio col-sm-12
              "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
              "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
              "</div>" + // fim da exibicao dos comentario
              "</div>" + //fim de col-sm-12
              "</div>" + //fim row comentario
              "<div class='row'>" + // inicio row input comentar
              "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
              "</div>" + //fim row input comentar
              "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
              "</div>" + // fim da table emojin
              "</div>");
            }
          } else {
            //////////////// Postagem SOMENTE com IMAGEM /////////////////////////
            if (resultado[i].nm_titulo == null && resultado[i].ds_imagem != null) {
              if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
                $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + " Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")'>" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" +
                "<p>" + extensao + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              } else {
                $("#postagem").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
                // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" + //imagem
                "<p>" + extensao + "</p>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              }
            } else {
              ////////////////// Postagem COM TITULO e IMAGEM  /////////////////////////////////
              if (resultado[i].cd_compartilhamento != null && resultado[i].cd_postagem == resultado[i].IDPostagemCompartilhado) {
                $("#postagem").append("<div class='divDividir '>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a>" + " Compartilhou a postagem de " + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")' >" + resultado[i].NicknameCompartilhou + "</a>" + "</p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + "<div class='telaCompartilhar'>" + "<a onclick='visualizarPerfil(" + resultado[i].cdCompartilhou + ")'>" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].NicknameCompartilhou + " </span>" + "</a>" + "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].diasC + resultado[i].horasC + "</span>" + "</p>" + "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" +
                "<p>" + extensao + "</p>" + "</div>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>  <div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              } else {
                $("#postagem").append("<div class='divDividir'>" + "</div>" + "<div class='espacoPostagem '>" + "<div class='row'>" + // inicio da row
                "<div class='col-sm-11'>" + // inicio da col nickname
                "<p><a onclick='visualizarPerfil(" + resultado[i].cdPerfil + ")' >" + "<img class='imgPerfilPostagem' src=" + resultado[i].imgPerfil + ">" + "<span> " + resultado[i].nm_nickname + " </span>" + "</a></p>" + "</div>" + // Fim da col do nickname
                "<div class='col-sm-1'>" + // inicio da col menu
                "<div class='dropdown show'>" + "<a class='dropdown-toggle' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <img class='imgMenu'src='assets/img/icon/home/menuHamburger.png' alt=''> </a>" + "<div class='opcoesPostagem dropdown-menu'>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='conpartilharPostagem(this.value)' data-toggle='tooltip' data-placement='top' title='Compartilhar' >Compartilhar postagem</button><br>" + "<button class='btnOpcoes btn btn-default' value=" + resultado[i].cd_postagem + " onclick='modalDenunciaPostagem(this.value)' data-toggle='modal' data-target='#modalDenuncia' data-toggle='tooltip' data-placement='top' title='Denunciar' >Denunciar postagem</button><br>" + "</div>" + "</div>" + "</div>" + // fim da col menu
                "</div>" + // fim row menu
                "<p>" + "<span class='p_relogio'> <img class='imgRelogioPostagem' src='assets/img/icon/home/relogio.jfif'>" + resultado[i].dias + resultado[i].hr_postagem + "</span>" + "</p>" + // horario
                "<p class='tituloPostagem'>" + resultado[i].nm_titulo + "</p>" + // tiutlo
                // "<p>" + "<img class='imagemPostagem' src="+resultado[i].ds_imagem+">" + "</p>" + //imagem
                "<p>" + extensao + "</p>" + "<div class='row'>" + // inicio row qauntidade
                "<div class='col-md-4'>" + resultado[i].qtdLike + "</div>" + // Quantidade de likes
                "<div class='col-md-4'>" + resultado[i].qtdDeslike + "</div>" + // Quantidade de Deslikes
                "<div class='col-md-4'>" + resultado[i].qtdComentario + " Comentários</div>" + // Quantidade de comentarios
                "</div>" + // fim row quantidade
                "<div class='row'>" + // inicio row btnsss
                "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='LikePostagem(this.value)'>Likes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btnlikes' onclick='DeslikePostagem(this.value)'>Deslikes" + "</div>" + "<div class='col-md-4'>" + "<button type='button' value=" + resultado[i].cd_postagem + " class='btn btn-link' id='btnLermais" + resultado[i].cd_postagem + "' style='float:right; padding: 2px;' onclick='abriComentario(this.value)' data-toggle='modal' data-target='#modalComentario' >Ler mais</button>" + "</div>" + "</div>" + // fim row btnss
                "<br>" + "<div class='row'>" + // inicio row comentario
                "<div class='col-sm-12'>" + //inicio col-sm-12
                "<div id='areaComentario" + resultado[i].cd_postagem + "'>" + // inicio da exibicao dos comentario
                "<div id='comentarioPostagem" + resultado[i].cd_postagem + "'>" + "<div class='row' id='menuComentario'>" + "</div>" + //  div menuComentario
                "<div>" + // aqui irá aparecer os comentários
                "</div>" + // fim da exibicao dos comentario
                "</div>" + //fim de col-sm-12
                "</div>" + //fim row comentario
                "<div class='row'>" + // inicio row input comentar
                "<div class='col-sm-12'>" + "<input id=" + resultado[i].cd_postagem + " class='form form-control inputComentarioPostagem" + resultado[i].cd_postagem + "' style='border-radius: 8px; padding: 3px; height: 28px; font-size: 13px; width:62%; float:left;' placeholder='Comentar'>" + "<button type='button' class='btn-link' value=" + resultado[i].cd_postagem + " onclick='abrirTableEmojin(this.value)'> <img class='imgEmojinPostagem' src='assets/img/icon/home/emojin.png' alt=''> </button>" + "<button type='button' class='btnComentar' value=" + resultado[i].cd_postagem + " onclick='ComentarPostagem(this.value)'>Comentar</button>" + "</div>" + //fim de col-sm-12
                "</div>" + //fim row input comentar
                "<div class='row' id='tbEmojinPostagem" + resultado[i].cd_postagem + "' style='display:none;'>" + //inicio row da table emojin
                "</div>" + // fim da table emojin
                "</div>");
              }
            }
          }
        }
      });
    },
    error: function error(result) {
      console.error(result);
    }
  });
}