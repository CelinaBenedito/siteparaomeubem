var database = require("../database/config");

function registrar(valor, desc, tipo, titulo, data, instituicao) {
    console.log("---------Entrei no model registrar---------");
    var instrucao =
        `
            insert into registros (valor, descricao, fkTipo, tituloGasto, dataGasto, fkInstituicao)
            VALUES (${valor}, '${desc}', ${tipo}, '${titulo}', '${data}', ${instituicao});
        `
    return database.executar(instrucao);
}
function adicionarTipo(titulo) {
    console.log("---------Entrei no model adicionar tipo---------");
    var instrucao =
        `
        insert into tipo(titulo)
        VALUES('${titulo}')
        `

    return database.executar(instrucao);

}

function gerarTipos() {
    console.log("---------Emtrei no model gerar tipos---------")
    var instrucao =
        `
    select * from tipo;
    `
    return database.executar(instrucao)
}

function gerarInstituicoes() {
    console.log("---------Entrei no model gerar instituições---------");
    var instrucao =
        `
    select * from instituicao;
    `
    return database.executar(instrucao)
}

function atualizarSaldo(valor, instituicao) {
    console.log("---------Entrei no model atualizar saldo---------");

    var instrucao =
        `
    update saldo set valor = (valor-${valor}) where fkInstituicao = ${instituicao};
    `
    return database.executar(instrucao)
}

function adicionarSaldo(valor, instituicao) {
    console.log("---------Entrei no model adicionar saldo---------");
    var instrucao =
        `
    update saldo set valor = (valor+${valor}) where fkInstituicao = ${instituicao};
    `
    return database.executar(instrucao);
}

function mostrarSaldoTotal() {
    console.log("---------Entrei no model mostrar saldo total---------");

    var instrucao =
        `
    SELECT SUM(valor) as valorTotal from saldo;
    `
    return database.executar(instrucao)
}

function mostrarTodasInstituicoes() {
    console.log("---------Entrei no model mostrar todas as instituições---------");
    var instrucao =
        `
            select * from saldo s
            inner join instituicao i on i.id=s.fkInstituicao;
        `;
    return database.executar(instrucao);
}

function carregarRegistros() {
    console.log("---------Entrei no model carregar registros---------");
    var instrucao =
        `
            select r.id, r.valor, r.descricao, r.tituloGasto, r.dataGasto, r.dataRegistro, t.titulo as tituloTipo, i.nome as nomeInstituicao
            from registros r
            inner join tipo t on t.id = r.fkTipo
            inner join instituicao i on i.id =r.fkInstituicao;
        `
        return database.executar(instrucao);
}

function buscarData(data){
    console.log("---------Entrei no model buscar data---------");
    var instrucao =
    `
    SELECT * FROM registros WHERE dataGasto = '${data}';
    `
    return database.executar(instrucao);
}

function quantidadeTipo(){
    console.log("---------Entrei no model quantidade por tipo---------");
    var instrucao = 
    `
        SELECT 
        t.titulo,
        COUNT(r.id) AS qtd
    FROM registros r
    JOIN tipo t ON t.id = r.fkTipo
    GROUP BY t.titulo;
    `

    return database.executar(instrucao);
}

function gastosMes(ano){

    console.log("---------Entrei no model gastos por mês---------");


    var instrucao = 
    `
        SELECT
        MONTH(dataGasto) AS mes_num,
        DATE_FORMAT(dataGasto, '%m/%Y') AS mes_label,
        SUM(valor) AS total_gasto
    FROM registros
    WHERE YEAR(dataGasto) = ${ano}
    GROUP BY mes_num, mes_label
    ORDER BY mes_num;

    `
    return database.executar(instrucao);
}

module.exports = {
    registrar,
    adicionarTipo,
    gerarTipos,
    gerarInstituicoes,
    atualizarSaldo,
    adicionarSaldo,
    mostrarSaldoTotal,
    mostrarTodasInstituicoes,
    carregarRegistros,
    buscarData,
    quantidadeTipo,
    gastosMes
}