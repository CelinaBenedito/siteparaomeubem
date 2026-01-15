var registrosModel = require("../models/registrosModel");


function registrar(req,res){
    var valor = req.body.valorServer;
    var desc = req.body.descServer;
    var tipo = req.body.tipoServer;
    var titulo = req.body.tituloServer;
    var data = req.body.dataServer;
    var instituicao = req.body.instituicaoServer;

    registrosModel.registrar(valor,desc,tipo,titulo,data,instituicao)
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

function gerarTipos(req,res){
    registrosModel.gerarTipos()
    .then(function(resposta){
        res.status(200).send(resposta);
        console.log("Geração de tipos concluida", resposta);
    }).catch(function(erro){
        console.error("Houve um erro ao gerar os tipos", erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function gerarInstituicoes(req,res){
    registrosModel.gerarInstituicoes()
    .then(function(resposta){
        res.status(200).send(resposta);
        console.log("Geração de instituições concluida", resposta)
    }).catch(function(erro){
        console.error("Houve um erro ao gerar as instituições", erro);
        res.status(500).json(erro.sqlMessage);
    })
}

function atualizarSaldo(req,res){
    var valor = req.body.valorServer;
    var instituicao = req.body.instituicaoServer;
    registrosModel.atualizarSaldo(valor,instituicao).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Atualização de saldo concluida", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}
function adicionarSaldo(req,res){
    var valor = req.body.valorServer;
    var instituicao = req.body.instituicaoServer;
    registrosModel.adicionarSaldo(valor,instituicao).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Atualização de saldo concluida", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function mostrarSaldoTotal(req,res){
    registrosModel.mostrarSaldoTotal().then(function(resposta){
        res.status(200).send(resposta);
        console.log("Consulta de saldo total concluida", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
}

function mostrarTodasInstituicoes(req,res){
    registrosModel.mostrarTodasInstituicoes().then(function(resposta){
        res.status(200).send(resposta);
        console.log("Consulta de saldo das instituições concluida", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });
}

function carregarRegistros(req,res){
    registrosModel.carregarRegistros().then(function(resposta){
        res.status(200).send(resposta);
        console.log("Consulta de registros bem sucedida", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarData(req,res){
   var data = req.params.data;
registrosModel.buscarData(data).then(function(resposta){
    res.status(200).send(resposta);
    console.log("Busca de data feita com sucesso!", resposta)
}).catch(function(erro){
    console.log("Erro ao buscar data!", erro)
    res.status(500).json(erro.sqlMessage);
})
}

function quantidadeTipoAno(req,res){
    let ano = req.params.ano;
    registrosModel.quantidadeTipoAno(ano).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Buca de quantidade por tipo feita com sucesso!", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}
function quantidadeTipoMes(req,res){
    let ano = req.params.ano;
    let mes = req.params.mes;
    registrosModel.quantidadeTipoMes(ano,mes).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Buca de quantidade por tipo feita com sucesso!", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function gastosAno(req,res){
    var ano = req.params.ano;

    registrosModel.gastosAno(ano).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de gastos por ano bem sucedida! ", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function gastosMes(req,res){
    var ano = req.params.ano;
    var mes = req.params.mes;

    registrosModel.gastosMes(ano,mes).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de gastos por mês bem sucedida! ", resposta)
    }).catch(function(erro){
        console.log("Erro na busca de gastos por mês!", erro)
        res.status(500).json(erro.sqlMessage);
    })
}

function percentualTipoAno(req,res){
    let ano = req.params.ano;
    registrosModel.percentualTipoAno(ano).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de percentual dos tipos por ano bem sucedida!", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}
function percentualTipoMes(req,res){
    let ano = req.params.ano;
    let mes = req.params.mes;

    registrosModel.percentualTipoMes(ano, mes).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de percentual dos tipos por mês bem sucedida!", resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function maiorGastoAno(req,res){
    ano = req.params.ano;
    registrosModel.maiorGastoAno(ano).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de maior gasto por ano bem sucedida!", resposta)
    }).catch(function(erro){
        console.log("Erro na busca por maior gasto por tipo no ano!")
        res.status(500).json(erro);
    });
}
function maiorGastoMes(req,res){
    ano = req.params.ano;
    mes = req.params.mes;
    registrosModel.maiorGastoMes(ano,mes).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de maior gasto por periodo bem sucedida!", resposta)
    }).catch(function(erro){
        console.log("---------------------Erro aqui forte---------------------")
        console.log("Erro na busca por maior gasto por tipo no mês!")
        res.status(500).json(erro);
    });
}

function gastoTotalAno(req,res){
    ano = req.params.ano;
    registrosModel.gastoTotalAno(ano).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de gasto total do mês bem sucedida!", resposta)
    }).catch(function(erro){
        console.log("Erro na busca de gasto do mês total!", erro)
        res.status(500).json(erro.sqlMessage);
    })
}

function gastoTotalMes(req,res){
    ano = req.params.ano;
    mes = req.params.mes;
    registrosModel.gastoTotalMes(ano,mes).then(function(resposta){
        res.status(200).send(resposta);
        console.log("Busca de gasto total do ano bem sucedida!", resposta)
    }).catch(function(erro){
        console.log("Erro na busca de gasto do ano total!")
        res.status(500).json(erro.sqlMessage);
    })
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
quantidadeTipoMes,
quantidadeTipoAno,
gastosMes,
gastosAno,
percentualTipoMes,
percentualTipoAno,
maiorGastoAno,
maiorGastoMes,
gastoTotalAno,
gastoTotalMes
}