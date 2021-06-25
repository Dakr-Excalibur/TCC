<?php
?>   
<div class="textoDenuncia">
<form action='' method='' id='formulario-denuncia' name='formulario-denuncia'>
    <p> <input type='CHECKBOX' id='txt1' name='txt1' value="Discurso de ódio"> Discurso de ódio </p>
    <p> <input type='CHECKBOX' id='txt2' name='txt2' value="Racismo"> Racismo</p>
    <p> <input type='CHECKBOX' id='txt3' name='txt3' value="Xingamento"> Xingamento</p>
    <p> <input onclick='desabilitar()' id='txt4' name='txt4' value="Outro" type='CHECKBOX'> Outro </p>
    <p> <input type='text' class='form form-control' id='outroDenuncia' name='outroDenuncia' placeholder='Outro' disabled></p>
    <div class="row" >
        <div class="col-sm-6">
            <button type='submit' class='btn btn-defaulf' id='btnSairDenuncia' onclick="modalExcluirPostagemFechar()" name="btnSairDenuncia"> Sair </button> 
        </div>
        <div class="col-sm-6">
        <button type='submit' class='btn btn-defaulf' id='btnEnviarDenuncia' name='id=btnEnviarDenuncia' > Enviar </button> 
        </div>
    </div>
</form>
</div>