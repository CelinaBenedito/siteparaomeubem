var registrosModel = require("../models/registrosModel");


function registrar(){
    var valor = req.body.valorServer;
    var desc = req.body.descServer;
    var tipo = req.body.tipoServer;
    var titulo = req.body.tituloServer;

    registrosModel.registrar(valor,desc,tipo,titulo)
    .then(function (resposta){
        res.status(200);
        console.log("Registro concluido", resposta)
    }).catch(function(erro){
        console.error("Houve um erro ao registrar", erro)
        res.status(500).json(erro.sqlMessage);
    })

}

module.exports = {
registrar
}