var registrosModel = require("../models/registrosModel");


function registrar(req,res){
    var valor = req.body.valorServer;
    var desc = req.body.descServer;
    var tipo = req.body.tipoServer;
    var titulo = req.body.tituloServer;
    var data = req.body.dataServer;

    registrosModel.registrar(valor,desc,tipo,titulo,data)
    .then(function (resposta){
        res.status(200).send(resposta);
        console.log("Registro concluido", resposta)
    }).catch(function(erro){
        console.error("Houve um erro ao registrar", erro)
        res.status(500).json(erro.sqlMessage);
    })

}

function adicionarTipo(req,res){
var titulo = req.body.tituloServer;
    registrosModel.adicionarTipo(titulo).then(function (resposta){
        res.status(200).send(resposta);
        console.log("Adição concluída com sucesso", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
registrar,
adicionarTipo
}