function registrar(){
    var data = ipt_data.value;
    var valor = Number(ipt_valor.value);
    var titulo = ipt_nome.value;
    var tipo = Number(ipt_tipo.value);
    var Desc = ipt_desc.value;
    var nomeTipo;
    var valida = 0;

    for(var i=0; valida<3; i++){
        if(titulo !=" "){
            valida++
        }
        else if(valor > 0){
            valida++
        }
        else if(data != " " || data != 0){
            valida++
        }
        if(data == " " || data == 0){
            alert("Data inválida");
        }
        else if(valor <= 0){
            alert("Valor inválido");
        }
        if(titulo !=" "){
           alert("Valor inválido")
        }
    }
}
// tela de ver registros
let saldo = 0;
if(valor>0){
    saldo - valor;
}

function adicionarValor(){

    div_card.innerHTML = `
        <div class="card">
            <p>Adicione o valor ao saldo</p>
            <input type="number" placeholder="Ex: 10.00" id="ipt_valor">
            <div class="buttons">
            <button onclick="salvar()">Salvar</button>
            </div>
        </div>`
}
function salvar(){
    let valorAdicionado = Number(ipt_valor.value);
    saldo = saldo + valorAdicionado; 
}
