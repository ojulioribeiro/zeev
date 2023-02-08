
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

//***Exibir Campo de Formulario***
function show(fieldID) {
    // Exibir o campo
    var field = $(fieldID);
    field.closest('tr').show();

    // Resgatar se o campo era obrigatório
    //field.attr('required', field.attr('xrequired'));
    if (field.attr('xrequired') === 'N'){
        field[0].setAttribute('required', 'N');
    } else{
        if(field.attr('xrequired') === 'S'){
            field[0].setAttribute('required', 'S');
        }
    }
    

    return field;
}


//***Formatar data para o formato ISO AAAA-MM-DD***
function formatISO(fieldID){
    //Armazenar Valor do campo
    var field = $(fieldID);
    var data = field.val().substring(0,10);

    //Gravar dados da data em variaveis
    var day = data.split('/')[0];
    var month = data.split('/')[1];
    var year = data.split('/')[2];

    //Retornar variaveis no formato desejado
    return year + '-' + ('0'+month).slice(-2) + '-' + ('0'+day).slice(-2);
}

//***Operacao de soma em data***
function addData(fieldID, days){
    //Armazenar Valor do campo
    var field = $(fieldID);
    var data = field.val();

    //Gravar dados da data em variaveis
    var day = data.split('/')[0];
    var month = data.split('/')[1];
    var year = data.split('/')[2];

    //Criar Item Data
    var vdata = new Date(year, month-1, day);
    vdata.setDate(vdata.getDate() + days);

    //Retorna Data Somada
    return vdata.toLocaleDateString();
}

//***Selecionar todas as opcoes na CheckBox automaticamente e ocultar***
function selectAllCheckbox(checkID, fieldID){
    //Define Variaveis
    var check = $(checkID);
    var field = $(fieldID);

    //Seleciona todas as opcoes da Checkbox
    check.each(function(){
        this.checked = true
    });

    //Oculta campo
    field.closest('tr').hide();
}

//***Limpa tabela multivalorada */
function clearTable(fieldID){
    //Define tabela a partir do campo ancorador
    var tab = $(fieldID).closest('table');
    var nRows = tab.find('tr').size();

    //Deleta todas as linhas exceto a primeira
    if(nRows > 2){
        tab.find('tr').not(':eq(0)').not(':eq(1)').remove();
    }
}

//***Filtra Linhas de tabela multivalorada conforme condições */
function filterRows(fieldID, nColumn, filtro){
    //Define tabela a partir do campo ancorador
    var tab = $(fieldID).closest('table');

    //Verifica todas as linhas da tabela, ocultando as que atendem a condição
    tab.find('tr').next('tr').each(function(){
        if($(this).find('td').eq(nColumn).text().indexOf(filtro) == -1){
            $(this).hide();
        }
    });
}

//***Oculta bloco de anexos */
function hideAttach(){
    $('#containerFiles').hide();
}

//***Exibe bloco de anexos */
function showAttach(){
    $('#containerFiles').show();
}


//***Oculta coluna de tabela multivalorada */
function hideColumnTable(fieldID, nColumn){
    //Define tabela a partir do campo ancorador
    var tab = $(fieldID).closest('table');
    
    //Oculta coluna identificada pelo numero
    tab.find('tr').each(function(i){
        $(this).find('td').eq(nColumn).hide();
    });
}

//***Exibe coluna de tabela multivalorada */
function showColumnTable(fieldID, nColumn){
    //Define tabela a partir do campo ancorador
    var tab = $(fieldID).closest('table');
    
    //Oculta coluna identificada pelo numero
    tab.find('tr').each(function(i){
        $(this).find('td').eq(nColumn).show();
    });
}

//***Torna campo de formulario nao obrigatorio */
function setnotRequired(fieldID){
    var field = $(fieldID);
  	var repet = field.length;
	
  	for(var i = 0; i < repet; i++){
    	field[i].setAttribute('required', 'N');
    }
}

//***Torna campo de formulario obrigatorio */
function setRequired(fieldID){
    var field = $(fieldID);
  	var repet = field.length;
	
  	for(var i = 0; i < repet; i++){
    	field[i].setAttribute('required', 'S');
    }
}

//***Encontra o proximo dia X */
function nextDayX(fieldID, x, tol){
    var field = $(fieldID);
    var date = field.val();

    var d = date.split('/')[0];
    var m = date.split('/')[1];
    var y = date.split('/')[2];

    if(d > x){
        var vdate = new Date(y, m-1, d);
        var dayX = new Date(vdate.getFullYear(), vdate.getMonth() +1, x);
    } else {
        if(d < x){
            var dayX = new Date(y, m-1, x);
        } else{
            var dayX = new Date(y, m-1, x);
            dayX.setDate(diaX.getDate() + tol);
        }
    }

    return dayX.toLocaleDateString();
}

//***Encontra a Diferenca de Dias entre data informada e Hoje */
function diffDayToday(fieldID){
    var field = $(fieldID);
    var date = field.val();

    var d = date.split('/')[0];
    var m = date.split('/')[1];
    var y = date.split('/')[2];

    var vdate = new Date(y, m-1, d);
    var today = new Date();

    var diffDays = Math.ceil((today - vdate) / (1000 * 3600 * 24));

    return diffDays;
}

//***Gera texto aleatorio */
function randomText(size)
{
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var random = '';
    for (var i = 0; i < size; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        random += chars.substring(rnum, rnum + 1);
    }
    return random;
}


//***Encontra a Diferenca de Dias entre dois campos de data */
function diffDayDates(inicioID, finalID){
    var inicio = $(inicioID);
    var dateInicio = inicio.val();

    var d = dateInicio.split('/')[0];
    var m = dateInicio.split('/')[1];
    var y = dateInicio.split('/')[2];

    var vinicio = new Date(y, m-1, d);
    
    var final = $(finalID);
    var dateFinal = final.val();

    var df = dateFinal.split('/')[0];
    var mf = dateFinal.split('/')[1];
    var yf = dateFinal.split('/')[2];

    var vfinal = new Date(yf, mf-1, df);

    var diffDays = Math.ceil((vfinal - vinicio) / (1000 * 3600 * 24));

    return diffDays;
}

//**Compara data inserida com proxima data disponivel no financeiro */
function dateDisp(fieldID){
    var field = $(fieldID);
    var date = field.val();

    var d = date.split('/')[0];
    var m = date.split('/')[1];
    var y = date.split('/')[2];

    var vdate = new Date(y, m-1, d);

    var proximadata = new Date();
    var dhoje = proximadata.getDay();

    var datalimite = new Date();
    datalimite.setDate(datalimite.getDate() + 16);

    if(dhoje < 5){
        proximadata.setDate(proximadata.getDate() - dhoje + 10);
    } else{
        proximadata.setDate(proximadata.getDate() - dhoje + 17);
    }   

    if(vdate < proximadata){
        field.val(proximadata.toLocaleDateString());
        var text = 'Data Indisponível!\nPróxima data ' + proximadata.toLocaleDateString(); 
        alert(text);
    } else{
        if(vdate > datalimite){
            field.val('');
            var text = 'Data Selecionada pode ser alterada diretamente no UAU'; 
            alert(text);
        }
    }
}
