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

function buscarData(data) {
    console.log("---------Entrei no model buscar data---------");
    var instrucao =
        `
    SELECT * FROM registros WHERE dataGasto = '${data}';
    `
    return database.executar(instrucao);
}

function quantidadeTipo() {
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

function gastosMes(ano, mes) {

  console.log("---------Entrei no model gastos por mês---------");

  var instrucao = `
SELECT
    DATE(dataGasto) AS data,
    MIN(DAY(dataGasto)) AS dia,
    MIN(DATE_FORMAT(dataGasto, '%d/%m/%Y')) AS dia_label,
    SUM(valor) AS total_gasto
FROM registros
WHERE dataGasto BETWEEN
      DATE('${ano}-${mes}-20')
  AND DATE_SUB(
        DATE_ADD(DATE('${ano}-${mes}-20'), INTERVAL 1 MONTH),
        INTERVAL 1 DAY
      )
GROUP BY DATE(dataGasto)
ORDER BY DATE(dataGasto);

  `;

  return database.executar(instrucao);
}


function gastosAno(ano) {

    console.log("---------Entrei no model gastos por ano---------");


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

function percentualTipo(dataInicial, dataFinal) {
    console.log("---------Entrei no model percentual por tipo---------");

    var instrucao =
        `
    SELECT 
    t.titulo AS tipo,
    ROUND(
        SUM(r.valor) 
        / (
            SELECT SUM(valor)
            FROM registros
            WHERE dataGasto BETWEEN '2025-01-01' AND '2025-12-31'
        ) * 100
      , 2) AS percentual
    FROM registros r
    JOIN tipo t ON r.fkTipo = t.id
    WHERE r.dataGasto BETWEEN '2025-01-01' AND '2025-12-31'
    GROUP BY t.titulo
    ORDER BY percentual DESC;
    `

    return database.executar(instrucao);

}

function maiorGasto(dataInicial, dataFinal) {
    console.log("---------Entrei no model maior gasto tipo---------");

    var instrucao =
        `
        SELECT 
        r.id,
        r.tituloGasto,
        t.titulo AS tipo,
        r.valor,
        r.dataGasto
    FROM registros r
    JOIN tipo t ON r.fkTipo = t.id
    WHERE r.dataGasto BETWEEN '2025-01-01' AND '2025-12-31'
    ORDER BY r.valor DESC
    LIMIT 1;
    `

    return database.executar(instrucao);
}

function gastoTotalMes(ano,mes) {
    console.log("---------Entrei no model gasto total por mês---------");

    var instrucao =
        `
    SELECT
    (SELECT IFNULL(SUM(valor), 0)
     FROM registros
     WHERE dataGasto BETWEEN
           DATE('${ano}-${mes}-20')
       AND DATE_SUB(
             DATE_ADD(DATE('${ano}-${mes}-20'), INTERVAL 1 MONTH),
             INTERVAL 1 DAY
           )
    ) AS total_atual,

    (SELECT IFNULL(SUM(valor), 0)
     FROM registros
     WHERE dataGasto BETWEEN
           DATE_SUB(DATE('${ano}-${mes}-20'), INTERVAL 1 MONTH)
       AND DATE_SUB(DATE('${ano}-${mes}-20'), INTERVAL 1 DAY)
    ) AS total_anterior;

    `
    return database.executar(instrucao);
}

function gastoTotalAno(ano) {
    console.log("---------Entrei no model gasto total por mês---------");

    var instrucao =
        `
SELECT
    (SELECT IFNULL(SUM(valor), 0)
     FROM registros
     WHERE dataGasto BETWEEN
           DATE('${ano}-01-20')
       AND DATE_SUB(
             DATE_ADD(DATE('${ano}-01-20'), INTERVAL 12 MONTH),
             INTERVAL 1 DAY
           )
    ) AS total_atual,

    (SELECT IFNULL(SUM(valor), 0)
     FROM registros
     WHERE dataGasto BETWEEN
           DATE_SUB(DATE('${ano}-01-20'), INTERVAL 12 MONTH)
       AND DATE_SUB(DATE('${ano}-01-20'), INTERVAL 1 DAY)
    ) AS total_anterior;


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
    gastosMes,
    gastosAno,
    percentualTipo,
    maiorGasto,
    gastoTotalMes,
    gastoTotalAno
}