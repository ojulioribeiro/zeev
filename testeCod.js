//***Ocultar campo de formulario****
function hide(fieldID) {
    // Esconder o campo
    var field = $(fieldID);
    field.closest('tr').hide();

    //Salvar a informacao se o campo é obrigatório ou nao em uma variavel
    if (field.attr('xrequired') === undefined) {
        if(field.attr('data-required') === 'false'){
            field[0].setAttribute('xrequired', 'N');
        } else{
            field[0].setAttribute('xrequired', 'S');
        }
    }

    // Marcar o campo como nao obrigatório
    field[0].setAttribute('required', 'N');

    // Limpar o campo
    if (field.is('input')) {
        if (field.attr('type') == 'text') {
            field.val('');
        } else if (field.attr('type') == 'radio') {
            field.prop('checked', false);
        }
    } else if (field.is('select') || field.is('textarea')) {
        field.val('');
    }
    return field;
}
