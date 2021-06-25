"use strict";

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
var giantColor = '212, 251, 255';
var starColor = '0, 255, 0';
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