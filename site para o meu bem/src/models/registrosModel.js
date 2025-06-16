var database = require("../database/config");

function registrar(valor, desc, tipo, titulo, data) {
    console.log("---------Entrei no model registrar---------");
    var instrucao =
        `
            insert into registros (valor, descricao, fkTipo, tituloGasto, dataGasto)
            VALUES (${valor}, '${desc}', ${tipo}, '${titulo}', '${data}');
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

module.exports = {
    registrar,
    adicionarTipo
}