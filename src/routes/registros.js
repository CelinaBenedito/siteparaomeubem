var express = require("express");
var router = express.Router();

var registrosController = require("../controllers/registrosController");

router.get("/buscarData/:data", function(req,res){
    registrosController.buscarData(req,res);
    console.log("Estou no router buscar data");
});

router.post("/registrar", function (req,res){
    registrosController.registrar(req,res);
    console.log("Estou no router registros");
});

router.post("/adicionarTipo", function(req,res){
    registrosController.adicionarTipo(req,res);
    console.log("Estou no router Adicionar tipos");
});

router.get("/gerarTipos", function(req,res){
    registrosController.gerarTipos(req,res);
    console.log("Entrei no router gerar tipos");
});
router.get("/gerarInstituicoes", function(req,res){
    registrosController.gerarInstituicoes(req,res);
    console.log("Entrei no router gerar instituições");
});

router.post("/atualizarSaldo", function(req,res){
    registrosController.atualizarSaldo(req,res);
    console.log("Entrei no router atualizar saldo");
});

router.post("/adicionarSaldo", function(req,res){
    registrosController.adicionarSaldo(req,res);
    console.log("Entrei no router adicionar saldo");
});

router.get("/mostrarSaldoTotal", function(req,res){
    registrosController.mostrarSaldoTotal(req,res);
    console.log("Entrei no router mostrar saldo total")
})

router.get("/mostrarTodasInstituicoes", function(req,res){
    registrosController.mostrarTodasInstituicoes(req,res);
    
})

router.get("/carregarRegistros", function(req,res){
    registrosController.carregarRegistros(req,res);
})

router.get("/quantidadeTipo", function(req,res){
    registrosController.quantidadeTipo(req,res);
})

router.get("/gastosMes/:ano", function(req,res){
    registrosController.gastosAno(req,res);
});
router.get("/gastosDia/:ano/:mes", function(req,res){
    registrosController.gastosMes(req,res);
});

router.get("/percentualTipo", function(req,res){
    registrosController.percentualTipo(req,res);
});

router.get("/maiorGasto", function(req,res){
    registrosController.maiorGasto(req,res);
});

router.get("/gastoTotalAno/:ano", function(req,res){
    registrosController.gastoTotalAno(req,res);
});
router.get("/gastoTotalMes/:ano/:mes", function(req,res){
    registrosController.gastoTotalMes(req,res);
});

module.exports = router;
